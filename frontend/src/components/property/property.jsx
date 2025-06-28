import { useState } from "react";
import {
  areaSizeOptions,
  propertyOptions,
} from "../../pages/addlisting/addlisting.config";
import {
  AreaImage,
  CardContainer,
  CardMetaInfoWrapper,
  ImageWrapper,
  InfoSectionStyled,
} from "./property.styles";

import { HeartOutlined } from "@ant-design/icons";
import { filledHeart, unfilledHeart } from "../../svgs";
import { useNavigate } from "react-router-dom";
import { formatNumberWithCommas } from "../../utils/numberformatter";

const Property = ({ card, width, propsOnLikeOrDislike }) => {
  const navigate = useNavigate();

  const [cardDetails, setCardDetails] = useState({ ...card });

  const {
    rent,
    title,
    desc = "",
    bedrooms,
    bathrooms,
    propertyType,
    areaSizeUnit,
    areaSizeMetric,
    fileNames,
    city,
    _id,
    isLiked,
  } = cardDetails || {};

  const propertyTypeText =
    propertyOptions?.find((property) => property.value === propertyType)
      ?.label || "";

  const propertyAreaText =
    areaSizeOptions?.find((property) => property.value === areaSizeMetric)
      ?.label || "";

  const imgExists = fileNames?.length > 0;
  const path = fileNames?.[0];
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

  const listingId = cardDetails._id;
  const token = localStorage.getItem("token");

  const isUserLoggedIn = !!token;

  const likeOrDislike = async () => {
    try {
      const url = "http://localhost:8080/likedlisting/like-or-unlike";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // ✅ important
          Authorization: `Bearer ${token}`, // ✅ Important
        },
        body: JSON.stringify({ listingId }),
      });
      const result = await response.json();

      const { success, message, error, liked } = result;
      console.log("liked", { liked, result, success });
      if (success) {
        setCardDetails({ ...cardDetails, isLiked: liked });
        propsOnLikeOrDislike?.();
      } else if (error) {
        const details = error?.details[0].message;
      }
    } catch (err) {
      console.log("catch error", err);
    }
  };

  const cityText = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();

  const isDiscountEnabled = cardDetails?.isDiscountEnabled;

  return (
    <CardContainer
      width={width}
      onClick={() => navigate(`/listing/${listingId}`)}
    >
      {/* {listingId} */}
      <ImageWrapper className="ImageWrapper">
        {imgExists ? (
          <AreaImage src={`${API_URL}/uploads/${path}`} alt="property-image" />
        ) : (
          <AreaImage src="/property/adminpropertyimg.jpg" alt="Banner" />
        )}

        <CardMetaInfoWrapper>
          {isDiscountEnabled && (
            <div
              className="discount-badge"
              onClick={(e) => {
                e.stopPropagation();
                likeOrDislike();
              }}
            >
              🏷️
            </div>
          )}

          {isUserLoggedIn && (
            <div
              className={`like-icon ${cardDetails.isLiked ? "liked" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                likeOrDislike();
              }}
            >
              {cardDetails?.isLiked ? filledHeart : unfilledHeart}
            </div>
          )}
        </CardMetaInfoWrapper>
      </ImageWrapper>

      <InfoSectionStyled>
        <div className="price">PKR {formatNumberWithCommas(rent)}</div>
        <div className="type">
          {propertyTypeText} in {cityText}
        </div>
        <div className="amenties-section">
          <div className="amenity">
            <div className="icon">
              <img src="/property/bed.svg" alt="Banner" />
            </div>
            <div className="count">{bedrooms}</div>
          </div>

          <div className="amenity">
            <div className="icon">
              <img src="/property/bath.svg" alt="Banner" />
            </div>
            <div className="count">{bathrooms}</div>
          </div>

          <div className="amenity">
            <div className="icon">
              <img src="/property/area.svg" alt="Banner" />
            </div>
            <div className="count">{`${areaSizeUnit} ${propertyAreaText}`}</div>
          </div>
        </div>

        <div className="title">{title}</div>
        <div className="desc" title={desc}>
          {desc}
        </div>
      </InfoSectionStyled>
    </CardContainer>
  );
};

export default Property;
