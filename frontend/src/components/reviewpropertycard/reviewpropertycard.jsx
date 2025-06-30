import { useNavigate } from "react-router-dom";
import {
  areaSizeOptions,
  propertyOptions,
} from "../../pages/addlisting/addlisting.config";
import {
  ImgStyled,
  ImgWrapperStyled,
  MenuWrapperStyled,
  MoreActionItemStyled,
  MoreActionWrapperStyled,
  MoreButtonWrapperStyled,
  PropertyCardWrapperStyled,
  PropertyStatusTagStyled,
  ReviewPropertyCardWrapperStyled,
  RowStyled,
  RowWrapperStyled,
  SectionStyled,
  SectionsWrapperStyled,
  TitleStyled,
} from "./reviewpropertycard.styles";

import { Button, ConfigProvider, Flex, Popover } from "antd";
import { useState } from "react";
import SetAsInActiveModal from "../setasinactivemodal/setasinactivemodal";
import { BorderedButtonStyled } from "../../app.styles";
import ApproveListingModal from "../approvemodal";
import RejectListingModal from "../rejectmodal";

import { CheckCircleOutlined } from "@ant-design/icons";
import { ClockCircleOutlined } from "@ant-design/icons";
import { CloseCircleOutlined } from "@ant-design/icons";
import {
  StatusTagStyled,
  TagStyled,
} from "../propertycard/propertycard.styles";

const MoreActions = (props) => {
  const { property, propertyId } = props || {};
  const navigate = useNavigate();
  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);

  const userInfoInLC = localStorage.getItem("user");
  const parsedUser = JSON.parse(userInfoInLC);

  const onApproveClick = () => {
    setIsApproveModalVisible(true); // Show the modal
  };

  const handleApproveModalClose = () => {
    setIsApproveModalVisible(false); // Close the modal without submission
  };

  const handleApprove = (data) => {
    setIsApproveModalVisible(false); // Close the modal after submission
  };

  const onRejectClick = () => {
    setIsRejectModalVisible(true); // Show the modal
  };

  const handleRejectModalClose = () => {
    setIsRejectModalVisible(false); // Close the modal without submission
  };

  const handleReject = (data) => {
    setIsRejectModalVisible(false); // Close the modal after submission
  };

  const onViewClick = () => {
    navigate(`/listing/${propertyId}`); // Navigate to the ListingDetail page with the property ID
  };

  const isPropertyApproved = property?.adminStatus === "APR";
  const isPropertyRejected = property?.adminStatus === "REJ";

  return (
    <MoreActionWrapperStyled>
      <MoreActionItemStyled onClick={onViewClick}>View</MoreActionItemStyled>

      {!isPropertyApproved && !isPropertyRejected && (
        <MoreActionItemStyled onClick={onApproveClick}>
          Approve
        </MoreActionItemStyled>
      )}

      {!isPropertyRejected && !isPropertyApproved && (
        <MoreActionItemStyled onClick={onRejectClick}>
          Reject
        </MoreActionItemStyled>
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
    </MoreActionWrapperStyled>
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

  const tagLabel = {
    APR: "Approved",
    PEN: "Pending",
    REJ: "Rejected",
  };

  const tagColor = {
    APR: "green",
    PEN: "orange",
    REJ: "red",
  };

  const tagIcon = {
    APR: <CheckCircleOutlined />,
    PEN: <ClockCircleOutlined />,
    REJ: <CloseCircleOutlined />,
  };

  const statusTag = tagLabel[listing?.adminStatus];
  const statusTagIcon = tagIcon[listing?.adminStatus];
  const tagClr = tagColor[listing?.adminStatus];

  const content = <MoreActions propertyId={listing?._id} property={listing} />;

  return (
    <ReviewPropertyCardWrapperStyled>
      <MenuWrapperStyled>
        <PropertyStatusTagStyled>
          <div className="icon">{statusTagIcon}</div>
          <TagStyled color={tagClr}> {statusTag}</TagStyled>
        </PropertyStatusTagStyled>
        <MoreButtonWrapperStyled>
          <Popover placement="bottomRight" title="" content={content}>
            <BorderedButtonStyled>More</BorderedButtonStyled>
          </Popover>
        </MoreButtonWrapperStyled>
      </MenuWrapperStyled>

      <PropertyCardWrapperStyled onClick={propsOnClick}>
        <SectionsWrapperStyled>
          <SectionStyled>
            <TitleStyled>Property Summary</TitleStyled>

            <RowWrapperStyled>
              <RowStyled>
                <div className="key">Title</div>
                <div className="value">{title}</div>
              </RowStyled>

              <RowStyled>
                <div className="key">Type</div>
                <div className="value">{propertyTypeText}</div>
              </RowStyled>

              <RowStyled>
                <div className="key">Adress</div>
                <div className="value">{adress}</div>
              </RowStyled>

              <RowStyled>
                <div className="key">City</div>
                <div className="value">{city}</div>
              </RowStyled>

              <RowStyled>
                <div className="key">Area</div>
                <div className="value">
                  {areaSizeUnit + " " + propertyAreaText}
                </div>
              </RowStyled>

              <RowStyled>
                <div className="key">Bedroom Count</div>
                <div className="value">{bedrooms}</div>
              </RowStyled>

              <RowStyled>
                <div className="key">Bathroom Count</div>
                <div className="value">{bathrooms}</div>
              </RowStyled>

              <RowStyled>
                <div className="key">Garage Count</div>
                <div className="value">{garages}</div>
              </RowStyled>
            </RowWrapperStyled>
          </SectionStyled>
        </SectionsWrapperStyled>

        <SectionsWrapperStyled>
          <SectionStyled>
            <TitleStyled>Description</TitleStyled>

            <RowWrapperStyled>
              <RowStyled>
                <div className="key">Description</div>
                <div className="value" title={desc}>
                  {desc}
                </div>
              </RowStyled>

              <RowStyled>
                <div className="key">Year Built</div>
                <div className="value">{yearBuilt}</div>
              </RowStyled>

              <RowStyled>
                <div className="key">Rent Price</div>
                <div className="value">{rent}</div>
              </RowStyled>

              <RowStyled>
                <div className="key">Is Discount Enabled</div>
                <div className="value">{isDiscountEnabled ? "✅" : "❌"}</div>
              </RowStyled>

              {isDiscountEnabled && (
                <RowStyled>
                  <div className="key">Discount Percentage</div>
                  <div className="value">{listing?.discountPercentage}</div>
                </RowStyled>
              )}
            </RowWrapperStyled>
          </SectionStyled>
        </SectionsWrapperStyled>
      </PropertyCardWrapperStyled>

      <PropertyCardWrapperStyled>
        <SectionsWrapperStyled>
          <SectionStyled>
            <TitleStyled>Features</TitleStyled>

            <RowWrapperStyled>
              <RowWrapperStyled>
                {features?.map((amenity) => {
                  return (
                    <RowStyled key={amenity?.key}>
                      <div className="key">{amenity?.label}</div>
                      <div className="value">
                        {amenity?.count ? amenity?.count : "✅"}
                      </div>
                    </RowStyled>
                  );
                })}
              </RowWrapperStyled>
            </RowWrapperStyled>
          </SectionStyled>
        </SectionsWrapperStyled>

        <SectionsWrapperStyled>
          <SectionStyled>
            <TitleStyled>Owner Info</TitleStyled>

            <RowWrapperStyled>
              <RowStyled>
                <div className="key">Name</div>
                <div className="value">{ownerName}</div>
              </RowStyled>

              <RowStyled>
                <div className="key">Email</div>
                <div className="value">{ownerEmail}</div>
              </RowStyled>

              <RowStyled>
                <div className="key">Phone</div>
                <div className="value">{ownerPhone}</div>
              </RowStyled>
            </RowWrapperStyled>
          </SectionStyled>
        </SectionsWrapperStyled>
      </PropertyCardWrapperStyled>
      <PropertyCardWrapperStyled>
        <SectionsWrapperStyled>
          <SectionStyled>
            <TitleStyled>Images</TitleStyled>

            <ImgWrapperStyled>
              {fileNames?.map((path, index) => (
                // <ImgWrapperStyled
                //   key={`${path}-${index}`}
                //   className="small-image"
                // >
                <ImgStyled
                  src={`${API_URL}/uploads/${path}`}
                  alt={`Property ${index}`}
                  key={`${path}-${index}`}
                />
                // </ImgWrapperStyled>
              ))}
            </ImgWrapperStyled>
          </SectionStyled>
        </SectionsWrapperStyled>
      </PropertyCardWrapperStyled>
    </ReviewPropertyCardWrapperStyled>
  );
};

export default ReviewPropertyCard;
