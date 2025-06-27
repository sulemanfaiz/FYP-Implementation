import styled from "styled-components";

// Import your devices breakpoints
import { devices } from "../../components/breakpointjs/Breakpoint"; // Adjust path as needed

export const AddListingPageStyled = styled.div``;

export const AddListingPageWrapperStyled = styled.div`
  padding: 45px 60px;

  @media ${devices.mobile} {
    padding: 20px 15px;
  }

  @media ${devices.tablet} {
    padding: 30px 40px;
  }
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

  @media ${devices.mobile} {
    min-height: 200px;
    border-radius: 20px;
    padding: 20px;
    row-gap: 10px;

    .text {
      font-size: 28px;
      line-height: 32px;
      text-align: center;
    }

    .desc {
      font-size: 14px;
      text-align: center;
    }
  }

  @media ${devices.tablet} {
    min-height: 250px;
    border-radius: 35px;
    row-gap: 12px;

    .text {
      font-size: 38px;
      line-height: 42px;
    }

    .desc {
      font-size: 16px;
    }
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

  .error,
  .star {
    color: red;
  }

  .error {
    text-align: left;
  }

  @media ${devices.mobile} {
    gap: 8px;
    margin-top: 15px;

    .add-button,
    .cancel-button {
      width: 100%;
      height: 45px;
    }
  }

  @media ${devices.tablet} {
    .add-button,
    .cancel-button {
      width: 130px;
      height: 48px;
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

  @media ${devices.mobile} {
    margin: 10px 0;

    .field-desc {
      font-size: 13px;
      margin-bottom: 10px;
    }

    .ques {
      font-size: 16px;
      margin-bottom: 10px;
    }

    .ant-switch {
      margin-left: 15px;
    }

    .inputs-container {
      flex-direction: column;
      row-gap: 10px;
      column-gap: 0;
    }

    .select-field,
    .input-field {
      width: 100%;
      height: 42px;
    }

    .small-select-field {
      width: 100%;
      height: 42px;
    }

    .textarea-field {
      width: 100%;
    }

    .add-container {
      gap: 6px;
    }
  }

  @media ${devices.tablet} {
    margin: 12px 0;

    .field-desc {
      font-size: 14px;
      margin-bottom: 12px;
    }

    .ques {
      font-size: 18px;
      margin-bottom: 12px;
    }

    .ant-switch {
      margin-left: 20px;
    }

    .inputs-container {
      flex-wrap: wrap;
      row-gap: 10px;
    }

    .select-field,
    .input-field {
      width: 300px;
      height: 43px;
    }

    .small-select-field {
      width: 130px;
      height: 43px;
    }

    .textarea-field {
      width: 100%;
      max-width: 500px;
    }
  }
`;

export const FormButtonWrapperStyled = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin: 15px 0;
  column-gap: 10px;

  .error {
    color: red;
  }

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

  button {
    :disabled {
      opacity: 0.5;
    }
  }

  @media ${devices.mobile} {
    flex-direction: column;
    align-items: center;
    row-gap: 10px;
    column-gap: 0;
    margin: 10px 0;

    .field-desc {
      font-size: 13px;
      margin-bottom: 10px;
    }

    .ques {
      font-size: 16px;
      margin-bottom: 10px;
    }

    .select-field,
    .input-field {
      width: 100%;
      height: 42px;
    }

    .textarea-field {
      width: 100%;
    }
  }

  @media ${devices.tablet} {
    margin: 12px 0;
    column-gap: 8px;

    .field-desc {
      font-size: 14px;
      margin-bottom: 12px;
    }

    .ques {
      font-size: 18px;
      margin-bottom: 12px;
    }

    .select-field,
    .input-field {
      width: 300px;
      height: 43px;
    }

    .textarea-field {
      width: 100%;
      max-width: 500px;
    }
  }
`;

export const ImagesWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 50px;

  @media ${devices.mobile} {
    gap: 8px;
    margin-top: 30px;
    justify-content: center;
  }

  @media ${devices.tablet} {
    gap: 9px;
    margin-top: 40px;
  }
`;

export const ImageWrapperStyled = styled.div`
  position: relative;

  .delete-icon {
    position: absolute;
    right: 5px;
    top: 5px;
  }

  img {
    border-radius: 8px;
    width: 150px;
    height: 150px;
  }

  @media ${devices.mobile} {
    .delete-icon {
      right: 3px;
      top: 3px;
    }

    img {
      width: 120px;
      height: 120px;
      border-radius: 6px;
    }
  }

  @media ${devices.tablet} {
    img {
      width: 135px;
      height: 135px;
    }
  }
`;

export const ColumnFlexStyled = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  @media ${devices.mobile} {
    row-gap: 8px;
  }
`;
