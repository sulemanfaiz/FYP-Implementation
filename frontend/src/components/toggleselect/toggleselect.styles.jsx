import styled from "styled-components";

export const ToggleSelectWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  flex-wrap: wrap;
  /* max-width: 80%; */

  .option {
    padding: 10px;
    min-width: 103.76px;
    height: 25px;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-style: normal;
    font-weight: 400;
    font-size: 11.64px;
    color: #37474f;
    border: 1px solid #f2f2f2;
    cursor: pointer;

    &.selected {
      border: 1px solid #e85451;
    }
  }
`;
