import React, { useState } from "react";
import {
  RentPredictorWrapper,
  Title,
  Subtitle,
  FormGroup,
  Label,
  Input,
  Select,
  Button,
  ErrorMessage,
  PredictionResult,
  PredictedAmount,
  PredictionDetails,
} from "./RentPredictor.styles";
function RentPredictor() {
  const [formData, setFormData] = useState({
    location: "",
    area: "",
    bedrooms: "",
    baths: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      setError("Error connecting to prediction service");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // List of popular locations in Islamabad
  const locations = [
    "F-6",
    "F-7",
    "F-8",
    "F-10",
    "F-11",
    "E-7",
    "E-11",
    "DHA",
    "Bahria",
    "G-6",
    "G-7",
    "G-8",
    "G-9",
    "G-10",
    "G-11",
    "I-8",
    "I-10",
    "Kuri",
    "D-12",
    "D-17",
  ];

  return (
    <RentPredictorWrapper>
      <Title>Islamabad Rent Predictor</Title>
      <Subtitle>Fill in the details to get an estimated monthly rent</Subtitle>

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Location</Label>
          <Select
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          >
            <option value="">Select Location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Area (in marlas)</Label>
          <Input
            type="number"
            name="area"
            placeholder="e.g. 10"
            value={formData.area}
            onChange={handleChange}
            min="1"
            max="100"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Bedrooms</Label>
          <Input
            type="number"
            name="bedrooms"
            placeholder="e.g. 3"
            value={formData.bedrooms}
            onChange={handleChange}
            min="1"
            max="10"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Bathrooms</Label>
          <Input
            type="number"
            name="baths"
            placeholder="e.g. 2"
            value={formData.baths}
            onChange={handleChange}
            min="1"
            max="10"
            required
          />
        </FormGroup>

        <Button type="submit" disabled={loading}>
          {loading ? "Calculating..." : "Get Estimated Rent"}
        </Button>
      </form>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {prediction && (
        <PredictionResult>
          <h3>Estimated Monthly Rent</h3>
          <PredictedAmount>
            Rs. {prediction.predicted_rent.toLocaleString()}
          </PredictedAmount>
          <PredictionDetails>
            Based on a {formData.area} marla {formData.bedrooms} bedroom
            property in {formData.location}
          </PredictionDetails>
        </PredictionResult>
      )}
    </RentPredictorWrapper>
  );
}
export default RentPredictor;
