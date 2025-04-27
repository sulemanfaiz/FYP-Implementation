import styled from "styled-components";

export const PropertyCardWrapperStyled = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  border-radius: 4px;
  padding: 12px;
  border: 1px solid rgb(242, 242, 242);
  position: relative;

  gap: 12px;
  cursor: pointer;

  .img-section {
    display: flex;

    img {
      width: 130px;
      height: 130px;
    }
  }

  .info-section {
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
      max-width: 260px;
    }
  }
`;

export const MoreButtonWrapperStyled = styled.div`
  position: absolute;
  right: 20px;
`;

export const MoreActionItemStyled = styled.p`
  cursor: pointer;
`;
