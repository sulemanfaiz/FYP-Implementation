import styled from "styled-components";

export const NavbarContainer = styled.nav`
  background-color: white;
  color: #e0e1dd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  flex-wrap: wrap;
`;

export const LeftSectionContainer = styled.nav`
  display: flex;
  align-items: center;
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

export const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  color: #37474f;
  font-weight: bold;
  font-size: 14px;
`;

export const NavItem = styled.li`
  cursor: pointer;
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
// Footer.styles.jsx

const colors = {
  primary: "#e85451",
  secondary: "#E73A5D", // Pink/Red accent from Graana
  text: "#333333",
  lightText: "#666666",
  background: "#FFFFFF",
  footerBg: "#F5F5F5",
  borderColor: "#EEEEEE",
};

export const FooterContainer = styled.footer`
  background-color: ${colors.footerBg};
  padding: 3rem 5%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  border-top: 1px solid ${colors.borderColor};
  font-family: "Poppins", sans-serif;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FooterSection = styled.div`
  flex: 1;
  min-width: 150px;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

export const FooterHeading = styled.h3`
  color: ${colors.text};
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
  position: relative;
  display: inline-block;
  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 40px;
    height: 2px;
    background-color: ${colors.primary};
  }
`;

export const FooterLink = styled.a`
  display: block;
  color: ${colors.lightText};
  text-decoration: none;
  margin-bottom: 0.7rem;
  font-size: 0.9rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${colors.primary};
  }
`;

export const FooterContactItem = styled.div`
  display: flex;
  align-items: center;
  color: ${colors.lightText};
  margin-bottom: 0.7rem;
  font-size: 0.9rem;

  svg {
    margin-right: 10px;
    color: ${colors.primary};
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #f2f2f2;
  color: ${colors.lightText};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.primary};
    color: white;
    transform: translateY(-2px);
  }

  svg {
    font-size: 16px;
  }
`;

export const BottomBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  margin-top: 20px;
  border-top: 1px solid ${colors.borderColor};
  font-size: 0.85rem;
  color: ${colors.lightText};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const Copyright = styled.div``;

export const MadeWithLove = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  svg {
    font-size: 14px;
    animation: heartBeat 1.5s infinite;
  }

  @keyframes heartBeat {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
  }
`;

export const ArrowIcon = styled.div`
  font-size: 14px;
`;

export const ImageWrapper = styled.div`
  padding: 10px;
`;
// components/BackgroundImage.styles.jsx

export const BackgroundSection = styled.section`
  background: url("Islamabad-Background-Image.jpg") center/cover no-repeat;
  height: 80vh;
  width: 100vw;
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
  max-width: 800px;
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
  width: 60%;
  max-width: 500px;
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
