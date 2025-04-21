import { useParams } from "react-router-dom";
import {
  AddressCardStyled,
  CarasolWrapperStyled,
  DetailCardStyled,
  DetailsCardStyled,
  ListingDetailWrapperStyled,
  ListingWrapperStyled,
  OverviewCardStyled,
} from "./listingdetailstyles";
import { useEffect, useState } from "react";

import { Carousel } from "antd";

const contentStyle = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const ListingDetail = () => {
  const params = useParams();
  const propertyId = params.id;

  const [property, setProperty] = useState({});
  const token = localStorage.getItem("token");

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

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

  return (
    <ListingWrapperStyled>
      <div className="listing-title">{property?.title}</div>
      <CarasolWrapperStyled>
        <Carousel afterChange={onChange} dots={false} arrows>
          {property?.fileNames?.map((path, index) => {
            return (
              <div>
                <img
                  className="property-image"
                  src={`${API_URL}/uploads/${path}`}
                  alt={`property-image-${index}`}
                />
              </div>
            );
          })}
        </Carousel>
      </CarasolWrapperStyled>

      <ListingDetailWrapperStyled className="ListingDetailWrapperStyled">
        <DetailCardStyled>
          <div className="name-price-wrapper">
            <div className="property-name">{property?.title}</div>
            <div className="property-rent">
              <div className="rent">PKR {property?.rent}</div>
              <div className="month">/ month</div>
            </div>
          </div>

          <div className="decription">
            <div className="heading">Description</div>
            <div className="text">{property?.desc}</div>
          </div>
        </DetailCardStyled>
        <DetailsCardStyled>
          <div className="heading">Overview</div>

          <div className="overview-row">
            <div className="row-item">
              <div>House No.</div>
              <div>{property?.houseNo}</div>
            </div>
            <div className="row-item">
              <div>Type</div>
              <div>{property?.propertyType}</div>
            </div>
            <div className="row-item">
              <div>Bedroom</div>
              <div>{property?.bedrooms}</div>
            </div>
            <div className="row-item">
              <div>Bathroom</div>
              <div>{property?.bathrooms}</div>
            </div>
          </div>

          <div className="overview-row">
            <div className="row-item">
              <div>Size</div>
              <div>{`${property?.areaSizeUnit} ${property?.areaSizeMetric}`}</div>
            </div>

            <div className="row-item">
              <div>Garage</div>
              <div>{property?.garages}</div>
            </div>

            <div className="row-item">
              <div>Year Build</div>
              <div>{property?.yearBuilt}</div>
            </div>

            <div className="row-item">
              <div>Status.</div>
              <div>{property?.status}</div>
            </div>
          </div>
        </DetailsCardStyled>
        <AddressCardStyled>
          <div className="heading">Address</div>

          <div className="adress-row">
            <div className="key">City</div>
            <div className="value">{property?.city}</div>
          </div>

          <div className="adress-row">
            <div className="key">Adress</div>
            <div className="value">{property?.adress}</div>
          </div>

          <div className="adress-row">
            <div className="key">Country</div>
            <div className="value">Pakistan</div>
          </div>
        </AddressCardStyled>
      </ListingDetailWrapperStyled>
    </ListingWrapperStyled>
  );
};

export default ListingDetail;
