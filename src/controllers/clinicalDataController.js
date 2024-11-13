const { groupHeartRateData } = require("../helpers/heartRateHelper");
const { saveClinicalData } = require("../models/patientMetricsModel")


const clinicalDataController = async (req, res) => {
  try {
    const { clinical_data, patient_id } = req.body;

    if (!clinical_data || !clinical_data.HEART_RATE) {
      return res.status(400).json({ error: !clinical_data ? "clinical_data missing in request" 
      : "HEART_RATE data missing in request"});
    }

    const { HEART_RATE, ...otherMetrics } = clinical_data;
    const heartRateData = HEART_RATE.data || [];

    // Can be removed if request payload is expected to be already sorted
    heartRateData.sort((a, b) => new Date(a.on_date) - new Date(b.on_date));

    const proccesedHeartData = groupHeartRateData(heartRateData);
    
    const finalProcessedMetrics = {
        patient_id,
        heart_Rate: proccesedHeartData,
        other_Metrics: otherMetrics
      };

    //finalProcessedMetrics - postgreSQL (not awaiting for the DB data to be saved - forget and fire call)
    saveClinicalData(finalProcessedMetrics);

    res.status(200).send(finalProcessedMetrics);

  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error?.message });
  }
};

module.exports =  { clinicalDataController }
