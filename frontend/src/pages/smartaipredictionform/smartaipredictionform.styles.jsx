import styled from "styled-components";
import { devices } from "../../components/breakpointjs/Breakpoint";

export const PredictionPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const PredictionPageWrapperStyled = styled.div`
  padding: 2rem 5%;
  flex: 1;
`;

export const PredictionPageFieldsWrapperStyled = styled.div`
  max-width: 800px;
  margin: 2rem 20px 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media ${devices.mobile} {
    gap: 1.5rem;
    margin-top: 1.5rem;
  }
`;

export const FormInputWrapperStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .ques {
    font-size: 1.1rem;
    font-weight: 600;
    color: #37474f;
    display: flex;
    align-items: center;

    @media ${devices.mobile} {
      font-size: 1rem;
    }
  }

  .ant-switch {
    margin-left: 1rem;

    &.ant-switch-checked,
    &.ant-switch-checked:hover {
      background-color: #e85451;
    }
  }

  .inputs-container {
    display: flex;
    gap: 1rem;
    width: 100%;

    @media ${devices.mobile} {
      flex-direction: column;
      gap: 0.8rem;
    }
  }

  .select-field {
    width: 100%;
    max-width: 350px;
    height: 3rem;

    .ant-select-selector {
      &:focus,
      &:hover,
      &:active {
        border-color: #e85451 !important;
        outline: none;
        border-radius: 4px;
      }
    }

    .ant-select-selection-placeholder,
    .ant-select-selection-item {
      display: flex;
    }
  }

  .small-select-field {
    width: 100%;
    max-width: 150px;
    height: 3rem;

    .ant-select-selector {
      &:focus,
      &:hover,
      &:active {
        border-color: #e85451 !important;
        outline: none;
        border-radius: 4px;
      }
    }

    .ant-select-selection-placeholder,
    .ant-select-selection-item {
      display: flex;
    }
  }

  .input-field {
    width: 100%;
    max-width: 350px;
    height: 3rem;

    @media ${devices.mobile} {
      max-width: 100%;
    }
  }
`;

export const PredictionFormButtonWrapperStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;

  button {
    width: 150px;
    height: 3rem;
    background-color: #e85451;
    color: white;
    border-radius: 6px;
    font-weight: 500;
    transition: all 0.2s;

    &:hover {
      background-color: #d04a47;
      transform: translateY(-1px);
    }

    @media ${devices.mobile} {
      width: 100%;
    }
  }
`;
