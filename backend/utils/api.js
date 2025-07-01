import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000/api"; // Update to match the correct port // ✅ Correct

export const predictRent = async (formData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/predictions/predict`,
      formData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Prediction failed");
  }
};
