import styled from "styled-components";

export const RentPredictorWrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  color: #333;
  text-align: center;
  margin-bottom: 5px;
`;

export const Subtitle = styled.p`
  text-align: center;
  color: #666;
  margin-bottom: 20px;
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  color: #d32f2f;
  text-align: center;
  margin-top: 15px;
`;

export const PredictionResult = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #e8f5e9;
  border-radius: 6px;
  text-align: center;
`;

export const PredictedAmount = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #2e7d32;
  margin: 10px 0;
`;

export const PredictionDetails = styled.div`
  color: #555;
  font-size: 14px;
`;
