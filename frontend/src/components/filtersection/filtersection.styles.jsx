import styled from "styled-components";

export const FilterSectionStyled = styled.div`
  margin-bottom: 40px;
`;

export const FilterSectionContentStyled = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 25px;
  flex-direction: column;
  row-gap: 20px;
  max-width: 75%;
  margin: 0 auto;

  .filter-by {
    font-size: 30px;
    font-weight: 600;
  }
`;

export const CarasolWrapperStyled = styled.div`
  background-color: #ffffff;
  max-width: 75%;
  margin: 0 auto;

  .slick-arrow {
    color: black;
  }

  .slick-prev {
    margin-left: -50px;
  }

  .slick-next {
    margin-right: 50px;
  }
`;

export const StyledCarouselContentGroupWrapper = styled.div`
  display: flex !important;
  justify-content: ${({ isDataExists }) =>
    isDataExists ? "flex-start" : "center"};
  column-gap: 10px;
  flex: 1;
`;

export const CardContainer = styled.div`
  max-width: 250px;
  min-width: 250px;
  max-height: 450px;
  background-color: #ffffff;
  border-radius: 4px;
  border: 1px solid #f2f2f2;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const NoDataCardContainerStyled = styled.div`
  background-color: #ffffff;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* margin: 0 auto; */
`;
export const AreaInfo = styled.div`
  padding: 16px;
`;

export const AreaTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StatsRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 12px;
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #666;
`;

export const RentIcon = styled.span`
  font-size: 16px;
`;

export const RentCount = styled.span`
  font-weight: bold;
  color: #f44336;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #eaeaea;
  margin: 12px 0;
`;

export const AreaButton = styled.button`
  background: none;
  border: 1px solid black;
  border-radius: 30px;
  padding: 8px 16px;
  color: #f44336;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;

  &:hover {
    color: #ffffff;
    background-color: #e85451;
  }
`;
