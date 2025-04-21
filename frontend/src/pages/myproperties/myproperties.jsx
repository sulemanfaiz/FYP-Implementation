import PropertyCard from "../../components/propertycard";
import StyledTabs from "../../components/styledtabs";
import {
  ListingsStyled,
  MyPopertiesPageStyled,
  PropertiesListingStyled,
} from "./myproperties.styles";

import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import PageBanner from "../../components/pagebanner";

const PropertyListing = (props) => {
  const { listings } = props || {};
  const navigate = useNavigate();

  const onPropertyClick = (propertyId) => {
    navigate("/my-properties/" + propertyId);
  };

  return (
    <ListingsStyled>
      {listings?.map((listing) => (
        <PropertyCard
          listing={listing}
          propsOnClick={() => onPropertyClick(listing?._id)}
          showActions={false}
        />
      ))}
    </ListingsStyled>
  );
};

const MyPoperties = () => {
  const [tab, setTab] = useState("1");
  const [listings, setListings] = useState([]);

  const onChange = (key) => {
    setTab(key);
  };

  const items = [
    {
      key: "1",
      label: "All Listings",
      children: <PropertyListing listings={listings} />,
    },
    {
      key: "2",
      label: "Active Listings",
      children: <PropertyListing listings={listings} />,
    },
    {
      key: "3",
      label: "Draft Listings",
      children: <PropertyListing listings={listings} />,
    },
    {
      key: "4",
      label: "In-Active Listings",
      children: <PropertyListing listings={listings} />,
    },
  ];

  const token = localStorage.getItem("token");

  const allListings = listings;

  const activeListings = listings.filter(
    (listing) => listing?.status === "ACT"
  );

  const inActiveListings = listings.filter(
    (listing) => listing?.status === "INA"
  );

  const isAllActiveTab = tab === "1";
  const isActiveTab = tab === "2";

  const userProperties = isAllActiveTab
    ? allListings
    : isActiveTab
    ? activeListings
    : inActiveListings;

  const getUserListings = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/listing/get-listings",
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
      <PageBanner
        heading="My Properties"
        description="Your added properties at a glance — update, view, or remove as needed"
      />

      <PropertiesListingStyled>
        <StyledTabs items={items} onChange={onChange} />
      </PropertiesListingStyled>
    </MyPopertiesPageStyled>
  );
};

export default MyPoperties;
