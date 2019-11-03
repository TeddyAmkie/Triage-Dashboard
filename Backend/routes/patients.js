const Router = require("express").Router;
const router = new Router();
const ExpressError = require("../helpers/expressError");
const Patient = require("../models/patient");
const axios = require("axios");

// For dashboard to get all patients
router.get("/", async function (req, res, next) {
  try {
    let patients = await Patient.getIncidentAll(1);
    // return res.send("Access denied. Invalid credentials.");
    return res.json({patients});
  }
  catch (err) {
    return next(err);
  }
});

// Get all patients for one situation
router.get("/:id", async function (req, res, next) {
  try {
    let patients = await Patient.getIncidentSevere(req.params.id);
    return res.json({ patients });
  }
  catch (err) {
    return next(err);
  }
});

// Post all patients for one situation
router.post("/:id", async function (req, res, next) {
  try {
    const newPatientsUrl = `https://api.trello.com/1/boards/5dbe4a08285e4232c46c7b29?actions=all&boardStars=none&cards=all&card_pluginData=false&checklists=none&customFields=false&fields=name%2Cdesc%2CdescData%2Cclosed%2CidOrganization%2Cpinned%2Curl%2CshortUrl%2Cprefs%2ClabelNames&lists=open&members=none&memberships=none&membersInvited=none&membersInvited_fields=all&pluginData=false&organization=false&organization_pluginData=false&myPrefs=false&tags=false&key=33c5a434ab25dbe2767f7a0b026a8fab&token=3f7fe552f7d8614217a25150bf17c7a4cde7e7c92feab8a5c7e09bfbdea94f9c`
    let patients = await Patient.getIncidentAll(req.params.id);
    let newPatients = await axios.get(newPatientsUrl);
    // console.log(newPatients.data.actions[1].data.card.name); -- Patient info
    newPatients = newPatients.data.actions;

    // Collect patienIds in array
    let currentPatientIds = [];
    patients.forEach(element => {
      currentPatientIds.push(element.id);
    });

    // PARSE THE DATA!!!!!!
    let patientData = {
      id: 0,
      parseObservation: "",
      parseLocation: "",
      triageStatus: "",
    };

    // Reserved words:
    let parseId = "patient";
    let parseObservation = "observation";
    let parseLocation = "location";
    let isNewPatient = true;

    // Iterate through newPatients, check if they are in db
    for (let i = 0; i < 5; i++) {
      if (!isNewPatient) {
        return;
      }
      console.log("new patient id is:", patientData.id, "current patient ids", currentPatientIds)
      let word = '';
      patientData = {};
      patientData.parseLocation = '';
      patientData.triageStatus = newPatients[i].data.list.name;
      for (let j = 0; j < newPatients[i].data.card.name.length; j++) {
        let char = newPatients[i].data.card.name[j].toLowerCase();
        // If not a space, add it to the word
        if (char !== ' ') {
          word += char;
          // Once we hit a space, lets check if the word is a reserved word.
        } else {
          // Check for ID
          if (word === parseId) {
            // Skip the space, clear the word, reset the char to next char
            j++;
            char = newPatients[i].data.card.name[j].toLowerCase();
            word = '';
            // Iterate through until we hit another space
            while (char !== ' ') {
              word += char;
              // console.log(word);
              j++;
              char = newPatients[i].data.card.name[j].toLowerCase();
            }
            patientData.id = word;
            console.log("we found the parseId!", word);
            word = '';
          }

          // Check for observation
          else if (word === parseObservation || word === parseObservation + 's') {
            patientData.parseObservation = '';
            j++;
            word = '';
            char = newPatients[i].data.card.name[j].toLowerCase();
            while (word !== parseLocation) {
              if (char !== ' ') {
                word += char;
                j++;
                char = newPatients[i].data.card.name[j].toLowerCase();
              } else {
                patientData.parseObservation += ' ' + word;
                word = '';
                j++
                char = newPatients[i].data.card.name[j].toLowerCase();
              }
            }
            while (j < newPatients[i].data.card.name.length) {
              char = newPatients[i].data.card.name[j].toLowerCase();
              patientData.parseLocation += char;
              j++
            }
            // Data fully parsed, let's check if it's in the DB!!!!!!!!
            if (currentPatientIds.includes(patientData.id)) {
              isNewPatient = false;
              return;
            } else {
              await Patient.createPatient(patientData,1);
            }
          }
          word = '';
        }
      }
    }
    return res.json({ patients });
  }
  catch (err) {
    return next(err);
  }
});


module.exports = router;
