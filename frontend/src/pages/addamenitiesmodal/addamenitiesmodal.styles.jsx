import { Button } from "antd";
import styled from "styled-components";

export const AddAmenitiesModalStyled = styled.div`
  margin-bottom: 50px;

  .ant-collapse-item:last-child {
    border-bottom: 1px solid #d9d9d9;
  }
`;

export const SelectedAmenitiesListStyled = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 5px;
  flex-wrap: wrap;
  margin: 20px 0;
  max-height: 200px;
  overflow-y: auto;
`;

export const CollapsedAmenitiesWrapperStyled = styled.div`
  max-height: 300px;
  overflow-y: auto;
  padding-right: 15px;
`;

export const ListedAmenityStyled = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid #f2f2f2;
  border-radius: 8px;
  padding: 10px;
  gap: 10px;
  height: 15px;
  -webkit-box-align: center;
  align-items: center;
  cursor: pointer;
  margin: 8px 0;
  color: #737678;
  justify-content: space-between;

  .count-container {
    display: flex;
    align-items: center;
    column-gap: 5px;
  }

  &.selected {
    background-color: #f2f2f2;
  }

  &:hover {
    border-color: #e85451;
  }
`;

export const SelectedAmenityStyled = styled.div`
  background-color: #f2f2f2;
  border-radius: 4px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;

  .amenity-cancel {
    cursor: pointer;
  }
`;

export const AddAmenitiesModalHeaderStyled = styled.div`
  border-bottom: 1px solid #f2f2f2;
  padding-bottom: 8px;
  margin-bottom: 10px;
  font-size: 25px;
`;

export const AddAmenitiesModalFooterStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  gap: 12px;
`;

export const ConfirmButtonStyled = styled(Button)`
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
