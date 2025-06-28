import { useNavigate } from "react-router-dom";
import {
  areaSizeOptions,
  propertyOptions,
} from "../../pages/addlisting/addlisting.config";
import {
  MoreActionItemStyled,
  MoreButtonStyled,
  MoreButtonWrapperStyled,
  PropertyCardWrapperStyled,
} from "./propertycard.styles";

import { Button, ConfigProvider, Flex, Popover } from "antd";
import { useState } from "react";
import SetAsInActiveModal from "../setasinactivemodal/setasinactivemodal";
import { formatNumberWithCommas } from "../../utils/numberformatter";
import { TypeOfPropertyStyled } from "../../pages/listingdetail/listingdetailstyles";
import { BorderedButtonStyled } from "../../app.styles";

const MoreActions = (props) => {
  const { propertyId } = props || {};
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onEditClick = () => {
    navigate("/edit-property/" + propertyId);
  };

  const onDuplicateClick = () => {
    navigate("/duplicate-property/" + propertyId);
  };

  const onMarkInactiveClick = () => {
    setIsModalVisible(true); // Show the modal
  };
  const handleModalSubmit = (data) => {
    setIsModalVisible(false); // Close the modal after submission
  };

  const handleModalClose = () => {
    setIsModalVisible(false); // Close the modal without submission
  };

  const onViewClick = () => {
    navigate(`/listing/${propertyId}`); // Navigate to the ListingDetail page with the property ID
  };

  return (
    <div className="more-actions">
      <MoreActionItemStyled onClick={onViewClick}>View</MoreActionItemStyled>

      <MoreActionItemStyled onClick={onEditClick}>Edit</MoreActionItemStyled>
      <MoreActionItemStyled onClick={onDuplicateClick}>
        Duplicate Property
      </MoreActionItemStyled>
      <MoreActionItemStyled onClick={onMarkInactiveClick}>
        Mark As In-Active
      </MoreActionItemStyled>

      <SetAsInActiveModal
        visible={isModalVisible}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

const PropertyCard = (props) => {
  const { listing, propsOnClick, showActions } = props || {};
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
  } = listing || {};

  const imgExists = fileNames?.length > 0;
  const path = fileNames?.[0];

  const propertyTypeText =
    propertyOptions?.find((property) => property.value === propertyType)
      ?.label || "";

  const propertyAreaText =
    areaSizeOptions?.find((property) => property.value === areaSizeMetric)
      ?.label || "";

  const content = <MoreActions propertyId={listing?._id} />;

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

  return (
    <PropertyCardWrapperStyled onClick={propsOnClick} className="property-card">
      {showActions && (
        <MoreButtonWrapperStyled>
          <Popover placement="bottomRight" title="" content={content}>
            <BorderedButtonStyled>More</BorderedButtonStyled>
          </Popover>
        </MoreButtonWrapperStyled>
      )}
      <div className="img-section">
        {imgExists ? (
          <img
            className="property-image"
            src={`${API_URL}/uploads/${path}`}
            alt="property-image"
          />
        ) : (
          <img src="/property/adminpropertyimg.jpg" alt="Banner" />
        )}
      </div>

      <div className="info-section">
        <div className="price">PKR {formatNumberWithCommas(rent)}</div>
        <div className="type">
          <div className="box" />
          {propertyTypeText}
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
      </div>
    </PropertyCardWrapperStyled>
  );
};

export default PropertyCard;
