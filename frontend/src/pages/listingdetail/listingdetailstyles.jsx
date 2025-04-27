import styled from "styled-components";

// Listing Main Wrapper
export const ListingWrapperStyled = styled.div`
  padding: 2rem;
  background-color: #f8f8f8;
`;

// Detail Section Wrapper
export const ListingDetailWrapperStyled = styled.div`
  margin-top: 2rem;
`;

// Property Detail Card
export const DetailCardStyled = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.08);

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

  .rent {
    font-size: 22px;
    font-weight: bold;
    color: #007bff;
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
  margin-top: 2rem;
  display: flex;
  gap: 1rem;

  .call-button,
  .inquire-button {
    flex: 1;
    padding: 0.8rem 1rem;
    border: none;
    font-size: 18px;
    font-weight: 500;
    border-radius: 8px;
    cursor: pointer;
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
  margin-top: 2rem;

  h2 {
    font-size: 22px;
    margin-bottom: 1rem;
    color: #222;
  }

  .property-description {
    font-size: 16px;
    color: #555;
    line-height: 1.6;
  }
`;

// Image Section (Main + Small Images)
export const ImageSectionStyled = styled.div`
  display: flex;
  gap: 1rem; // Add this to control spacing between main and small images

  .main-image-wrapper {
    flex: 3;
    cursor: pointer;

    img {
      width: 100%; // Change from 50vw to 100% to fill the container
      height: 90%;
      object-fit: cover;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.05);
      }
    }
  }

  .small-images-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .small-image {
      cursor: pointer;

      img {
        width: 100%;
        height: 90%;
        object-fit: cover;
        border-radius: 8px;
        border: 1px solid #ddd;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease;

        &:hover {
          transform: scale(1.05);
        }
      }
    }
  }
`;

export const CustomCarouselStyled = styled.div`
  .slick-slide img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 8px;
  }

  .slick-arrow {
    z-index: 1000;
    background: rgba(0, 0, 0, 0.5) !important;
    width: 40px;
    height: 40px;
    border-radius: 50%;

    &:before {
      font-size: 20px;
      color: white;
    }
  }

  .slick-prev {
    left: -50px; /* Adjust as needed */
  }

  .slick-next {
    right: -50px; /* Adjust as needed */
  }
`;
