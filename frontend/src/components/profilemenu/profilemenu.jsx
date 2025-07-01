import { useNavigate } from "react-router-dom";
import { ProfileMenuItemStyled, ProfileMenuStyled } from "./profilemenu.styles";

const ProfileMenu = () => {
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const userInfoInLC = localStorage.getItem("user");
  const parsedUser = JSON.parse(userInfoInLC);

  const isLoggedInUserIsAdmin = parsedUser?.isAdmin || false;

  const navigate = useNavigate();

  const onMyPropertiesClick = () => {
    navigate("/my-properties/");
  };

  const onReviewPropertiesClick = () => {
    navigate("/admin/review-listings/");
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
      {isLoggedIn && (
        <>
          {isLoggedInUserIsAdmin ? (
            <ProfileMenuItemStyled onClick={onReviewPropertiesClick}>
              Review Properties
            </ProfileMenuItemStyled>
          ) : (
            <>
              <ProfileMenuItemStyled onClick={onMyPropertiesClick}>
                My Properties
              </ProfileMenuItemStyled>
              <ProfileMenuItemStyled onClick={onLikedPropertiesClick}>
                Liked Properties
              </ProfileMenuItemStyled>
            </>
          )}
        </>
      )}

      <ProfileMenuItemStyled onClick={onSignOutClick}>
        Sign Out
      </ProfileMenuItemStyled>
    </ProfileMenuStyled>
  );
};

export default ProfileMenu;
