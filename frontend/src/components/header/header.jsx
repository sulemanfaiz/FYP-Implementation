import { Button, Popover } from "antd";
import {
  HeaderStyled,
  LeftSectionContainer,
  Logo,
  NavItem,
  NavLinks,
  SignedInUserInfoWrapperStyled,
  SignInButton,
} from "./header.styles";
import { useNavigate } from "react-router-dom";
import ProfileMenu from "../profilemenu";

const Header = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userInfoInLC = localStorage.getItem("user");
  const parsedUser = JSON.parse(userInfoInLC);

  const isLoggedIn = !!token;

  const loggedInUserName = parsedUser?.name || "";

  const content = <ProfileMenu />;

  return (
    <HeaderStyled>
      <LeftSectionContainer>
        <Logo tabIndex="0" onClick={() => navigate("/")}>
          Kiraye Pa
        </Logo>
        <NavLinks>
          <NavItem tabIndex="0" onClick={() => navigate("/add-property")}>
            List It Now
          </NavItem>
          <NavItem tabIndex="0" onClick={() => navigate("/about-us")}>
            About Us
          </NavItem>
          <NavItem tabIndex="0" onClick={() => navigate("/smart-rent-ai")}>
            SmartRent AI
          </NavItem>
        </NavLinks>
      </LeftSectionContainer>

      {isLoggedIn ? (
        <SignedInUserInfoWrapperStyled>
          <div className="user"> {loggedInUserName}</div>

          <Popover placement="bottomRight" title="" content={content}>
            <Button className="profile-btn">
              <img src="/user/noProfilePic.svg" alt="User" />
            </Button>
          </Popover>
        </SignedInUserInfoWrapperStyled>
      ) : (
        <SignInButton
          aria-label="Sign In"
          className="SignInButton"
          onClick={() => {
            navigate("/login");
          }}
        >
          Sign In
        </SignInButton>
      )}
    </HeaderStyled>
  );
};

export default Header;
