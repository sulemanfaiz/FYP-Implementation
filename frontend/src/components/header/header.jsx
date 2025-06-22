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

  console.log({ userInfoInLC, parsedUser: parsedUser });

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
          <NavItem tabIndex="0" onClick={() => navigate("/home")}>
            List It Now
          </NavItem>
          <NavItem tabIndex="0">About Us</NavItem>
          <NavItem tabIndex="0">SmartRent AI</NavItem>
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
