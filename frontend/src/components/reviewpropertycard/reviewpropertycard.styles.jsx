import styled from "styled-components";

export const ReviewPropertyCardWrapperStyled = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  overflow: hidden;
  transition: all 0.3s ease;
  margin-bottom: 20px;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }
`;

export const CardHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-bottom: 1px solid #f0f0f0;
`;

export const StatusBadgeStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  color: #333;

  .anticon {
    font-size: 16px;
  }
`;

export const ActionButtonStyled = styled.button`
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #666;

  &:hover {
    border-color: #e85451;
    color: #e85451;
    background: #f0f8ff;
  }

  .anticon {
    font-size: 16px;
  }
`;

export const CardContentStyled = styled.div`
  padding: 20px;
  cursor: pointer;
`;

export const ImageGalleryStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  padding: 16px;
  background: #fafafa;
  border: 1px solid #f0f0f0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 8px;
    padding: 12px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 6px;
    padding: 8px;
  }
`;

export const PropertyImageStyled = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 120px;
  }

  @media (max-width: 480px) {
    height: 100px;
  }
`;

export const MoreImagesStyled = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e85451 0%, #f29d7e(158, 75, 162) 100%);
  color: white;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 120px;
    font-size: 13px;
  }

  @media (max-width: 480px) {
    height: 100px;
    font-size: 12px;
  }
`;

export const InfoSectionStyled = styled.div`
  .main-info {
    margin-bottom: 20px;

    .property-title {
      font-size: 20px;
      font-weight: 600;
      color: #1a1a1a;
      margin: 0 0 8px 0;
      line-height: 1.3;
    }

    .property-location {
      display: flex;
      align-items: center;
      gap: 6px;
      color: #666;
      font-size: 14px;
      margin: 0 0 12px 0;

      .anticon {
        color: #f29d7e;
      }
    }
  }
`;

export const PriceDisplayStyled = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 16px;

  .price {
    font-size: 24px;
    font-weight: 700;
    color: #f29d7e;
  }

  .period {
    font-size: 14px;
    color: #666;
  }
`;

export const DiscountBadgeStyled = styled.span`
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const InfoGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
`;

export const InfoItemStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #fafafa;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
  transition: all 0.2s ease;

  &:hover {
    background: #f0f8ff;
    border-color: #d6e4ff;
  }

  .anticon,
  .icon {
    font-size: 18px;
    color: #f29d7e;
    min-width: 20px;
  }

  .icon {
    font-size: 16px;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 2px;

    .label {
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 500;
    }

    .value {
      font-size: 14px;
      font-weight: 600;
      color: #1a1a1a;
    }
  }
`;

export const SectionTitleStyled = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 8px;

  .anticon {
    color: #f29d7e;
  }
`;

export const DescriptionStyled = styled.div`
  margin-bottom: 20px;
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;
  border-left: 4px solid #f29d7e;

  p {
    margin: 0;
    color: #666;
    line-height: 1.6;
    font-size: 14px;
  }
`;

export const FeaturesGridStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;
  border: 1px solid #f0f0f0;

  @media (max-width: 768px) {
    gap: 8px;
    padding: 12px;
  }

  @media (max-width: 480px) {
    gap: 6px;
    padding: 8px;
  }
`;

export const FeatureTagStyled = styled.span`
  background: linear-gradient(135deg, #f29d7e 0%, #e85451 100%);
  color: white;
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 2px 4px rgba(102, 126, 234, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba (102, 126, 234, 0.3);
  }

  .count {
    background: rgba(255, 255, 255, 0.2);
    padding: 2px 6px;
    border-radius: 10px;
    font-size: 11px;
    font-weight: 600;
  }
`;

export const OwnerInfoStyled = styled.div`
  .owner-details {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .owner-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 12px;
    background: #f8f9fa;
    border-radius: 6px;
    border: 1px solid #e9ecef;

    .anticon {
      color: #e85451;
      font-size: 16px;
    }

    span {
      color: #333;
      font-size: 14px;
    }
  }
`;

export const MoreActionsStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 160px;
`;

export const ActionItemStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
  font-size: 14px;
  color: #333;

  &:hover {
    background: #f0f8ff;
    color: #1890ff;
  }

  &.approve:hover {
    background: #f6ffed;
    color: #52c41a;
  }

  &.reject:hover {
    background: #fff2f0;
    color: #ff4d4f;
  }

  .anticon {
    font-size: 14px;
  }
`;
