import styled from "styled-components";

export const AboutUsPageStyled = styled.div``;

export const AboutUsPageWrapperStyled = styled.div`
  padding: 45px 60px;
`;

export const AboutUsPageSectionWrapperStyled = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  row-gap: 20px;
  flex-direction: column;
  margin-top: 45px;
  margin-bottom: 45px;
`;

export const SectionStyled = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  row-gap: 5px;
  flex-direction: column;
  margin-top: 25px;

  .date {
    margin: 0;
    font-weight: 600;
    font-size: 2.1rem;
    line-height: 1.7;
    color: #737678;
    font-weight: 400;
  }

  .heading {
    margin: 0;
    font-weight: 600;
    font-size: 2.46rem;
    line-height: 1.7;
    color: #e85451;
    font-weight: 600;
  }

  .desc {
    margin: 0;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.7;
    max-width: 70%;
    text-align: left;
  }
`;
