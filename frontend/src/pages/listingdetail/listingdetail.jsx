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
} from "./listingdetailstyles";

const API_URL = process.env.REACT_APP_API_URL; // Replace with your actual API URL
console.log("API URL:", API_URL);

const ListingDetail = () => {
  const { id } = useParams();
  console.log("Property ID:", id); // Get the property ID from the URL
  console.log("API Endpoint:", `${API_URL}/properties/${id}`);
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

  return (
    <ListingWrapperStyled>
      {/* Image Section */}
      {/* Image Section */}
      <ImageSectionStyled>
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
          <div className="name-price-wrapper">
            <div className="property-name">
              {console.log("Title:", property?.title)}
              {property?.title}
            </div>
            <div className="property-rent">
              <div className="rent">PKR {property?.rent}</div>

              <div className="month">/ month</div>
            </div>
          </div>

          <div className="icons-wrapper">
            <div className="icon-item">
              <IoBedOutline /> {property?.bedrooms} Bedrooms
            </div>
            <div className="icon-item">
              <FaBath /> {property?.bathrooms} Bathrooms
            </div>
            <div className="icon-item">
              <IoIosResize /> {property?.areaSizeUnit}
              {property?.areaSizeMetric}{" "}
            </div>
            <div className="icon-item">{property?.propertyType}</div>
          </div>
        </DetailCardStyled>

        <ButtonStyled>
          <button className="call-button">
            <IoIosCall /> Call
          </button>
          <button className="inquire-button">
            <CiMail /> Inquire
          </button>
        </ButtonStyled>

        {/* Divider */}
        <Divider />

        {/* Description */}
        <TitleSectionStyled>
          <h2>Description</h2>
          <div className="property-description">
            {property?.desc || "No description available for this property."}
          </div>
        </TitleSectionStyled>
      </ListingDetailWrapperStyled>
    </ListingWrapperStyled>
  );
};

export default ListingDetail;
