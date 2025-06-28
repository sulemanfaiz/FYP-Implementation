import styled from "styled-components";
import { devices } from "../../components/breakpointjs/Breakpoint";

export const SearchPageStyled = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const SearchPageWrapperStyled = styled.div`
  padding: 2rem 5%;
  flex: 1;

  @media ${devices.tablet} {
    padding: 1.5rem 3%;
  }

  @media ${devices.mobile} {
    padding: 1rem;
  }
`;

export const SearchListingWrapperStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;

  @media ${devices.mobile} {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const SearchOptionsWrapperStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin: 1.5rem 0;

  @media ${devices.mobile} {
    gap: 0.5rem;
    justify-content: space-between;
  }
`;

export const SearchOptionStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  cursor: pointer;
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.8);
  height: 2.5rem;
  min-width: 6rem;
  border-radius: 8px;
  padding: 0 1rem;
  border: 1px solid #e0e0e0;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:hover {
    border-color: #e85451;
    color: #e85451;
    box-shadow: 0 2px 5px rgba(232, 84, 81, 0.1);
  }

  @media ${devices.mobile} {
    min-width: calc(50% - 0.5rem);
    font-size: 0.85rem;
    height: 2.2rem;
  }
`;

export const SearchOptionWithActionWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const SearchQueryStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;

  .query {
    font-weight: 600;
    font-size: 1.8rem;
    color: rgb(55, 71, 79);
    margin: 0;

    @media ${devices.mobile} {
      font-size: 1.5rem;
    }
  }

  .count {
    font-weight: 400;
    font-size: 1rem;
    color: #737678;
    margin: 0;

    @media ${devices.mobile} {
      font-size: 0.9rem;
    }
  }
`;

export const PopOverContainerStyled = styled.div`
  width: 400px;
`;

export const PopOverValuesContainerStyled = styled.div`
  width: 100%;
`;

export const PopOverFooterStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;

  button {
    min-width: 5rem;
    height: 2.5rem;
    font-weight: 500;
    transition: all 0.2s;
  }

  .apply {
    background-color: #e85451;
    border-color: #e85451;
    color: white;

    &:hover {
      background-color: #d04a47;
      border-color: #d04a47;
    }
  }

  .cancel {
    &:hover {
      border-color: #e85451;
      color: #e85451;
    }
  }

  .clear {
    border-color: #e85451;
    color: #e85451;

    &:hover {
      background-color: #fdf2f2;
    }
  }
`;

export const PopOverInputWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  .ant-input {
    height: 2.5rem;
    border-radius: 6px;
  }

  .inputs-wrapper {
    display: flex;
    gap: 0.5rem;
    align-items: center;

    @media ${devices.mobile} {
      flex-direction: column;
      align-items: stretch;
    }
  }

  .select-field {
    width: 100%;

    .ant-select-selector {
      height: 2.5rem !important;
      display: flex;
      align-items: center;
    }
  }
`;
