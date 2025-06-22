import styled from "styled-components";

export const PredictionPageStyled = styled.div``;

export const PredictionPageWrapperStyled = styled.div`
  padding: 45px 60px;
`;

export const PredictionPageFieldsWrapperStyled = styled.div`
  margin-top: 40px;
`;

export const FormInputWrapperStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 45px 0;

  .field-desc {
    font-size: 15px;
    margin-bottom: 15px;
    color: rgb(55, 71, 79);
  }

  .ques {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 15px;
  }

  .ant-switch {
    margin-left: 25px;

    &.ant-switch-checked,
    &.ant-switch-checked:hover {
      background-color: #e85451;
    }
  }

  .inputs-container {
    display: flex;
    column-gap: 10px;
  }

  .select-field {
    width: 350px;
    height: 45px;

    .ant-select-selection-placeholder,
    .ant-select-selection-item {
      display: flex;
    }
  }

  .small-select-field {
    width: 150px;
    height: 45px;
    .ant-select-selection-placeholder,
    .ant-select-selection-item {
      display: flex;
    }
  }

  .input-field {
    width: 350px;
    height: 45px;
  }

  .textarea-field {
    width: 550px;
  }

  .add-container {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #e85451;
    cursor: pointer;
  }
`;

export const PredictionFormButtonWrapperStyled = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin: 15px 0;
  column-gap: 10px;

  button {
    width: 150px;
    height: 50px;
    background-color: #e85451;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    flex-direction: column;
  }
`;
