import styled from "styled-components";
import { Button, Input, Radio } from "antd";

export const ModalTitleStyled = styled.h2`
  color: #e85451;
  margin: 0 0 16px;
  font-size: 22px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
`;

export const ModalBodyStyled = styled.div`
  font-family: Arial, sans-serif;
  line-height: 1.6;
  max-width: 100%;
  overflow-x: hidden;

  p {
    margin: 15px 0;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const ModalDescriptionStyled = styled.p`
  margin-bottom: 24px;
  font-size: 16px;
  color: #333;
  line-height: 1.5;
`;

export const RadioGroupStyled = styled(Radio.Group)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;

  .ant-radio-wrapper {
    margin-right: 0;
    padding: 8px 0;

    &:hover {
      color: #e85451;
    }
  }
`;

export const TextAreaStyled = styled(Input.TextArea)`
  border-radius: 6px;
  border: 1px solid #d9d9d9;
  padding: 12px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #e85451;
  }

  &:focus {
    border-color: #e85451;
    box-shadow: 0 0 0 2px rgba(232, 84, 81, 0.2);
    outline: none;
  }
`;

export const ModalFooterStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  gap: 12px;

  @media (max-width: 576px) {
    flex-direction: column-reverse;
    width: 100%;

    button {
      width: 100%;
    }
  }
`;

export const CancelButtonStyled = styled(Button)`
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 6px;
  height: 40px;
  padding: 0 16px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: #d84340;
    box-shadow: 0 2px 8px rgba(232, 84, 81, 0.4);
  }

  &:focus {
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
`;

export const SubmitButtonStyled = styled(Button)`
  background-color: #e85451;
  color: white;
  border: none;
  border-radius: 6px;
  height: 40px;
  padding: 0 16px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: #d84340;
    box-shadow: 0 2px 8px rgba(232, 84, 81, 0.4);
  }

  &:focus {
    outline: none; /* Remove default blue outline */
    box-shadow: 0 0 0 2px rgba(232, 84, 81, 0.3); /* Add custom focus shadow */
  }

  &:active {
    background-color: #c73c39;
  }

  &[disabled] {
    background-color: #f5b9b8;
    box-shadow: none;
  }
`;
