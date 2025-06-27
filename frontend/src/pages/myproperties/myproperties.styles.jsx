import { Button } from "antd";
import styled from "styled-components";
import { devices } from "../../components/breakpointjs/Breakpoint";
export const MyPopertiesPageStyled = styled.div``;

export const MyPopertiesPageWrapperStyled = styled.div`
  padding: 2rem 1rem;

  @media ${devices.tablet} {
    padding: 2rem;
  }

  @media ${devices.desktop} {
    padding: 45px 60px;
  }
`;

export const PropertiesListingStyled = styled.div`
  margin-top: 20px;
  position: relative;
  width: 100%;
  overflow-x: hidden;

  .property-card {
    width: 100%;
    min-width: unset;
    max-width: 100%;

    @media ${devices.tablet} {
      min-width: 300px;
      max-width: 400px;
    }

    @media ${devices.desktop} {
      min-width: 430px;
      max-width: 430px;
    }
  }
`;

export const AddPropertyButtonStyled = styled(Button)`
  align-self: flex-end; // Align to right within its container
  margin-bottom: 20px;
  width: auto; // Let the button size according to its content
  position: absolute;
  left: 90%;
  @media ${devices.mobile} {
    width: 100%; // Full width on very small screens
    margin-bottom: 15px;
  }

  @media ${devices.tablet} {
    position: absolute;
    right: 2px;
    top: 8px;
    z-index: 1;
  }
`;
export const ListingsStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media ${devices.tablet} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  @media ${devices.desktop} {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
`;

export const NoListingFoundStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  position: relative;
  width: 100%;

  .text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
    text-align: center;
    font-weight: bold;
    width: 90%;

    @media ${devices.tablet} {
      font-size: 2rem;
    }

    @media ${devices.desktop} {
      font-size: 2.5rem;
    }
  }
`;
