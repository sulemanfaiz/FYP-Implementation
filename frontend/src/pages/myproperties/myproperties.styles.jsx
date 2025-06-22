import { Button } from "antd";
import styled from "styled-components";

export const MyPopertiesPageStyled = styled.div``;

export const MyPopertiesPageWrapperStyled = styled.div`
  padding: 45px 60px;
`;

export const PropertiesListingStyled = styled.div`
  margin-top: 20px;
  position: relative;

  .property-card {
    min-width: 430px;
    max-width: 430px;
  }
`;

export const AddPropertyButtonStyled = styled(Button)`
  position: absolute;
  right: 2px;
  top: 8px;
  z-index: 1;
`;

export const ListingsStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const NoListingFoundStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  .text {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-45%, -50%);
    font-size: 30px;
    font-weight: bold;
  }
`;
