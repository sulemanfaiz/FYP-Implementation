import React, { useEffect, useState } from "react";
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
