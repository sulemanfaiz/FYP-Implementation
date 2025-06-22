import styled from "styled-components";

export const ArrowIcon = styled.div`
  font-size: 14px;
`;

// components/BackgroundImage.styles.jsx

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
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(28, 28, 28, 0.6); /* Dark overlay */
`;

export const Content = styled.div`
  position: relative;
  z-index: 1;
  padding: 0 20px;
`;

export const Tagline = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
  color: #ffffff;
  font-size: 34.44px;
  font-weight: 600px;
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const SearchInput = styled.input`
  padding: 25px 25px;
  width: 550px;
  border: none;
  border-radius: 4px 0 0 4px;
  font-size: 1rem;
`;

export const SearchButton = styled.button`
  padding: 25px 25px;
  background-color: #e50914;
  border: none;
  border-radius: 0 4px 4px 0;
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #b20710;
  }
`;
