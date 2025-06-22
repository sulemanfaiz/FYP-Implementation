import styled from "styled-components";

export const SearchPageStyled = styled.div``;

export const SearchPageWrapperStyled = styled.div`
  padding: 45px 60px;
`;

export const SearchListingWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 15px;
  margin: 15px auto;
  max-width: 100%;
`;

export const SearchOptionsWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 15px;
  margin: 15px auto;
  max-width: 100%;
`;

export const SearchOptionStyled = styled.div`
  align-items: center;
  background-color: transparent;
  cursor: pointer;
  text-align: center;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.54);
  height: 35px;
  min-width: 100px;
  display: flex;
  justify-content: center;
  border-radius: 8px;
  padding: 5px;
  border: 1px solid #f2f2f2;
`;

export const SearchOptionWithActionWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;

  svg {
    width: 10px;
    height: 15px;
    path {
      fill: #e85451;
    }
  }
`;

export const SearchQueryStyled = styled.div`
  display: flex;
  column-gap: 5px;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);

  .query {
    margin: 0px;
    font-weight: 600;
    font-size: 1.811rem;
    line-height: 1.7;
    color: rgb(55, 71, 79);
  }

  .count {
    margin: 0px;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.7;
    color: #737678;
    display: inline-flex;
    align-self: center;
    padding-left: 5px;
  }
`;

export const PopOverContainerStyled = styled.div`
  display: flex;
  column-gap: 5px;
  align-items: center;
  justify-content: flex-start;
  max-width: 500px;
  flex-direction: column;
`;

export const PopOverValuesContainerStyled = styled.div`
  display: flex;
  column-gap: 5px;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const PopOverFooterStyled = styled.div`
  display: flex;
  width: 100%;
  column-gap: 5px;
  align-items: flex-end;
  justify-content: flex-end;
  margin-top: 20px;
  margin-bottom: 2px;

  .apply {
    background-color: #e85451;
    border-color: #e85451;
    color: white;
    min-width: 100px;
    min-height: 35px;
  }

  .cancel {
    min-width: 100px;
    min-height: 35px;
  }

  .clear {
    min-width: 100px;
    min-height: 35px;
    border-color: #e85451;
    color: #e85451;
  }
`;

export const PopOverInputWrapperStyled = styled.div`
  display: flex;
  column-gap: 5px;
  align-items: center;
  justify-content: flex-start;
  max-width: 500px;
  flex-direction: column;
  row-gap: 10px;
  margin-top: 20px;

  .select-field {
    width: 150px;
    max-width: 150px;
    height: 35px;
    max-height: 35px;
  }

  .inputs-wrapper {
    display: flex;
    column-gap: 5px;
    align-items: center;
    justify-content: flex-start;
  }
`;
