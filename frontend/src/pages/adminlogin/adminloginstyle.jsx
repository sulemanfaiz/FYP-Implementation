import styled from "styled-components";
import { Button } from "antd";

// Import your devices breakpoints
import { devices } from "../../components/breakpointjs/Breakpoint"; // Adjust path as needed

export const LoginPageStyled = styled.div`
  display: flex;
  height: 100vh;

  @media ${devices.mobile} {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
  }
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

  @media ${devices.mobile} {
    padding: 1.5rem 1rem;
    min-height: 40vh;

    .logo {
      width: 140px;
      margin-bottom: 15px;
    }

    .welcome-heading {
      font-size: 24px;
      margin-bottom: 8px;
    }

    .tagline {
      font-size: 16px;
    }
  }

  @media ${devices.tablet} {
    padding: 1.5rem;

    .logo {
      width: 160px;
    }

    .welcome-heading {
      font-size: 28px;
    }

    .tagline {
      font-size: 17px;
    }
  }
`;

export const RightSectionStyled = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;

  @media ${devices.mobile} {
    padding: 1rem;
    min-height: 60vh;
  }
`;

export const LoginWrapperStyled = styled.div`
  width: 100%;
  max-width: 550px;
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

  .ant-btn-variant-outlined:not(:disabled) {
    background: none;
    border: none;
    color: #e85451;
    margin-top: 0;
    text-decoration: underline;
    cursor: pointer;
    font-size: 1rem;

    :hover,
    :active,
    :focus {
      text-decoration: underline;
      color: #e85451;
    }
  }

  .ant-button {
    &.text-button {
      background: none;
      border: none;
      color: #e85451;
      margin-top: 0;
      text-decoration: underline;
      cursor: pointer;
      font-size: 1rem;

      :hover,
      :active,
      :focus {
        text-decoration: underline;
        color: #e85451;
      }
    }
  }

  @media ${devices.mobile} {
    padding: 1rem;
    max-width: 100%;

    .login-heading {
      font-size: 24px;
      margin-bottom: 8px;
      text-align: center;
    }

    .login-description {
      font-size: 14px;
      margin-bottom: 16px;
      text-align: center;
    }
  }

  @media ${devices.tablet} {
    padding: 1.5rem;

    .login-heading {
      font-size: 28px;
    }

    .login-description {
      font-size: 15px;
    }
  }
`;

export const LoginContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media ${devices.mobile} {
    gap: 16px;
  }
`;

export const FormInputWrapperStyled = styled.div`
  .form-row {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;

    .label {
      font-size: 14px;
      color: #333;
      font-weight: 600;

      .star {
        color: red;
        margin-left: 2px;
      }
    }

    .error {
      color: red;
      text-align: right;
      font-size: 14px;
    }

    .input-field {
      border: 1px solid #ccc;
      border-radius: 6px;
      padding: 12px;
      font-size: 15px;
      transition: all 0.3s;

      &:focus {
        border-color: #e85451;
        box-shadow: 0 0 5px rgba(232, 84, 81, 0.3);
        outline: none;
      }
    }

    @media ${devices.mobile} {
      gap: 6px;

      .label {
        font-size: 13px;
      }

      .input-field {
        padding: 10px;
        font-size: 14px;
      }
    }
  }
`;

export const StyledButton = styled(Button)`
  background-color: #d43e3a;
  color: white;
  border: none;
  height: auto;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 6px;
  width: 150px;
  align-self: center;

  &:hover {
    background-color: #b7322f !important;
    color: white !important;
  }

  &:disabled {
    background-color: #d43e3a !important;
    color: white !important;
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus,
  &:active {
    outline: none;
    box-shadow: none;
    border: none;
    background-color: #d43e3a !important;
    color: white !important;
  }

  @media ${devices.mobile} {
    padding: 10px 20px;
    font-size: 15px;
    width: 100%;
  }

  @media ${devices.tablet} {
    padding: 11px 22px;
    font-size: 15px;
  }
`;
