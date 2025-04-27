import styled from "styled-components";
import { Button } from "antd";
export const LoginPageStyled = styled.div`
  display: flex;
  height: 100vh;
`;

export const LeftSectionStyled = styled.div`
  flex: 1;
  background-color: #e85451;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  .content {
    text-align: center;
    color: white;
  }

  .logo {
    width: 180px;
    height: auto;
    margin-bottom: 20px;
  }

  .welcome-heading {
    font-size: 32px;
    margin-bottom: 10px;
    font-weight: bold;
  }

  .tagline {
    font-size: 18px;
    font-style: italic;
    opacity: 0.9;
  }
`;

export const RightSectionStyled = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

export const LoginWrapperStyled = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 20px;

  .login-heading {
    font-size: 32px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
  }

  .login-description {
    font-size: 16px;
    color: #666;
    margin-bottom: 20px;
  }
`;

export const LoginContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormInputWrapperStyled = styled.div`
  .form-row {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .label {
      font-size: 14px;
      color: #333;
      font-weight: 600;
    }

    .input-field {
      border: 1px solid #ccc;
      border-radius: 6px;
      padding: 12px;
      font-size: 15px;
      transition: all 0.3s;

      // &:focus {
      //   border-color: #007bff;
      //   box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
      // }
    }
  }
`;
export const StyledButton = styled(Button)`
  &,
  &:hover,
  &:disabled {
    background-color: #d43e3a !important;
    color: white !important;
  }
`;
