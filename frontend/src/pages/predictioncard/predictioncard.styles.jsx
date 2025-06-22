import styled from "styled-components";

export const PredictionCardHeaderStyled = styled.div`
  border-bottom: 1px solid #f2f2f2;
  padding-bottom: 8px;
  margin-bottom: 10px;
  font-size: 15px;
`;
export const PredictionCardStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 300px;

  .predicted-rent-container {
    display: flex;
    align-items: center;
    justify-items: center;
    flex-direction: column;
    row-gap: 5px;
  }

  .predicted-rent-value {
    font-weight: bold;
    align-items: center;
    font-size: 30px;
    margin-bottom: 10px;
  }

  .predicted-rent-powered {
    margin-top: 10px;
    font-size: 12px;
    color: #8e8e8e;
    font-style: italic;
  }

  .predicted-rent-desc {
    font-style: italic;
  }
`;
