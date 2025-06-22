import { useParams } from "react-router-dom";
import PropertyCard from "../../components/propertycard";
import StyledTabs from "../../components/styledtabs";
import {
  MyPopertyBannerWrapperStyled,
  MyPopertyPageStyled,
  MyPopertyPageWrapperStyled,
  PropertyListingStyled,
} from "./myproperty.styles";

import { useEffect, useState } from "react";
import PageBanner from "../../components/pagebanner";
import Header from "../../components/header/header";

const MyPoperties = () => {
  const [property, setProperty] = useState({});

  const params = useParams();
  const propertyId = params.id;

  const token = localStorage.getItem("token");

  const getListingDetailBasedOnId = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/listing/get-listing-detail/" + propertyId,
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
        const listing = result.data || {};
        console.log("listing", listing);
        setProperty(listing);
      } else if (error) {
        const details = error?.details[0].message;
      }
    } catch (err) {
      console.log("catch error", err);
    }
  };

  useEffect(() => {
    getListingDetailBasedOnId();
  }, []);

  return (
    <MyPopertyPageStyled>
      <Header />
      <MyPopertyPageWrapperStyled>
        <PageBanner
          heading="Property Details"
          description={`Property details for ${property?.title}`}
        />

        <PropertyListingStyled>
          <PropertyCard listing={property} showActions />
        </PropertyListingStyled>
      </MyPopertyPageWrapperStyled>
    </MyPopertyPageStyled>
  );
};

export default MyPoperties;
