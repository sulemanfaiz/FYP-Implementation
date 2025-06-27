import styled from "styled-components";
import { devices } from "../../components/breakpointjs/Breakpoint"; // You'll need to create this (see below)

export const ArrowIcon = styled.div`
  font-size: 0.875rem; /* 14px -> 0.875rem */
`;

export const BackgroundSection = styled.section`
  background: url("./property/islamabad.jpg") center/cover no-repeat;
  height: 80vh;
  width: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  text-align: center;

  @media ${devices.tablet} {
    height: 70vh;
  }

  @media ${devices.mobile} {
    height: 60vh;
    background-attachment: scroll;
  }
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(28, 28, 28, 0.6);
`;

export const Content = styled.div`
  position: relative;
  z-index: 1;
  padding: 0 1.25rem; /* 20px -> 1.25rem */
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Tagline = styled.h1`
  font-size: 2.15rem; /* 34.44px -> 2.15rem */
  margin-bottom: 1.25rem; /* 20px -> 1.25rem */
  color: #ffffff;
  font-weight: 600;

  @media ${devices.tablet} {
    font-size: 1.8rem;
  }

  @media ${devices.mobile} {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    line-height: 1.3;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.25rem; /* 20px -> 1.25rem */
  width: 100%;

  @media ${devices.mobile} {
    flex-direction: column;
    align-items: center;
  }
`;

export const SearchInput = styled.input`
  padding: 1.56rem; /* 25px -> 1.56rem */
  width: 100%;
  max-width: 34.375rem; /* 550px -> 34.375rem */
  border: none;
  border-radius: 4px 0 0 4px;
  font-size: 1rem;

  @media ${devices.mobile} {
    border-radius: 4px;
    padding: 1rem;
    max-width: 90%;
  }
`;

export const SearchButton = styled.button`
  padding: 1.56rem; /* 25px -> 1.56rem */
  background-color: #e50914;
  border: none;
  border-radius: 0 4px 4px 0;
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;
  min-width: 6.25rem; /* 100px -> 6.25rem */

  &:hover {
    background-color: #b20710;
  }

  @media ${devices.mobile} {
    border-radius: 4px;
    padding: 1rem;
    margin-top: 0.5rem;
    width: 90%;
    max-width: 90%;
  }
`;
export const MobileHeader = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }
`;
