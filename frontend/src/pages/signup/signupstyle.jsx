import styled from "styled-components";

export const SignupWrapperStyled = styled.div`
  padding: 60px;
`;

export const SignupContainerStyled = styled.div`
  margin-top: 25px;
  display: flex;
  align-items: center;
  flex-direction: column;

  .signup-button {
    margin-top: 20px;
    margin-bottom: 10px;
    width: 100px;
    height: 35px;
    border-color: #e85451;
    color: #e85451;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    flex-direction: column;

    &.ant-btn-variant-outlined:hover {
      background-color: #fff;
      border-color: #e85451;
      color: #e85451;
    }
  }

  .text-button {
    color: #e85451;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    flex-direction: column;
    text-decoration: underline;
    outline: unset;
    border: unset;
    box-shadow: unset;
  }
`;

export const FormInputWrapperStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 20px 0;

  .form-row {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .label {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 15px;
    text-align: left;
  }

  .input-field {
    width: 450px;
    height: 45px;
  }
`;
