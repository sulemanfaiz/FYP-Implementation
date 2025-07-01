import { useNavigate } from "react-router-dom";
import {
  areaSizeOptions,
  propertyOptions,
} from "../../pages/addlisting/addlisting.config";
import {
  ReviewPropertyCardWrapperStyled,
  CardHeaderStyled,
  StatusBadgeStyled,
  ActionButtonStyled,
  CardContentStyled,
  ImageGalleryStyled,
  PropertyImageStyled,
  InfoSectionStyled,
  InfoGridStyled,
  InfoItemStyled,
  SectionTitleStyled,
  DescriptionStyled,
  FeaturesGridStyled,
  FeatureTagStyled,
  OwnerInfoStyled,
  PriceDisplayStyled,
  DiscountBadgeStyled,
  MoreActionsStyled,
  ActionItemStyled,
} from "./reviewpropertycard.styles";

import { Button, Popover, Tag, Tooltip, Divider } from "antd";
import { useState } from "react";
import SetAsInActiveModal from "../setasinactivemodal/setasinactivemodal";
import ApproveListingModal from "../approvemodal";
import RejectListingModal from "../rejectmodal";

import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  CheckOutlined,
  CloseOutlined,
  MoreOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  CalendarOutlined,
  StarOutlined,
} from "@ant-design/icons";

const MoreActions = (props) => {
  const { property, propertyId } = props || {};
  const navigate = useNavigate();
  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);

  const onApproveClick = () => {
    setIsApproveModalVisible(true);
  };

  const handleApproveModalClose = () => {
    setIsApproveModalVisible(false);
  };

  const handleApprove = (data) => {
    setIsApproveModalVisible(false);
  };

  const onRejectClick = () => {
    setIsRejectModalVisible(true);
  };

  const handleRejectModalClose = () => {
    setIsRejectModalVisible(false);
  };

  const handleReject = (data) => {
    setIsRejectModalVisible(false);
  };

  const onViewClick = () => {
    navigate(`/listing/${propertyId}`);
  };

  const isPropertyPending = property?.adminStatus === "PEN";

  return (
    <MoreActionsStyled>
      <ActionItemStyled onClick={onViewClick}>
        <EyeOutlined /> View Details
      </ActionItemStyled>

      {isPropertyPending && (
        <ActionItemStyled onClick={onApproveClick} className="approve">
          <CheckOutlined /> Approve
        </ActionItemStyled>
      )}

      {isPropertyPending && (
        <ActionItemStyled onClick={onRejectClick} className="reject">
          <CloseOutlined /> Reject
        </ActionItemStyled>
      )}

      <ApproveListingModal
        visible={isApproveModalVisible}
        onClose={handleApproveModalClose}
        onSubmit={handleApprove}
      />
      <RejectListingModal
        visible={isRejectModalVisible}
        onClose={handleRejectModalClose}
        onSubmit={handleReject}
      />
    </MoreActionsStyled>
  );
};

const ReviewPropertyCard = (props) => {
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
    adress,
    city,
    garages = 0,
    features = [],
    yearBuilt,
    isDiscountEnabled,
    ownerName,
    ownerPhone,
    ownerEmail,
  } = listing || {};

  const imgExists = fileNames?.length > 0;
  const path = fileNames?.[0];

  const propertyTypeText =
    propertyOptions?.find((property) => property.value === propertyType)
      ?.label || "";

  const propertyAreaText =
    areaSizeOptions?.find((property) => property.value === areaSizeMetric)
      ?.label || "";

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

  const statusConfig = {
    APR: {
      label: "Approved",
      color: "success",
      icon: <CheckCircleOutlined />,
      bgColor: "#f6ffed",
      borderColor: "#b7eb8f",
    },
    PEN: {
      label: "Pending Review",
      color: "warning",
      icon: <ClockCircleOutlined />,
      bgColor: "#fffbe6",
      borderColor: "#ffe58f",
    },
    REJ: {
      label: "Rejected",
      color: "error",
      icon: <CloseCircleOutlined />,
      bgColor: "#fff2f0",
      borderColor: "#ffccc7",
    },
  };

  const status = statusConfig[listing?.adminStatus] || statusConfig.PEN;
  const content = <MoreActions propertyId={listing?._id} property={listing} />;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <ReviewPropertyCardWrapperStyled>
      {/* Header with Status and Actions */}
      <CardHeaderStyled>
        <StatusBadgeStyled
          color={status.color}
          icon={status.icon}
          style={{
            backgroundColor: status.bgColor,
            borderColor: status.borderColor,
            border: `1px solid ${status.borderColor}`,
          }}
        >
          {status.label}
        </StatusBadgeStyled>

        <Popover
          placement="bottomRight"
          title="Actions"
          content={content}
          trigger="click"
        >
          <ActionButtonStyled>
            <MoreOutlined />
          </ActionButtonStyled>
        </Popover>
      </CardHeaderStyled>

      <CardContentStyled onClick={propsOnClick}>
        {/* Property Images */}
        {imgExists && (
          <ImageGalleryStyled>
            {fileNames?.slice(0, 3).map((path, index) => (
              <PropertyImageStyled
                key={`${path}-${index}`}
                src={`${API_URL}/uploads/${path}`}
                alt={`Property ${index + 1}`}
              />
            ))}
            {fileNames?.length > 3 && (
              <PropertyImageStyled className="more-images">
                +{fileNames.length - 3} more
              </PropertyImageStyled>
            )}
          </ImageGalleryStyled>
        )}

        {/* Property Information */}
        <InfoSectionStyled>
          <div className="main-info">
            <h3 className="property-title">{title}</h3>
            <p className="property-location">
              <EnvironmentOutlined /> {adress}, {city}
            </p>

            <PriceDisplayStyled>
              <span className="price">{formatPrice(rent)}</span>
              <span className="period">/month</span>
              {isDiscountEnabled && (
                <DiscountBadgeStyled>
                  {listing?.discountPercentage}% OFF
                </DiscountBadgeStyled>
              )}
            </PriceDisplayStyled>
          </div>

          <InfoGridStyled>
            <InfoItemStyled>
              <HomeOutlined />
              <div>
                <span className="label">Type</span>
                <span className="value">{propertyTypeText}</span>
              </div>
            </InfoItemStyled>

            <InfoItemStyled>
              <StarOutlined />
              <div>
                <span className="label">Area</span>
                <span className="value">
                  {areaSizeUnit} {propertyAreaText}
                </span>
              </div>
            </InfoItemStyled>

            <InfoItemStyled>
              <span className="icon">🛏️</span>
              <div>
                <span className="label">Bedrooms</span>
                <span className="value">{bedrooms}</span>
              </div>
            </InfoItemStyled>

            <InfoItemStyled>
              <span className="icon">🚿</span>
              <div>
                <span className="label">Bathrooms</span>
                <span className="value">{bathrooms}</span>
              </div>
            </InfoItemStyled>

            {garages > 0 && (
              <InfoItemStyled>
                <span className="icon">🚗</span>
                <div>
                  <span className="label">Garages</span>
                  <span className="value">{garages}</span>
                </div>
              </InfoItemStyled>
            )}

            {yearBuilt && (
              <InfoItemStyled>
                <CalendarOutlined />
                <div>
                  <span className="label">Year Built</span>
                  <span className="value">{yearBuilt}</span>
                </div>
              </InfoItemStyled>
            )}
          </InfoGridStyled>

          {/* Description */}
          {desc && (
            <DescriptionStyled>
              <SectionTitleStyled>Description</SectionTitleStyled>
              <p>{desc}</p>
            </DescriptionStyled>
          )}

          {/* Features */}
          {features?.length > 0 && (
            <div className="features-section">
              <SectionTitleStyled>Features & Amenities</SectionTitleStyled>
              <FeaturesGridStyled>
                {features?.map((amenity) => (
                  <FeatureTagStyled key={amenity?.key}>
                    {amenity?.label}
                    {amenity?.count > 1 && (
                      <span className="count">({amenity?.count})</span>
                    )}
                  </FeatureTagStyled>
                ))}
              </FeaturesGridStyled>
            </div>
          )}

          <Divider />

          {/* Owner Information */}
          <OwnerInfoStyled>
            <SectionTitleStyled>
              <UserOutlined /> Property Owner
            </SectionTitleStyled>
            <div className="owner-details">
              <div className="owner-item">
                <UserOutlined />
                <span>{ownerName}</span>
              </div>
              <div className="owner-item">
                <MailOutlined />
                <span>{ownerEmail}</span>
              </div>
              <div className="owner-item">
                <PhoneOutlined />
                <span>{ownerPhone}</span>
              </div>
            </div>
          </OwnerInfoStyled>
        </InfoSectionStyled>
      </CardContentStyled>
    </ReviewPropertyCardWrapperStyled>
  );
};

export default ReviewPropertyCard;
