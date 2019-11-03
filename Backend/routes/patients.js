const Router = require("express").Router;
const router = new Router();
const ExpressError = require("../helpers/expressError");
const Patient = require("../models/patient");

// For dashboard to get all patients
router.get("/", async function (req, res, next) {
  try {
    return res.send("hello world");
  }
  catch (err) {
    return next(err);
  }
});

// Get all patients for one situation
router.get("/:id", async function (req, res, next) {
  try {
    let patients = await Patient.getIncidentSevere(1);
    return res.json({patients});
  }
  catch (err) {
    return next(err); 
  }
});



module.exports = router;
