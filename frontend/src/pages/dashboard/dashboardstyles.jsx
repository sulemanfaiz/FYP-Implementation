import styled from "styled-components";

export const DashboardWrapperStyled = styled.div``;

export const DashboardContentWrapperStyled = styled.div`
  background: #5f6c7b;
  padding: 25px;
`;

export const CardWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  column-gap: 15px;
`;

export const CardStyled = styled.div`
  border: 1.5px solid #094067;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  row-gap: 6px;
  width: 180px;
  height: 120px;
  border-radius: 4px;

  .count {
    font-weight: bold;
  }
`;

export const TabsAndGridWrapperStyled = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  row-gap: 10px;
  flex-direction: column;

  .heading {
    font-weight: bold;
  }
`;

export const TableActionsWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 8px;
`;
