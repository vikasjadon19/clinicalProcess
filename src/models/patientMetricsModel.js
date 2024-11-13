const { client, connectToDB } = require("../dbConfig/dbConfig");

// to save clinical data metrics after aggregation
async function saveClinicalData(patientData) {
  const { patient_id, heart_rate, other_metrics } = patientData;

  const insertQuery = `
        INSERT INTO patient_metrics (patient_id, heart_rate, other_metrics)
        VALUES ($1, $2, $3)
        ON CONFLICT (patient_id) 
        DO UPDATE SET
            heart_rate = EXCLUDED.heart_rate,
            other_metrics = EXCLUDED.other_metrics
    `;

  const values = [
    patient_id,
    JSON.stringify(heart_rate),
    JSON.stringify(other_metrics),
  ];

  try {
    if(!client){ 
    await connectToDB();
    }
    await client.query(insertQuery, values);
    console.log("Clinical data saved successfully for patient:", patient_id);
    return true;
  } catch (error) {
    console.error("Error saving clinical data for patient:", patient_id, error);
    return false;
  }
}

module.exports = {
  saveClinicalData
}
