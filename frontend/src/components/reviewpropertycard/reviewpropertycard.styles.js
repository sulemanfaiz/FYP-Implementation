import styled from "styled-components";

export const ReviewPropertyCardWrapperStyled = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  row-gap: 25px;
`;

export const MenuWrapperStyled = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  row-gap: 25px;
  width: 100%;
`;

export const PropertyCardWrapperStyled = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border-radius: 4px;
  padding: 20px 10px;
  border: 1px solid rgb(242, 242, 242);
  width: 100%;
`;

export const SectionsWrapperStyled = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border-radius: 4px;
`;

export const SectionStyled = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  border-radius: 4px;

  flex-direction: column;
`;

export const TitleStyled = styled.div`
  font-size: 22px;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  color: #222;
`;

export const RowWrapperStyled = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  row-gap: 25px;
`;

export const RowStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  column-gap: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid rgb(242, 242, 242);

  .key {
    min-width: 250px;
    text-align: left;
    font-weight: bold;
  }

  .value {
    min-width: 250px;
    font-style: italic;
    text-align: left;
    font-weight: normal;
  }
`;

export const ImgWrapperStyled = styled.div`
  display: flex;
  column-gap: 8px;
  flex-wrap: wrap;
`;

export const ImgStyled = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
`;

export const MoreButtonWrapperStyled = styled.div``;

export const MoreActionItemStyled = styled.p`
  cursor: pointer;
`;

export const MoreActionWrapperStyled = styled.p`
  min-width: 150px;
`;

export const PropertyStatusTagStyled = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;

  .anticon-clock-circle {
    svg {
      path {
        fill: orange;
      }
    }
  }

  .anticon-close-circle {
    svg {
      path {
        fill: red;
      }
    }
  }
  .anticon-check-circle {
    svg {
      path {
        fill: green;
      }
    }
  }
`;
