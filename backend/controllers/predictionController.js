const { PythonShell } = require("python-shell");
const path = require("path");

const predictRent = async (req, res) => {
  try {
    const {
      city,
      propertyType,
      bedrooms,
      bathrooms,
      furnished,
      areaSizeUnit,
      areaSizeMetric,
    } = req.body;

    console.log("🛎️ Received request:", req.body);

    const inputData = {
      city,
      propertyType,
      bedrooms: parseInt(bedrooms),
      bathrooms: parseInt(bathrooms),
      furnished: furnished ? 1 : 0,
      areaSizeUnit: parseFloat(areaSizeUnit),
      areaSizeMetric,
    };

    const options = {
      mode: "text",
      pythonPath: "python", // or "python3"
      pythonOptions: ["-u"],
      scriptPath: path.join(__dirname, "../utils/ml"),
      args: [JSON.stringify(inputData)],
    };

    console.log("🐍 Running Python with data:", inputData);

    PythonShell.run("predict.py", options, (err, result) => {
      if (err) {
        console.error("❌ Python error:", err);
        return res.status(500).json({
          success: false,
          message: "Prediction failed",
          error: err.message,
        });
      }

      console.log("📥 Python result:", result);

      if (!result || !result[0]) {
        return res.status(500).json({
          success: false,
          message: "No result returned from Python",
        });
      }

      try {
        const prediction = JSON.parse(result[0]);
        res.json({
          success: true,
          prediction: prediction.predicted_rent,
          confidence: prediction.confidence || null,
        });
      } catch (parseError) {
        console.error("⚠️ Parse error:", parseError);
        res.status(500).json({
          success: false,
          message: "Failed to parse prediction result",
        });
      }
    });
  } catch (error) {
    console.error("💥 Server error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  predictRent,
};
