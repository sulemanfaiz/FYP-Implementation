import styled from "styled-components";

export const PremiumBadgeStyled = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  background: linear-gradient(135deg, #ffd700 0%, #ffa500 100%);
  color: #000;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 9px;
  z-index: 3;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(255, 215, 0, 0.4);
  border: 1px solid #ffd700;

  &::before {
    content: "★";
    margin-right: 2px;
    font-size: 8px;
  }
`;

export const ImageContainerStyled = styled.div`
  position: relative;
  width: 130px;
  height: 130px;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const PropertyCardWrapperStyled = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #e0e0e0;
  position: relative;
  column-gap: 4px;
  row-gap: 8px;
  cursor: pointer;
  background: #fff;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  overflow: hidden;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
  }

  .info-section {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 8px;
    flex-grow: 1;
    overflow: hidden;
    padding-top: 0; /* Remove any top padding that might cause overlap */

    .price {
      font-weight: 700;
      font-size: 18px;
      color: #333;
      margin-top: 0; /* Ensure no extra margin */
    }

    .type {
      display: flex;
      align-items: center;
      font-weight: 500;
      color: #555;
      gap: 6px;

      .box {
        width: 12px;
        height: 12px;
        background-color: rgb(232, 84, 81);
        border-radius: 2px;
      }
    }

    .amenties-section {
      display: flex;
      gap: 16px;
      align-items: center;

      .amenity {
        display: flex;
        gap: 6px;
        align-items: center;
        color: #555;

        .icon img {
          width: 16px;
          height: 16px;
        }

        .count {
          font-size: 14px;
          font-weight: 500;
        }
      }
    }

    .title {
      font-weight: 600;
      font-size: 16px;
      color: #222;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
    }

    .desc {
      font-weight: 400;
      color: #777;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
    }
  }
`;

export const MoreButtonWrapperStyled = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 4;
`;

export const StatusTagStyled = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  gap: 4px;
  align-items: center;
  font-size: 10px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  z-index: 3;

  .anticon {
    font-size: 12px;
  }

  .anticon-close-circle {
    color: #ff4d4f;
  }

  .anticon-check-circle {
    color: #52c41a;
  }

  .anticon-clock-circle {
    color: #faad14;
  }
`;

export const TagStyled = styled.div`
  color: ${({ color }) => color};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

export const MoreActionItemStyled = styled.p`
  cursor: pointer;
  padding: 8px 12px;
  margin: 0;
  &:hover {
    background-color: #f7fafc;
  }
`;

export const MoreActionWrapperStyled = styled.div`
  min-width: 150px;
`;

// Alternative layout approach - if you want status in the info section instead
export const InfoSectionWithStatusStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 8px;
  flex-grow: 1;
  overflow: hidden;

  .status-and-price {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;

    .price {
      font-weight: 700;
      font-size: 18px;
      color: #333;
    }

    .status-tag {
      display: flex;
      gap: 4px;
      align-items: center;
      font-size: 10px;
      font-weight: 600;
      padding: 2px 6px;
      border-radius: 8px;
      background: #f5f5f5;

      .anticon {
        font-size: 10px;
      }
    }
  }

  /* Rest of the styles remain the same */
  .type {
    display: flex;
    align-items: center;
    font-weight: 500;
    color: #555;
    gap: 6px;

    .box {
      width: 12px;
      height: 12px;
      background-color: rgb(232, 84, 81);
      border-radius: 2px;
    }
  }

  .amenties-section {
    display: flex;
    gap: 16px;
    align-items: center;

    .amenity {
      display: flex;
      gap: 6px;
      align-items: center;
      color: #555;

      .icon img {
        width: 16px;
        height: 16px;
      }

      .count {
        font-size: 14px;
        font-weight: 500;
      }
    }
  }

  .title {
    font-weight: 600;
    font-size: 16px;
    color: #222;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }

  .desc {
    font-weight: 400;
    color: #777;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }
`;

export const SoldBannerStyled = styled.div`
  position: absolute;
  top: 12px;
  left: -40px;
  background: #ff4d4f;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  padding: 4px 40px;
  transform: rotate(-25deg);
  z-index: 10;
  box-shadow: 0 2px 8px rgba(255, 77, 79, 0.2);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.08);
  letter-spacing: 2px;
  pointer-events: none;
`;
