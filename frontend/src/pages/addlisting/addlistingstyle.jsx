import styled from "styled-components";

export const AddListingPageStyled = styled.div`
  padding: 60px;
`;

export const BannerWrapperStyled = styled.div`
  width: 100%;
  background-color: #e85451;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  border-radius: 50px;
  flex-direction: column;
  row-gap: 15px;

  .text {
    margin: 0px;
    font-size: 50px;
    line-height: 54px;
    font-weight: 800;
  }

  .desc {
    margin: 0px;
    font-size: 17.72px;
    font-weight: 400;
  }
`;

export const AddListingWrapperStyled = styled.div``;

export const AddListingFormContainerStyled = styled.div`
  width: 100%;
`;

export const AddListingFormStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;

  .add-button {
    width: 150px;
    height: 50px;
    background-color: #e85451;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    flex-direction: column;

    &.ant-btn-variant-outlined:hover {
      background-color: #e85451;
      color: #fff;
      border-color: #e85451;
    }
  }

  .cancel-button {
    width: 150px;
    height: 50px;
    border-color: rgb(55, 71, 79);
    color: rgb(55, 71, 79);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    flex-direction: column;

    &.ant-btn-variant-outlined:hover {
      background-color: #fff;
      border-color: rgb(55, 71, 79);
      color: rgb(55, 71, 79);
    }
  }
`;

export const FormInputWrapperStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 15px 0;

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
`;

export const FormButtonWrapperStyled = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin: 15px 0;
  column-gap: 10px;

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

  .select-field {
    width: 350px;
    height: 45px;
  }

  .input-field {
    width: 350px;
    height: 45px;
  }

  .textarea-field {
    width: 550px;
  }
`;
