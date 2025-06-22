import styled from "styled-components";

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
  display: flex; /* make it flex */
  flex-direction: column; /* stack items vertically */
  align-items: flex-start; /* align all items to the start */

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }

  /* flex: 1;
  min-width: 150px;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  } */
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
