import { Button, Popover } from "antd";
import { useNavigate } from "react-router-dom";
import ProfileMenu from "../profilemenu";
import { useState } from "react";
import {
  HeaderStyled,
  HeaderContainer,
  Logo,
  NavLinks,
  NavItem,
  MobileMenuButton,
  MobileNavLinks,
  RightSection,
  UserName,
  ProfileButton,
  AuthButton,
} from "./header.styles";

const Header = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const token = localStorage.getItem("token");
  const userInfoInLC = localStorage.getItem("user");
  const parsedUser = JSON.parse(userInfoInLC);
  const isLoggedIn = !!token;
  const loggedInUserName = parsedUser?.name || "";

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const profileContent = <ProfileMenu />;

  return (
    <HeaderStyled>
      <HeaderContainer>
        <Logo tabIndex="0" onClick={() => navigate("/")}>
          Kiraye Pa
        </Logo>

        {/* Desktop Navigation */}
        <NavLinks>
          <NavItem onClick={() => navigate("/add-property")}>
            List It Now
          </NavItem>
          <NavItem onClick={() => navigate("/about-us")}>About Us</NavItem>
          <NavItem onClick={() => navigate("/smart-rent-ai")}>
            SmartRent AI
          </NavItem>
        </NavLinks>

        {/* Mobile Menu Button */}
        <MobileMenuButton onClick={toggleMobileMenu}>
          {mobileMenuOpen ? "✕" : "☰"}
        </MobileMenuButton>

        {/* Right Section */}
        <RightSection>
          {isLoggedIn ? (
            <>
              <UserName>{loggedInUserName}</UserName>
              <Popover placement="bottomRight" content={profileContent}>
                <ProfileButton>
                  <img src="/user/noProfilePic.svg" alt="Profile" />
                </ProfileButton>
              </Popover>
            </>
          ) : (
            <AuthButton onClick={() => navigate("/login")}>Sign In</AuthButton>
          )}
        </RightSection>
      </HeaderContainer>

      {/* Mobile Navigation (only visible when menu is open) */}
      {mobileMenuOpen && (
        <MobileNavLinks>
          <NavItem
            onClick={() => {
              navigate("/add-property");
              setMobileMenuOpen(false);
            }}
          >
            List It Now
          </NavItem>
          <NavItem
            onClick={() => {
              navigate("/about-us");
              setMobileMenuOpen(false);
            }}
          >
            About Us
          </NavItem>
          <NavItem
            onClick={() => {
              navigate("/smart-rent-ai");
              setMobileMenuOpen(false);
            }}
          >
            SmartRent AI
          </NavItem>
          {!isLoggedIn && (
            <NavItem
              onClick={() => {
                navigate("/login");
                setMobileMenuOpen(false);
              }}
            >
              Sign In
            </NavItem>
          )}
        </MobileNavLinks>
      )}
    </HeaderStyled>
  );
};

export default Header;
