import { Link } from "react-router";
import {
  BorderedButton,
  FilledButton,
  ProfileLeftNavbarStyled,
  ProfileNavbarStyled,
  ProfileRightNavbarStyled,
} from "./profilenavbarstyles";

const ProfileNavbar = () => {
  return (
    <ProfileNavbarStyled>
      <ProfileLeftNavbarStyled>KirayePe!</ProfileLeftNavbarStyled>

      <ProfileRightNavbarStyled>
        <BorderedButton>My Listings</BorderedButton>
        <FilledButton>
          <Link to="/add-listing">Post Listing</Link>
        </FilledButton>
      </ProfileRightNavbarStyled>
    </ProfileNavbarStyled>
  );
};

export default ProfileNavbar;
