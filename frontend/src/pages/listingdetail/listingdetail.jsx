import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get the route parameter
import { Divider, Modal } from "antd";
import { IoBedOutline } from "react-icons/io5";
import { FaBath } from "react-icons/fa";
import { IoIosResize, IoIosCall } from "react-icons/io";
import { CiMail } from "react-icons/ci";
import { Carousel } from "antd";
import {
  ListingWrapperStyled,
  ListingDetailWrapperStyled,
  DetailCardStyled,
  ButtonStyled,
  TitleSectionStyled,
  ImageSectionStyled,
  CustomCarouselStyled,
  ListingStyled,
  ImageSectionWrapperStyled,
  TypeOfPropertyStyled,
  FetaureSectionStyled,
  DiscountLabelStyled,
  RentStyled,
} from "./listingdetailstyles";
import { Header } from "../../components";
import {
  areaSizeOptions,
  propertyOptions,
} from "../addlisting/addlisting.config";
import { getFeatureIcon } from "./listingdetail.util";

const API_URL = process.env.REACT_APP_API_URL; // Replace with your actual API URL
console.log("API URL:", API_URL);

const ListingDetail = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        console.log("Fetching property with ID:", id); // Log the ID
        const response = await fetch(
          `${API_URL}/listing/get-listing-detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("API Response:", response); // Log the raw response
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log("Fetched Property Data:", result); // Log the parsed data
        setProperty(result.data); // Set only the `data` key to the `property` state
      } catch (error) {
        console.error("Error fetching property details:", error); // Log the error
      }
    };

    fetchProperty();
  }, [id]);

  const openSlider = (index) => {
    setCurrentSlide(index);
    setIsModalVisible(true);
  };

  const closeSlider = () => {
    setIsModalVisible(false);
  };

  if (!property) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }
  console.log("Rendering property data: ", property);

  const propertyTypeText =
    propertyOptions?.find((prop) => prop.value === property?.propertyType)
      ?.label || "";

  const propertyAreaText =
    areaSizeOptions?.find((prop) => prop.value === property?.areaSizeMetric)
      ?.label || "";

  console.log("property", property);

  const calculateDiscountedPrice = (originalPrice, discountPercent) => {
    const discountAmount = (originalPrice * discountPercent) / 100;
    return originalPrice - discountAmount;
  };

  return (
    <ListingStyled>
      <Header />

      <ListingWrapperStyled>
        <ImageSectionWrapperStyled className="ImageSectionWrapperStyled">
          <ImageSectionStyled className="ImageSectionStyled">
            {/* Main Image */}
            <div className="main-image-wrapper" onClick={() => openSlider(0)}>
              <img
                src={`${API_URL}/uploads/${property?.fileNames?.[0]}`}
                alt="Main Property"
              />
            </div>

            {/* Smaller Images */}
            <div className="small-images-wrapper">
              {property?.fileNames?.slice(1, 3).map((path, index) => (
                <div
                  key={index}
                  className="small-image"
                  onClick={() => openSlider(index + 1)}
                >
                  <img
                    src={`${API_URL}/uploads/${path}`}
                    alt={`Property ${index}`}
                  />
                </div>
              ))}
            </div>
          </ImageSectionStyled>
        </ImageSectionWrapperStyled>

        {/* Modal for Image Slider */}
        <Modal
          visible={isModalVisible}
          footer={null}
          onCancel={closeSlider}
          centered
          width={800}
        >
          <CustomCarouselStyled>
            <Carousel initialSlide={currentSlide} dots arrows>
              {property?.fileNames?.map((path, index) => (
                <div key={index}>
                  <img
                    src={`${API_URL}/uploads/${path}`}
                    alt={`Property Image ${index}`}
                  />
                </div>
              ))}
            </Carousel>
          </CustomCarouselStyled>
        </Modal>
        {/* Property Details Section */}
        <ListingDetailWrapperStyled>
          <DetailCardStyled>
            <DiscountLabelStyled>
              🏷️
              {property?.discountLabel} - {property?.discountPercentage}% Off
            </DiscountLabelStyled>

            <div className="name-price-wrapper">
              <div className="property-name">{property?.title}</div>

              <ButtonStyled>
                <button className="call-button">
                  <IoIosCall /> Call
                </button>
                <button className="inquire-button">
                  <CiMail /> Inquire
                </button>
              </ButtonStyled>
            </div>

            <div className="icons-wrapper">
              <div className="icon-item">
                <IoBedOutline /> {property?.bedrooms} Bedrooms
              </div>
              <div className="icon-item">
                <FaBath /> {property?.bathrooms} Bathrooms
              </div>
              <div className="icon-item">
                <IoIosResize /> {property?.areaSizeUnit} {propertyAreaText}
              </div>
              <div className="icon-item">
                <TypeOfPropertyStyled />
                {propertyTypeText}
              </div>
            </div>

            <div className="icons-wrapper">
              <div className="icon-item">
                <RentStyled
                  isDiscounted={property?.isDiscountEnabled === "true"}
                >
                  PKR {property?.rent}/Month
                </RentStyled>
              </div>
            </div>
          </DetailCardStyled>

          <Divider />

          <TitleSectionStyled>
            <h2> Discount Details</h2>
            <div className="property-description">
              💸 {property?.discountPercentage}% Off
            </div>

            <div className="property-description">
              Validity:{"   "} {property?.discountStartDate} to{" "}
              {property?.discountEndDate}
              <br />
              Discounted Price: {"   "}
              <RentStyled>
                PKR{" "}
                {calculateDiscountedPrice(
                  property?.rent,
                  property?.discountPercentage
                )}
                /Month
              </RentStyled>
            </div>
          </TitleSectionStyled>

          <Divider />

          {/* <ButtonStyled>
            <button className="call-button">
              <IoIosCall /> Call
            </button>
            <button className="inquire-button">
              <CiMail /> Inquire
            </button>
          </ButtonStyled> */}

          {/* Description */}
          <TitleSectionStyled>
            <h2>Description</h2>
            <div className="property-description">
              {property?.desc || "No description available for this property."}
            </div>
          </TitleSectionStyled>
          <Divider />
          <FetaureSectionStyled>
            <h2>Features</h2>
            <div className="property-features">
              {property?.features?.map((feature, index) => (
                <div key={index} className="feature-item">
                  <div className={`icon ${feature?.key?.toLowerCase()}`}>
                    {getFeatureIcon(feature?.key)}
                  </div>
                  {feature?.label}: {feature?.count}
                </div>
              ))}
            </div>
          </FetaureSectionStyled>
        </ListingDetailWrapperStyled>
      </ListingWrapperStyled>
    </ListingStyled>
  );
};

export default ListingDetail;
