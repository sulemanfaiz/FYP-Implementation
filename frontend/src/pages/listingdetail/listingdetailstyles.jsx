import styled from "styled-components";

// Import your devices breakpoints
import { devices } from "../../components/breakpointjs/Breakpoint"; // Adjust path as needed

export const ListingStyled = styled.div``;

// Listing Main Wrapper
export const ListingWrapperStyled = styled.div`
  padding: 2rem;
  max-width: 85%;
  margin: 0 auto;

  @media ${devices.mobile} {
    padding: 1rem;
    max-width: 95%;
  }

  @media ${devices.tablet} {
    padding: 1.5rem;
    max-width: 90%;
  }
`;

// Detail Section Wrapper
export const ListingDetailWrapperStyled = styled.div`
  margin-top: 2rem;

  @media ${devices.mobile} {
    margin-top: 1rem;
  }
`;

// Property Detail Card
export const DetailCardStyled = styled.div`
  background: white;
  border-radius: 12px;

  .name-price-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .property-name {
    font-size: 24px;
    font-weight: bold;
    color: #222;
  }

  .property-rent {
    display: flex;
    align-items: baseline;
  }

  .month {
    font-size: 14px;
    margin-left: 4px;
    color: #555;
  }

  .icons-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1.5rem;
    color: #555;
    font-size: 16px;
  }

  .icon-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  @media ${devices.mobile} {
    .name-price-wrapper {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }

    .property-name {
      font-size: 20px;
    }

    .icons-wrapper {
      gap: 0.5rem;
      margin-top: 1rem;
      font-size: 14px;
    }

    .icon-item {
      gap: 4px;
    }
  }

  @media ${devices.tablet} {
    .property-name {
      font-size: 22px;
    }

    .icons-wrapper {
      font-size: 15px;
    }
  }
`;

// Button Section
export const ButtonStyled = styled.div`
  display: flex;
  gap: 5px;

  .call-button,
  .inquire-button {
    flex: 1;
    padding: 0.8rem 1rem;
    border: none;
    font-size: 18px;
    font-weight: 500;
    border-radius: 8px;
    cursor: pointer;
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 5px;
  }

  .call-button {
    background-color: #28a745;
    color: white;
  }

  .inquire-button {
    background-color: #007bff;
    color: white;
  }

  @media ${devices.mobile} {
    flex-direction: column;
    gap: 10px;

    .call-button,
    .inquire-button {
      width: 100%;
      font-size: 16px;
      padding: 0.7rem 1rem;
    }
  }

  @media ${devices.tablet} {
    .call-button,
    .inquire-button {
      font-size: 17px;
    }
  }
`;

// Title Section (Description)
export const TitleSectionStyled = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;

  h2 {
    font-size: 22px;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    color: #222;
  }

  .property-description {
    font-size: 16px;
    color: #555;
    line-height: 1.6;
    text-align: start;
  }

  @media ${devices.mobile} {
    h2 {
      font-size: 18px;
      margin-top: 0.3rem;
      margin-bottom: 0.8rem;
    }

    .property-description {
      font-size: 14px;
      line-height: 1.5;
    }
  }

  @media ${devices.tablet} {
    h2 {
      font-size: 20px;
    }

    .property-description {
      font-size: 15px;
    }
  }
`;

export const ImageSectionWrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 0 auto;
  width: 100%;

  @media ${devices.mobile} {
    gap: 0.5rem;
  }
`;

// Image Section (Main + Small Images)
export const ImageSectionStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 1rem;

  .main-image-wrapper {
    flex: 3;
    cursor: pointer;
    height: 500px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 8px;
      inset: 0px;
      object-fit: cover;
    }
  }

  .small-images-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .small-image {
      cursor: pointer;
      height: 240px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
        inset: 0px;
        border: 1px solid #ddd;
      }
    }
  }

  @media ${devices.mobile} {
    flex-direction: column;
    gap: 0.5rem;

    .main-image-wrapper {
      height: 300px;
    }

    .small-images-wrapper {
      flex-direction: row;
      overflow-x: auto;
      gap: 0.5rem;
      padding: 0.5rem 0;

      .small-image {
        min-width: 120px;
        height: 120px;
      }
    }
  }

  @media ${devices.tablet} {
    gap: 0.8rem;

    .main-image-wrapper {
      height: 400px;
    }

    .small-images-wrapper {
      gap: 0.8rem;

      .small-image {
        height: 190px;
      }
    }
  }
`;

export const CustomCarouselStyled = styled.div`
  .slick-slide img {
    width: 100%;
    height: 400px;
    object-fit: contain;
    border-radius: 8px;
    inset: 0;
  }

  .slick-arrow {
    z-index: 1000;
    background: rgba(0, 0, 0, 0.5) !important;
    width: 40px;
    height: 40px;
    border-radius: 50%;

    &:after {
      top: 38%;
      left: 38%;
      right: 38%;
    }
  }

  @media ${devices.mobile} {
    .slick-slide img {
      height: 250px;
    }

    .slick-arrow {
      width: 30px;
      height: 30px;
    }
  }

  @media ${devices.tablet} {
    .slick-slide img {
      height: 320px;
    }

    .slick-arrow {
      width: 35px;
      height: 35px;
    }
  }
`;

export const TypeOfPropertyStyled = styled.div`
  width: 13px;
  height: 13px;
  margin: auto 5px auto 20px;
  background-color: rgb(232, 84, 81);
  border-radius: 2.86px;

  @media ${devices.mobile} {
    width: 10px;
    height: 10px;
    margin: auto 3px auto 10px;
  }
`;

export const FetaureSectionStyled = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;

  .property-features {
    display: flex;
    align-items: center;
    column-gap: 8px;
    flex-wrap: wrap;
  }

  .feature-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 5px;
    margin-top: 8px;
    margin-bottom: 8px;
    margin-left: 5px;
    margin-right: 5px;
    width: 150.5px;
    height: 109.78px;
    border-radius: 12px;
    background: rgba(242, 242, 242, 0.5);
    opacity: 0.8;
    position: relative;
    border: hidden;
    color: #737678;

    .icon {
      width: 50px;
      height: 50px;

      svg {
        width: 100%;
        height: 100%;

        path {
          fill: #737678;
        }
      }

      &.mos {
        svg {
          path {
            stroke: #737678;
          }
        }
      }
    }
  }

  @media ${devices.mobile} {
    .property-features {
      column-gap: 4px;
      justify-content: center;
    }

    .feature-item {
      width: 120px;
      height: 90px;
      margin: 4px 2px;
      gap: 3px;

      .icon {
        width: 35px;
        height: 35px;
      }
    }
  }

  @media ${devices.tablet} {
    .property-features {
      column-gap: 6px;
    }

    .feature-item {
      width: 135px;
      height: 95px;
      margin: 6px 3px;

      .icon {
        width: 42px;
        height: 42px;
      }
    }
  }
`;

export const DiscountLabelStyled = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  gap: 5px;
  opacity: 0.8;
  position: relative;
  border: hidden;
  color: #e95144;

  @media ${devices.mobile} {
    gap: 3px;
  }
`;

export const RentStyled = styled.div`
  font-size: 18px;
  font-weight: bold;
  display: inline-block;
  text-decoration: ${({ isDiscounted }) =>
    isDiscounted ? "line-through" : ""};

  @media ${devices.mobile} {
    font-size: 16px;
  }

  @media ${devices.tablet} {
    font-size: 17px;
  }
`;
