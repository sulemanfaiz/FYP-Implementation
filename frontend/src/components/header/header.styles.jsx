import styled from "styled-components";
import { devices } from "../../components/breakpointjs/Breakpoint";
import { Button } from "antd";

export const HeaderStyled = styled.header`
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5%;
  max-width: 1440px;
  margin: 0 auto;
  position: relative;

  @media ${devices.tablet} {
    padding: 1rem 3%;
  }
`;

export const Logo = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  color: #e85451;
  cursor: pointer;
  margin: 0;
  transition: transform 0.2s;
  flex-shrink: 0;

  &:hover {
    transform: scale(1.02);
  }

  @media ${devices.mobile} {
    font-size: 1.5rem;
  }
`;

export const NavLinks = styled.nav`
  display: flex;
  gap: 2rem;
  margin: 0 2rem;

  @media ${devices.tablet} {
    display: none;
  }
`;

export const MobileNavLinks = styled.div`
  display: none;
  flex-direction: column;
  background: white;
  padding: 1rem 5%;
  border-top: 1px solid #eee;
  animation: slideDown 0.3s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media ${devices.tablet} {
    display: flex;
  }
`;

export const NavItem = styled.div`
  color: #37474f;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.2s;

  &:hover {
    color: #e85451;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #e85451;
    transition: width 0.3s;
  }

  &:hover::after {
    width: 100%;
  }

  @media ${devices.tablet} {
    padding: 0.8rem 0;
    font-size: 1.1rem;
  }
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const UserName = styled.span`
  color: #37474f;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;

  @media ${devices.mobile} {
    display: none;
  }
`;

export const ProfileButton = styled(Button)`
  border: none;
  padding: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  background: #f5f5f5;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const AuthButton = styled(Button)`
  background-color: transparent;
  border: 2px solid #e85451;
  padding: 0.5rem 1.5rem;
  border-radius: 30px;
  cursor: pointer;
  color: #e85451;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s;
  height: auto;
  white-space: nowrap;

  &:hover {
    background-color: #e85451;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(232, 84, 81, 0.2);
  }

  @media ${devices.mobile} {
    padding: 0.4rem 1rem;
    font-size: 0.9rem;
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #37474f;
  padding: 0.5rem;
  margin-left: 1rem;

  @media ${devices.tablet} {
    display: block;
  }
`;
