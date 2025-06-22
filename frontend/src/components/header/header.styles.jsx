import styled from "styled-components";

export const HeaderStyled = styled.div`
  background-color: white;
  color: #e0e1dd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);

  .profile-btn {
    border: unset;
  }
`;

export const LeftSectionContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  // margin-right: 10rem;
`;

export const Logo = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  color: #ffffff;
  cursor: pointer;
  padding-left: 5rem;
  color: #e85451;
`;

export const NavLinks = styled.div`
  display: flex;
  column-gap: 2rem;
  flex-wrap: wrap;
  color: #37474f;
  font-weight: bold;
  font-size: 16px;
  margin: 8px 0px 0 30px;
`;

export const NavItem = styled.div`
  cursor: pointer;
`;

export const SignedInUserInfoWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 5px;

  .user {
    color: #37474f;
  }
`;

export const SignInButton = styled.button`
  background-color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  display: flex;
  align-items: center;
  border-radius: 8px;
  gap: 0.5rem;
  cursor: pointer;
  color: #37474f;
  font-weight: bold;
  font-size: 14px;
  border: 1px solid black;
  border-radius: 30px;
  margin-right: 5rem;
  &:hover {
    background-color: #e85451;
    color: white;
  }
`;
