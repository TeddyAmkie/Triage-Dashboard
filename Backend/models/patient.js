const db = require("../db");

class Patient {

  // Get all patients

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