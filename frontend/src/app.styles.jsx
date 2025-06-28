import { Button } from "antd";
import styled from "styled-components";

export const StyledTextButton = styled(Button)`
  &&& {
    background: none;
    border: none;
    color: #e85451;
    text-decoration: underline;
    cursor: pointer;
    font-size: 1rem;
    box-shadow: unset;

    &:hover,
    &:active,
    &:focus {
      background: none;
      border: none;
      color: #e85451;
      text-decoration: underline;
    }

    &:disabled,
    &[disabled] {
      color: #e85451;
      cursor: not-allowed;
      text-decoration: underline;
    }
  }
`;

export const BorderedButtonStyled = styled(Button)`
  &&& {
    background: white;
    border: 1px solid #e85451;
    color: #e85451;
    cursor: pointer;
    font-size: 1rem;
    box-shadow: unset;

    &:hover,
    &:active,
    &:focus {
      background: white;
      border: 1px solid #e85451;
      color: #e85451;
      box-shadow: unset;
    }
  }
`;

export const FilledButtonStyled = styled(Button)`
  &&& {
    width: 150px;
    height: 50px;
    background-color: #e85451;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    flex-direction: column;
    border: 1px solid #e85451;

    &:hover,
    &:active,
    &:focus {
      background-color: #e85451;
      color: #fff;
      border: 1px solid #e85451;
      box-shadow: unset;
    }
  }
`;

export const NoDataFoundImgStyled = styled.img`
  width: 350px;
  height: 300px;
`;

export const NoDataFoundImgWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  width: 100%;
`;

export const PageLoaderStyled = styled.div`
  .ant-spin {
    svg {
      path {
        fill: #e85451;
      }
    }
  }
`;
