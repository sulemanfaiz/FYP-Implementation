import styled from "styled-components";

export const PageBannerStyled = styled.div`
  width: 100%;
  background-color: #e85451;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  border-radius: 50px;
  flex-direction: column;
  row-gap: 15px;

  .text {
    margin: 0px;
    font-size: 50px;
    line-height: 54px;
    font-weight: 800;
  }

  .desc {
    margin: 0px;
    font-size: 17.72px;
    font-weight: 400;
  }
`;
