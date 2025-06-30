import React, { useState, useEffect } from "react"; // ✅ This is crucial
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import dayjs from "dayjs";

import { useParams } from "react-router-dom"; // Import useParams to get the route parameter
import { Divider, Modal } from "antd";
import { IoBedOutline } from "react-icons/io5";
import { FaBath } from "react-icons/fa";
import { IoIosResize, IoIosCall } from "react-icons/io";
import { CiMail } from "react-icons/ci";
import { Carousel } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";
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
import { Footer, Header } from "../../components";
import {
  areaSizeOptions,
  propertyOptions,
} from "../addlisting/addlisting.config";
import { getFeatureIcon } from "./listingdetail.util";
import { formatNumberWithCommas } from "../../utils/numberformatter";
import { PageLoader } from "../../components/pageloader";

// ✅ Import the Socket component

const API_URL = process.env.REACT_APP_API_URL; // Replace with your actual API URL

// Optional: Custom icon to avoid default marker issues in React
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const ListingDetail = () => {
  const { id } = useParams();
  const [spinning, setSpinning] = useState(true);

  const [contactModalVisible, setContactModalVisible] = useState(false);

  const [property, setProperty] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cords, setCords] = useState();

  const getCoordinatesFromAddress = async (address, city) => {
    const fullAddress = `${address}, ${city}, Pakistan`;
    // const fullAddress = `Nust H 12, islamabad, Pakistan`;

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      fullAddress
    )}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      return { lat: parseFloat(lat), lng: parseFloat(lon) };
    } else {
      console.log("No coordinates found for this address");
    }
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(
          `${API_URL}/listing/get-listing-detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        const property = result.data;

        console.log("Fetched Property Data:", property); // Log the parsed data
        setProperty(property); // Set only the `data` key to the `property` state

        getCoordinatesFromAddress(property?.adress, property?.city).then(
          (coords) => {
            console.log("coords", coords);

            setCords({
              lat: coords?.lat,
              lng: coords?.lng,
            });
          }
        );
      } catch (error) {
        console.error("Error fetching property details:", error); // Log the error
      } finally {
        setSpinning(false);
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

  const propertyTypeText =
    propertyOptions?.find((prop) => prop.value === property?.propertyType)
      ?.label || "";

  const propertyAreaText =
    areaSizeOptions?.find((prop) => prop.value === property?.areaSizeMetric)
      ?.label || "";

  const calculateDiscountedPrice = (originalPrice, discountPercent) => {
    const discountAmount = (originalPrice * discountPercent) / 100;
    return originalPrice - discountAmount;
  };

  const isDiscountEnabled = property?.isDiscountEnabled;

  const todayStr = new Date().toLocaleDateString("en-CA");

  const isDiscountActive =
    todayStr >= property?.discountStartDate &&
    todayStr <= property?.discountEndDate;

  const discountLblText = property?.discountLabel || "Discount";

  const latitude = cords?.lat;
  const longitude = cords?.lng;

  const handleWhatsApp = () => {
    const phoneNumber = property?.ownerPhone || "";
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  const discountedPrice = calculateDiscountedPrice(
    property?.rent,
    property?.discountPercentage
  );

  const isPropertyImgExists = property?.fileNames?.length > 0;

  const showDiscount = isDiscountEnabled && isDiscountActive;

  return (
    <ListingStyled>
      <Header />
      <PageLoader spinning={spinning} />

      <ListingWrapperStyled>
        <ImageSectionWrapperStyled className="ImageSectionWrapperStyled">
          {isPropertyImgExists && !spinning ? (
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
                    key={`${path}-${index}`}
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
          ) : (
            <div className="dea-image-wrapper">
              <img src="/property/adminpropertyimg.jpg" alt="Default Image" />
            </div>
          )}
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
                <div key={`${path}-${index}`}>
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
            {showDiscount && (
              <DiscountLabelStyled>
                🏷️
                {discountLblText} - {property?.discountPercentage}% Off
              </DiscountLabelStyled>
            )}

            <div className="name-price-wrapper">
              <div className="property-name">{property?.title}</div>

              <ButtonStyled>
                <button className="call-button" onClick={handleWhatsApp}>
                  <WhatsAppOutlined /> WhatsApp
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
                <RentStyled isDiscounted={showDiscount}>
                  PKR {formatNumberWithCommas(property?.rent)}/Month
                </RentStyled>
              </div>
            </div>
          </DetailCardStyled>

          <Divider />

          {showDiscount && (
            <>
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
                    PKR {formatNumberWithCommas(discountedPrice)}
                    /Month
                  </RentStyled>
                </div>
              </TitleSectionStyled>

              <Divider />
            </>
          )}

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
              {property?.features?.map((feature, index) => {
                const isCntExists = feature?.count > 0;
                return (
                  <div key={`${feature}-${index}`} className="feature-item">
                    <div className={`icon ${feature?.key?.toLowerCase()}`}>
                      {getFeatureIcon(feature?.key)}
                    </div>
                    {feature?.label}
                    {isCntExists ? `: ${feature?.count}` : ""}
                  </div>
                );
              })}
            </div>
          </FetaureSectionStyled>

          <Divider />

          {!!latitude && !!longitude && (
            <TitleSectionStyled>
              <h2>Location</h2>
              <MapContainer
                center={[latitude, longitude]}
                zoom={15}
                scrollWheelZoom={true}
                style={{ height: "400px", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[latitude, longitude]} icon={customIcon}>
                  <Popup>This is your property location.</Popup>
                </Marker>
              </MapContainer>
            </TitleSectionStyled>
          )}
        </ListingDetailWrapperStyled>
      </ListingWrapperStyled>

      <Footer />
    </ListingStyled>
  );
};

export default ListingDetail;
