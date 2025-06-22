import { useNavigate } from "react-router-dom";
import { ProfileMenuItemStyled, ProfileMenuStyled } from "./profilemenu.styles";

const ProfileMenu = () => {
  const navigate = useNavigate();

  const onMyPropertiesClick = () => {
    navigate("/my-properties/");
  };

  const onLikedPropertiesClick = () => {
    navigate("/liked-properties/");
  };

  const onSignOutClick = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <ProfileMenuStyled>
      <ProfileMenuItemStyled>Profile Settings</ProfileMenuItemStyled>
      <ProfileMenuItemStyled onClick={onMyPropertiesClick}>
        My Properties
      </ProfileMenuItemStyled>
      <ProfileMenuItemStyled onClick={onLikedPropertiesClick}>
        Liked Properties
      </ProfileMenuItemStyled>
      <ProfileMenuItemStyled onClick={onSignOutClick}>
        Sign Out
      </ProfileMenuItemStyled>
    </ProfileMenuStyled>
  );
};

export default ProfileMenu;
