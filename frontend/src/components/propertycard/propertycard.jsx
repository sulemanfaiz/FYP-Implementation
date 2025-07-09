import { useNavigate } from "react-router-dom";
import {
  areaSizeOptions,
  propertyOptions,
} from "../../pages/addlisting/addlisting.config";
import {
  MoreActionItemStyled,
  MoreActionWrapperStyled,
  MoreButtonWrapperStyled,
  PropertyCardWrapperStyled,
  StatusTagStyled,
  TagStyled,
  PremiumBadgeStyled,
  ImageContainerStyled,
  SoldBannerStyled,
} from "./propertycard.styles";

import { Popover, Button, message } from "antd";
import { useState } from "react";
import SetAsInActiveModal from "../setasinactivemodal/setasinactivemodal";
import { formatNumberWithCommas } from "../../utils/numberformatter";
import { BorderedButtonStyled } from "../../app.styles";
import ApproveListingModal from "../approvemodal";
import RejectListingModal from "../rejectmodal";

import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const MoreActions = (props) => {
  const { propertyId } = props || {};
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);

  const userInfoInLC = localStorage.getItem("user");
  const parsedUser = JSON.parse(userInfoInLC);

  const isLoggedInUserIsAdmin = parsedUser?.isAdmin || false;

  const onEditClick = () => {
    navigate("/edit-property/" + propertyId);
  };

  const onDuplicateClick = () => {
    navigate("/duplicate-property/" + propertyId);
  };

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

  const onMarkInactiveClick = () => {
    setIsModalVisible(true);
  };
  const handleModalSubmit = (data) => {
    setIsModalVisible(false);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const onViewClick = () => {
    navigate(`/listing/${propertyId}`);
  };

  return (
    <MoreActionWrapperStyled>
      <MoreActionItemStyled onClick={onViewClick}>View</MoreActionItemStyled>

      {isLoggedInUserIsAdmin ? (
        <>
          <MoreActionItemStyled onClick={onApproveClick}>
            Approve
          </MoreActionItemStyled>
          <MoreActionItemStyled onClick={onRejectClick}>
            Reject
          </MoreActionItemStyled>
        </>
      ) : (
        <>
          <MoreActionItemStyled onClick={onEditClick}>
            Edit
          </MoreActionItemStyled>
          <MoreActionItemStyled onClick={onDuplicateClick}>
            Duplicate Property
          </MoreActionItemStyled>
          <MoreActionItemStyled onClick={onMarkInactiveClick}>
            Mark As In-Active
          </MoreActionItemStyled>
        </>
      )}

      <SetAsInActiveModal
        visible={isModalVisible}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />

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
    </MoreActionWrapperStyled>
  );
};

const PropertyCard = (props) => {
  const {
    listing,
    showActions,
    propsOnClick,
    showFeatureButton,
    onFeatureSuccess,
  } = props || {};
  const navigate = useNavigate();
  const [featuring, setFeaturing] = useState(false);
  const {
    _id,
    rent,
    title,
    desc = "",
    bedrooms,
    bathrooms,
    propertyType,
    areaSizeUnit,
    areaSizeMetric,
    fileNames,
    isPremium,
    adminStatus,
  } = listing || {};

  const imgExists = fileNames?.length > 0;
  const path = fileNames?.[0];

  const propertyTypeText =
    propertyOptions?.find((property) => property.value === propertyType)
      ?.label || "";

  const propertyAreaText =
    areaSizeOptions?.find((property) => property.value === areaSizeMetric)
      ?.label || "";

  const content = <MoreActions propertyId={_id} />;

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

  const tagLabel = {
    APR: "Approved",
    PEN: "Pending",
    REJ: "Rejected",
  };

  const tagColor = {
    APR: "#52c41a",
    PEN: "#faad14",
    REJ: "#ff4d4f",
  };

  const tagIcon = {
    APR: <CheckCircleOutlined />,
    PEN: <ClockCircleOutlined />,
    REJ: <CloseCircleOutlined />,
  };

  const statusTag = tagLabel[adminStatus];
  const statusTagIcon = tagIcon[adminStatus];
  const tagClr = tagColor[adminStatus];

  const token = localStorage.getItem("token");

  const handleFeatureProperty = async (e) => {
    e.stopPropagation(); // Prevent card click event
    setFeaturing(true);
    try {
      const response = await fetch(`${API_URL}/listing/feature/${_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (result.success) {
        message.success("Property featured successfully!");
        if (onFeatureSuccess) {
          onFeatureSuccess(); // Callback to refresh the list
        }
      } else {
        message.error(result.message || "Failed to feature property.");
      }
    } catch (error) {
      message.error("An error occurred while featuring the property.");
      console.error("Feature property error:", error);
    } finally {
      setFeaturing(false);
    }
  };

  const handleCardClick = () => {
    if (propsOnClick) {
      propsOnClick();
    } else if (_id) {
      navigate(`/listing/${_id}`);
    }
  };

  const isSold = listing?.isRented || listing?.status === "sold";

  return (
    <PropertyCardWrapperStyled
      onClick={handleCardClick}
      className="property-card"
    >
      {/* More Actions Button - positioned on the card */}
      {showActions && (
        <MoreButtonWrapperStyled onClick={(e) => e.stopPropagation()}>
          <Popover
            placement="bottomRight"
            title=""
            content={content}
            trigger="click"
          >
            <BorderedButtonStyled>More</BorderedButtonStyled>
          </Popover>
        </MoreButtonWrapperStyled>
      )}

      {/* Image Container with Premium Badge */}
      <ImageContainerStyled>
        {imgExists ? (
          <img
            className="property-image"
            src={`${API_URL}/uploads/${path}`}
            alt={title}
          />
        ) : (
          <img src="/property/adminpropertyimg.jpg" alt="Default property" />
        )}
        {isSold && <SoldBannerStyled>SOLD</SoldBannerStyled>}
        {isPremium && <PremiumBadgeStyled>Premium</PremiumBadgeStyled>}
      </ImageContainerStyled>

      {/* Info Section */}
      <div className="info-section">
        {/* Price and Status Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "4px",
          }}
        >
          <div className="price">PKR {formatNumberWithCommas(rent)}</div>

          {/* Status Tag - inline with price instead of absolute positioning */}
          {!showActions && adminStatus && (
            <div
              style={{
                display: "flex",
                gap: "4px",
                alignItems: "center",
                fontSize: "10px",
                fontWeight: "600",
                padding: "2px 6px",
                borderRadius: "8px",
                background: "#f5f5f5",
                border: "1px solid #e0e0e0",
              }}
            >
              <span style={{ fontSize: "10px", color: tagClr }}>
                {statusTagIcon}
              </span>
              <span style={{ color: tagClr, textTransform: "uppercase" }}>
                {statusTag}
              </span>
            </div>
          )}
        </div>

        <div className="type">
          <div className="box" />
          {propertyTypeText}
        </div>

        <div className="amenties-section">
          <div className="amenity">
            <div className="icon">
              <img src="/property/bed.svg" alt="Bedrooms" />
            </div>
            <div className="count">{bedrooms}</div>
          </div>

          <div className="amenity">
            <div className="icon">
              <img src="/property/bath.svg" alt="Bathrooms" />
            </div>
            <div className="count">{bathrooms}</div>
          </div>

          <div className="amenity">
            <div className="icon">
              <img src="/property/area.svg" alt="Area" />
            </div>
            <div className="count">{`${areaSizeUnit} ${propertyAreaText}`}</div>
          </div>
        </div>

        <div className="title" title={title}>
          {title}
        </div>
        <div className="desc" title={desc}>
          {desc}
        </div>

        {showFeatureButton && !isPremium && (
          <div
            style={{ marginTop: "10px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              type="primary"
              block
              loading={featuring}
              onClick={handleFeatureProperty}
            >
              Pay $5 to Feature
            </Button>
          </div>
        )}
      </div>
    </PropertyCardWrapperStyled>
  );
};

export default PropertyCard;
