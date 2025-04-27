import styled from "styled-components";

export const SignupPageStyled = styled.div`
  display: flex;
  height: 100vh;
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
`;

export const RightSectionStyled = styled.div`
  flex: 1;
  background-color: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: center;
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
  }

  .text-button {
    background: none;
    border: none;
    color: #e85451;
    margin-top: 1rem;
    text-decoration: underline;
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
    }
  }
`;
