import styled from "styled-components";

export const PropertyStyled = styled.div``;

export const CardContainer = styled.div`
  max-width: ${({ width }) => width || "250px"};
  min-width: ${({ width }) => width || "250px"};
  max-height: 450px;
  background-color: #ffffff;
  border-radius: 4px;
  border: 1px solid #f2f2f2;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

export const ImageWrapper = styled.div`
  position: relative;

  .like-icon {
    position: absolute;
    top: 5px;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
  }

  &.liked {
    svg {
      path {
        fill: red;
      }
    }
  }
`;

export const CardMetaInfoWrapper = styled.div`
  position: absolute;
  top: 5px;
  right: 10px;
  left: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  cursor: pointer;
`;

export const AreaImage = styled.img`
  width: 100%;
  height: 200px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

export const InfoSectionStyled = styled.div`
  padding: 15px;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  row-gap: 7px;

  .price {
    font-weight: 600;
  }

  .type {
    font-weight: normal;
    color: rgb(55, 71, 79);
  }

  .amenties-section {
    display: flex;
    column-gap: 20px;
    align-items: center;

    .amenity {
      display: flex;
      gap: 5px;
      align-items: center;
      width: max-content;

      .count {
        font-size: 10px;
      }
    }
  }

  .title,
  .desc {
    font-weight: normal;
    color: rgb(55, 71, 79);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 100%;
  }
`;
