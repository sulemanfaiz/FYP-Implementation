import styled from "styled-components";

export const ListingStyled = styled.div``;

// Listing Main Wrapper
export const ListingWrapperStyled = styled.div`
  padding: 2rem;
  max-width: 85%;
  margin: 0 auto;
`;

// Detail Section Wrapper
export const ListingDetailWrapperStyled = styled.div`
  margin-top: 2rem;
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
`;

export const ImageSectionWrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 0 auto;
  width: 100%;
`;

// Image Section (Main + Small Images)
export const ImageSectionStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;

  gap: 1rem; // Add this to control spacing between main and small images

  .main-image-wrapper {
    flex: 3;
    cursor: pointer;
    height: 500px;

    img {
      width: 100%; // Change from 50vw to 100% to fill the container
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
`;

export const TypeOfPropertyStyled = styled.div`
  width: 13px;
  height: 13px;
  margin: auto 5px auto 20px;
  background-color: rgb(232, 84, 81);
  border-radius: 2.86px;
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
`;

export const RentStyled = styled.div`
  font-size: 18px;
  font-weight: bold;
  display: inline-block;

  text-decoration: ${({ isDiscounted }) =>
    isDiscounted ? "line-through" : ""};
`;
