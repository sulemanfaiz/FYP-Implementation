import styled from "styled-components";
import { devices } from "../../components/breakpointjs/Breakpoint";

export const SignupPageStyled = styled.div`
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
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;

  .logo {
    width: 150px;
    height: auto;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    max-width: 300px;
  }

  @media ${devices.mobile} {
    padding: 1.5rem 1rem;
    min-height: 40vh;

    .logo {
      width: 120px;
      margin-bottom: 0.5rem;
    }

    h1 {
      font-size: 1.8rem;
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 1rem;
      max-width: 250px;
    }
  }

  @media ${devices.tablet} {
    padding: 1.5rem;

    h1 {
      font-size: 2.2rem;
    }

    p {
      font-size: 1.1rem;
    }
  }
`;

export const RightSectionStyled = styled.div`
  flex: 1;
  background-color: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${devices.mobile} {
    padding: 1rem;
    min-height: 60vh;
  }
`;

export const SignupWrapperStyled = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2rem;

  .signup-heading {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: center;
  }

  .signup-description {
    text-align: center;
    margin-bottom: 2rem;
    color: #555;
    font-size: 1rem;
  }

  @media ${devices.mobile} {
    padding: 1rem;
    max-width: 100%;

    .signup-heading {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    .signup-description {
      margin-bottom: 1.5rem;
      font-size: 0.9rem;
    }
  }

  @media ${devices.tablet} {
    padding: 1.5rem;

    .signup-heading {
      font-size: 1.8rem;
    }
  }
`;

export const SignupContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .signup-button {
    background-color: #e85451;
    color: white;
    font-weight: bold;
    margin-top: 1rem;
    padding: 20px 20px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;

    &:hover {
      background-color: #d43e3a;
    }
  }

  .text-button {
    background: none;
    border: none;
    color: #e85451;
    margin-top: 1rem;
    text-decoration: underline;
    cursor: pointer;
    font-size: 1rem;
  }

  @media ${devices.mobile} {
    gap: 0.8rem;

    .signup-button {
      padding: 16px 20px;
      font-size: 0.95rem;
      margin-top: 0.8rem;
    }

    .text-button {
      margin-top: 0.8rem;
      font-size: 0.9rem;
    }
  }
`;

export const FormInputWrapperStyled = styled.div`
  .form-row {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .label {
      font-weight: bold;
      font-size: 0.9rem;
      color: #333;
    }

    .input-field {
      padding: 0.8rem;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 1rem;
      transition: border-color 0.3s;

      &:focus {
        outline: none;
        border-color: #e85451;
      }
    }

    @media ${devices.mobile} {
      gap: 0.4rem;

      .label {
        font-size: 0.85rem;
      }

      .input-field {
        padding: 0.7rem;
        font-size: 0.95rem;
      }
    }
  }
`;
