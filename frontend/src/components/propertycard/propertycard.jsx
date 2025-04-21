import { useNavigate } from "react-router-dom";
import {
  areaSizeOptions,
  propertyOptions,
} from "../../pages/addlisting/addlisting.config";
import {
  MoreActionItemStyled,
  MoreButtonWrapperStyled,
  PropertyCardWrapperStyled,
} from "./propertycard.styles";

import { Button, ConfigProvider, Flex, Popover } from "antd";

const MoreActions = (props) => {
  const { propertyId } = props || {};
  const navigate = useNavigate();

  const onEditClick = () => {
    navigate("/edit-property/" + propertyId);
  };

  const onDuplicateClick = () => {
    navigate("/duplicate-property/" + propertyId);
  };

  return (
    <div className="more-actions">
      <MoreActionItemStyled onClick={onEditClick}>Edit</MoreActionItemStyled>
      <MoreActionItemStyled onClick={onDuplicateClick}>
        Duplicate Property
      </MoreActionItemStyled>
      <MoreActionItemStyled>Mark As In-Active</MoreActionItemStyled>
    </div>
  );
};

const PropertyCard = (props) => {
  const { listing, propsOnClick, showActions } = props || {};
  const {
    rent,
    title,
    desc,
    bedrooms,
    bathrooms,
    propertyType,
    areaSizeUnit,
    areaSizeMetric,
  } = listing || {};

  const propertyTypeText =
    propertyOptions?.find((property) => property.value === propertyType)
      ?.label || "";

  const propertyAreaText =
    areaSizeOptions?.find((property) => property.value === areaSizeMetric)
      ?.label || "";

  const content = <MoreActions propertyId={listing?._id} />;

  return (
    <PropertyCardWrapperStyled onClick={propsOnClick} className="property-card">
      {showActions && (
        <MoreButtonWrapperStyled>
          <Popover placement="bottomRight" title="" content={content}>
            <Button>More</Button>
          </Popover>
        </MoreButtonWrapperStyled>
      )}
      <div className="img-section">
        <img src="/property/adminpropertyimg.jpg" alt="Banner" />
      </div>

      <div className="info-section">
        <div className="price">PKR {rent}</div>
        <div className="type">{propertyTypeText}</div>
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
        <div className="desc">{desc}</div>
      </div>
    </PropertyCardWrapperStyled>
  );
};

export default PropertyCard;
