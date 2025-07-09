import React, { useEffect, useState } from "react";
import PropertyCard from "../../components/propertycard/propertycard";
import {
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
  FaFacebook,
  FaHeart,
} from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

import {
  BackgroundSection,
  Overlay,
  Content,
  Tagline,
  SearchContainer,
  SearchInput,
  SearchButton,
} from "./landingpage.styles";
import { FiSearch } from "react-icons/fi";
import FilterSection from "../../components/filtersection";
import {
  areaSizeOptions,
  cityOptions,
  propertyOptions,
} from "../addlisting/addlisting.config";
import { useNavigate } from "react-router-dom";
import { Button, Popover } from "antd";
import { Footer, Header, ProfileMenu } from "../../components";

const cities = cityOptions;
const propertySizes = areaSizeOptions;
const propertyTypes = propertyOptions;

const citiesList = [{ value: "all", label: "All" }, ...cities];
const areaSizesList = [{ value: "all", label: "All" }, ...propertySizes];
const areaTypeList = [{ value: "all", label: "All" }, ...propertyOptions];

const LandingPage = () => {
  const navigate = useNavigate();

  const [filterByCity, setFilterByCity] = React.useState("all");
  const [filterBySize, setFilterBySize] = React.useState("all");
  const [filterByType, setFilterByType] = React.useState("all");

  const [searchText, setSearchText] = React.useState("");

  const [filteredListingsByCity, setFilteredListingsByCity] = useState([]);
  const [filteredListingsBySize, setFilteredListingsBySize] = useState([]);
  const [filteredListingsByType, setFilteredListingsByType] = useState([]);

  const onCityFilterChange = (value) => {
    const isAll = value === "all";
    const filtered = isAll
      ? listings
      : listings?.filter((listing) => listing.city === value);
    setFilteredListingsByCity(filtered);
    setFilterByCity(value);
  };

  const onSizeFilterChange = (value) => {
    const isAll = value === "all";
    const filtered = isAll
      ? listings
      : listings?.filter((listing) => listing.areaSizeMetric === value);
    setFilteredListingsBySize(filtered);
    setFilterBySize(value);
  };

  const onTypeFilterChange = (value) => {
    const isAll = value === "all";
    const filtered = isAll
      ? listings
      : listings?.filter((listing) => listing.propertyType === value);
    setFilteredListingsByType(filtered);
    setFilterByType(value);
  };

  const token = localStorage.getItem("token");

  const [listings, setListings] = useState([]);
  const getAllListings = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/listing/get-all-listings",
        {
          method: "GET",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        const listings = result.listings || [];
        setListings(listings);
        setFilteredListingsByCity(listings);
        setFilteredListingsBySize(listings);
        setFilteredListingsByType(listings);
      } else if (error) {
        const details = error?.details[0].message;
      }
    } catch (err) {
      console.log("catch error", err);
    }
  };

  useEffect(() => {
    getAllListings();
  }, []);

  const isLoggedIn = !!token;

  const content = <ProfileMenu />;

  const onSearchQueryChange = (value) => {
    setSearchText(value);
  };

  // Featured Properties Section
  const featuredListings = listings.filter((l) => l.isPremium);

  return (
    <div>
      <Header />

      <BackgroundSection className="BackgroundSection">
        <Overlay />
        <Content>
          <Tagline>Find Your Perfect Rental Home</Tagline>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Search by city, area..."
              onChange={(e) => onSearchQueryChange(e?.target?.value)}
            />
            <SearchButton
              aria-label="Search"
              onClick={() => navigate(`/search/${searchText}`)}
            >
              <FiSearch />
            </SearchButton>
          </SearchContainer>
        </Content>
      </BackgroundSection>
      {featuredListings.length > 0 && (
        <div
          style={{
            padding: "48px 0",
            background: "#fff",
            borderBottom: "1px solid #eee",
          }}
        >
          <div
            style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}
          >
            <h2
              style={{
                margin: "0 auto 24px auto",
                color: "#e50914",
                fontWeight: "bold",
                fontSize: "2.2rem",
                textAlign: "center",
                paddingBottom: "12px",
                borderBottom: "2px solid #e50914",
                display: "table",
                letterSpacing: "1px",
              }}
            >
              🔥 Featured Properties
            </h2>

            {/* Scroll Buttons */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => {
                  document
                    .getElementById("featured-scroll")
                    .scrollBy({ left: -350, behavior: "smooth" });
                }}
                style={{
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 2,
                  background: "#e50914",
                  border: "none",
                  color: "#fff",
                  padding: "8px 12px",
                  cursor: "pointer",
                  borderRadius: "50%",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                }}
              >
                ‹
              </button>

              <button
                onClick={() => {
                  document
                    .getElementById("featured-scroll")
                    .scrollBy({ left: 350, behavior: "smooth" });
                }}
                style={{
                  position: "absolute",
                  right: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 2,
                  background: "#e50914",
                  border: "none",
                  color: "#fff",
                  padding: "8px 12px",
                  cursor: "pointer",
                  borderRadius: "50%",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                }}
              >
                ›
              </button>

              {/* Carousel Container */}
              <div
                id="featured-scroll"
                style={{
                  display: "flex",
                  overflowX: "auto",
                  scrollBehavior: "smooth",
                  gap: "24px",
                  padding: "24px 8px",
                }}
              >
                {/* Scrollbar styling */}
                <style>{`
            #featured-scroll::-webkit-scrollbar {
              height: 8px;
            }
            #featured-scroll::-webkit-scrollbar-track {
              background: #f1f1f1;
            }
            #featured-scroll::-webkit-scrollbar-thumb {
              background: #e50914;
              border-radius: 4px;
            }
            #featured-scroll::-webkit-scrollbar-thumb:hover {
              background: #b10610;
            }
          `}</style>

                {featuredListings.map((listing) => (
                  <div
                    key={listing._id}
                    style={{
                      minWidth: 340,
                      maxWidth: 340,
                      flexShrink: 0,
                      border: "1px solid #eee",
                      borderRadius: "10px",
                      overflow: "hidden",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.03)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <PropertyCard listing={listing} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <FilterSection
        filterBy="Recent properties for rent by city"
        options={citiesList}
        onOptionChange={onCityFilterChange}
        selectedFilter={filterByCity}
        properties={filteredListingsByCity}
      />

      <FilterSection
        filterBy="Recent properties for rent by property size"
        options={areaSizesList}
        onOptionChange={onSizeFilterChange}
        selectedFilter={filterBySize}
        properties={filteredListingsBySize}
      />

      <FilterSection
        filterBy="Recent properties for rent by property type"
        options={areaTypeList}
        onOptionChange={onTypeFilterChange}
        selectedFilter={filterByType}
        properties={filteredListingsByType}
      />

      <Footer />
    </div>
  );
};

export default LandingPage;
