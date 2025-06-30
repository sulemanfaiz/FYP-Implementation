import { useParams } from "react-router-dom";
import PropertyCard from "../../components/propertycard";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

import {
  MyPopertyBannerWrapperStyled,
  MyPopertyPageStyled,
  MyPopertyPageWrapperStyled,
  PropertyListingStyled,
  PropertyRejectedWrapperStyled,
} from "./myproperty.styles";

import { useEffect, useState } from "react";
import PageBanner from "../../components/pagebanner";
import Header from "../../components/header/header";
import { ReviewPropertyCard } from "../../components";

const MyPoperties = () => {
  const [property, setProperty] = useState({});

  const params = useParams();
  const propertyId = params.id;

  const token = localStorage.getItem("token");
  const userInfoInLC = localStorage.getItem("user");
  const parsedUser = JSON.parse(userInfoInLC);

  const isLoggedInUserIsAdmin = parsedUser?.isAdmin || false;

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

  const domSanitization = (str) => {
    try {
      return DOMPurify.sanitize(str);
    } catch {
      return "";
    }
  };

  const parseStringToHtml = (text, doDOMSanitization) => {
    try {
      const textWithDefaultValue = text || "";

      return parse(
        doDOMSanitization
          ? domSanitization(textWithDefaultValue)
          : textWithDefaultValue
      );
    } catch (error) {
      return text || "";
    }
  };

  const isPropertyRejected = property?.adminStatus === "REJ";

  return (
    <MyPopertyPageStyled>
      <Header />
      <MyPopertyPageWrapperStyled>
        <PageBanner
          heading="Property Details"
          description={`Property details for ${property?.title}`}
        />

        <PropertyListingStyled>
          {isLoggedInUserIsAdmin ? (
            <ReviewPropertyCard listing={property} />
          ) : (
            <PropertyCard listing={property} showActions />
          )}
        </PropertyListingStyled>

        {!isLoggedInUserIsAdmin && isPropertyRejected && (
          <PropertyRejectedWrapperStyled>
            {parseStringToHtml(property?.adminComment)}
          </PropertyRejectedWrapperStyled>
        )}
      </MyPopertyPageWrapperStyled>
    </MyPopertyPageStyled>
  );
};

export default MyPoperties;
