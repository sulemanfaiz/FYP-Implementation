import PropertyCard from "../../components/propertycard";
import StyledTabs from "../../components/styledtabs";
import {
  AddPropertyButtonStyled,
  ListingsStyled,
  MyPopertiesPageStyled,
  MyPopertiesPageWrapperStyled,
  NoListingFoundStyled,
  PropertiesListingStyled,
} from "./myproperties.styles";

import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import PageBanner from "../../components/pagebanner";
import Header from "../../components/header/header";
import { Footer } from "../../components";

const PropertyListing = (props) => {
  const { listings } = props || {};
  const navigate = useNavigate();

  const onPropertyClick = (propertyId) => {
    navigate("/my-properties/" + propertyId);
  };

  const isListingEmpty = !listings || listings?.length === 0;

  return (
    <ListingsStyled>
      {isListingEmpty ? (
        <NoListingFoundStyled>
          <div className="text">No Properties found</div>
          <img src="/property/nolistingfound.svg" alt="no-listing-found" />
        </NoListingFoundStyled>
      ) : (
        listings?.map((listing) => (
          <PropertyCard
            listing={listing}
            propsOnClick={() => onPropertyClick(listing?._id)}
            showActions={false}
          />
        ))
      )}
    </ListingsStyled>
  );
};

const MyPoperties = (props) => {
  const { isLikedPropertiesListing } = props;
  const [tab, setTab] = useState("1");
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  const onChange = (key) => {
    setTab(key);
  };

  const allListings = listings;

  const activeListings = listings.filter(
    (listing) => listing?.status === "ACT"
  );

  const inActiveListings = listings.filter(
    (listing) => listing?.status === "INA"
  );

  const draftListings = listings.filter((listing) => listing?.status === "DFT");

  const isAllActiveTab = tab === "1";
  const isActiveTab = tab === "2";
  const isDraftTab = tab === "3";

  const userProperties = isAllActiveTab
    ? allListings
    : isActiveTab
    ? activeListings
    : isDraftTab
    ? draftListings
    : inActiveListings;

  const items = [
    {
      key: "1",
      label: "All Listings",
      children: <PropertyListing listings={userProperties} />,
    },
    {
      key: "2",
      label: "Active Listings",
      children: <PropertyListing listings={userProperties} />,
    },
    {
      key: "3",
      label: "Draft Listings",
      children: <PropertyListing listings={userProperties} />,
    },
    {
      key: "4",
      label: "In-Active Listings",
      children: <PropertyListing listings={userProperties} />,
    },
  ];

  const token = localStorage.getItem("token");

  const getUserListings = async () => {
    const urlContrller = isLikedPropertiesListing ? "likedlisting" : "listing";

    const urlEndPoint = isLikedPropertiesListing
      ? "get-user-liked-listings"
      : "get-user-listings";

    try {
      const response = await fetch(
        `http://localhost:8080/listing/get-user-listings`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Important
          },
        }
      );
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        const listings = result.listings || [];
        console.log("listings", listings);
        setListings(listings);
      } else if (error) {
        const details = error?.details[0].message;
      }
    } catch (err) {
      console.log("catch error", err);
    }
  };

  useEffect(() => {
    getUserListings();
  }, []);

  return (
    <MyPopertiesPageStyled>
      <Header />
      <MyPopertiesPageWrapperStyled>
        <PageBanner
          heading={`${isLikedPropertiesListing ? "Liked" : "My"} Properties`}
          description={`Your ${
            isLikedPropertiesListing ? "liked" : "added"
          } properties at a glance — update, view, or remove as needed`}
        />

        <PropertiesListingStyled>
          {!isLikedPropertiesListing && (
            <AddPropertyButtonStyled onClick={() => navigate("/add-property")}>
              Add Property
            </AddPropertyButtonStyled>
          )}

          <StyledTabs items={items} onChange={onChange} />
        </PropertiesListingStyled>
      </MyPopertiesPageWrapperStyled>
      <Footer />
    </MyPopertiesPageStyled>
  );
};

export default MyPoperties;
