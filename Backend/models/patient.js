const db = require("../db");

class Patient {

  // Insert a patient for an accident

  static async createPatient(data, id) {
    const result = await db.query(
      `INSERT INTO patients (id,incident)
      VALUES($1, $2)`,
      [data.id, id]
    );
    const observations = await Patient.addObservation(data);

    const results = { result, observations }
    return results;

  }

  // Add observation

  static async addObservation(data) {
    const result = await db.query(
      `INSERT INTO observations (location,priority, observation,user_id,patient_id)
      VALUES($1,$2,$3,$4,$5)`,
      [data.parseLocation, data.triageStatus, data.parseObservation,"1", data.id]
    )
    return result.rows;
  }

  // Get all patients for an incident

  static async getIncidentAll(id) {
    const result = await db.query(
      `SELECT patients.id, patients.first_name, patients.last_name, age, observations.priority, observations.observation
      FROM patients
      JOIN observations ON patients.id=observations.patient_id
      WHERE incident=$1`,
      [id]
    );
    return result.rows;
  }


  // Get all patients for one incident that are severe

  static async getIncidentSevere(id) {

    const result = await db.query(
      `SELECT patients.id, patients.first_name, patients.last_name, age, observations.priority, observations.observation
      FROM patients
      JOIN observations ON patients.id=observations.patient_id
      WHERE incident=$1 
      AND observations.priority='SEVERE'`,
      [id]
    );
    return result.rows;
  }
}

module.exports = Patient;