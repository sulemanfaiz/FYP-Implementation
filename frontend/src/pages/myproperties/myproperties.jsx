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
import { NoDataFound } from "../../components/nodatafound";
import { PageLoader } from "../../components/pageloader";

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
          <NoDataFound />
        </NoListingFoundStyled>
      ) : (
        listings?.map((listing) => (
          <PropertyCard
            listing={listing}
            propsOnClick={() => onPropertyClick(listing?._id)}
            showActions={false}
            key={listing?._id}
          />
        ))
      )}
    </ListingsStyled>
  );
};

const MyPoperties = (props) => {
  const [spinning, setSpinning] = useState(true);

  const { isLikedPropertiesListing } = props;
  const [tab, setTab] = useState("1");
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  const onChange = (key) => {
    setTab(key);
  };

  const statusFilters = {
    1: () => listings, // All Listings
    2: () => listings?.filter((l) => l?.adminStatus === "APR"),
    3: () => listings?.filter((l) => l?.adminStatus === "PEN"),
    4: () => listings?.filter((l) => l?.adminStatus === "REJ"),
    5: () => listings?.filter((l) => l?.userStatus === "DFT"),
    6: () => listings?.filter((l) => l?.userStatus === "INA"),
  };

  const items = [
    { key: "1", label: "All Listings" },
    { key: "2", label: "Active Listings" },
    { key: "3", label: "Pending Listings" },
    { key: "4", label: "Rejected Listings" },
    { key: "5", label: "Draft Listings" },
    { key: "6", label: "In-Active Listings" },
  ]?.map((item) => ({
    ...item,
    children: <PropertyListing listings={statusFilters[item?.key]?.() || []} />,
  }));

  const token = localStorage.getItem("token");

  const getUserListings = async () => {
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
    } finally {
      setSpinning(false);
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
          <PageLoader spinning={spinning} />

          <StyledTabs items={items} onChange={onChange} />
        </PropertiesListingStyled>
      </MyPopertiesPageWrapperStyled>
      <Footer />
    </MyPopertiesPageStyled>
  );
};

export default MyPoperties;
