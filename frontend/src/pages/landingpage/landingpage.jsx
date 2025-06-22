import React, { useEffect, useState } from "react";
import {
  FooterContainer,
  FooterSection,
  FooterHeading,
  FooterLink,
  FooterContactItem,
  SocialIcons,
  SocialIcon,
  BottomBar,
  Copyright,
  MadeWithLove,
} from "./landingpage.styles";
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
import { Header, ProfileMenu } from "../../components";

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
        console.log("listings", listings);
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
              placeholder="Search by city, area, or property..."
            />
            <SearchButton aria-label="Search">
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

      <FooterContainer>
        <FooterSection>
          <FooterHeading>About Us</FooterHeading>
          <FooterLink href="/our-story">Our Story</FooterLink>
          <FooterLink href="/our-blog">Our Blog</FooterLink>
          <FooterLink href="/careers">Careers</FooterLink>
          <FooterLink href="/gurus">Gurus</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterHeading>Contact Us</FooterHeading>
          <FooterContactItem>
            <MdEmail size={16} />
            <span>info@graana.com</span>
          </FooterContactItem>
          <FooterContactItem>
            <MdPhone size={16} />
            <span>111-555-555</span>
          </FooterContactItem>
        </FooterSection>

        <FooterSection>
          <FooterHeading>Help & Support</FooterHeading>
          <FooterLink href="/help-center">Help Center</FooterLink>
          <FooterLink href="/faqs">FAQs</FooterLink>
          <FooterLink href="/support">Support</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterHeading>Terms of Use</FooterHeading>
          <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
          <FooterLink href="/terms-conditions">Terms & Conditions</FooterLink>
          <FooterLink href="/cookies">Cookies</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterHeading>Follow Us</FooterHeading>
          <SocialIcons>
            <SocialIcon
              href="https://instagram.com/graana"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </SocialIcon>
            <SocialIcon
              href="https://linkedin.com/company/graana"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </SocialIcon>
            <SocialIcon
              href="https://twitter.com/graana"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </SocialIcon>
            <SocialIcon
              href="https://youtube.com/graana"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </SocialIcon>
            <SocialIcon
              href="https://facebook.com/graana"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </SocialIcon>
          </SocialIcons>
        </FooterSection>

        <BottomBar>
          <Copyright>
            © {new Date().getFullYear()} Kiraya pe. All Rights Reserved.
          </Copyright>
          <MadeWithLove>
            Made with <FaHeart color="#E73A5D" /> by Us
          </MadeWithLove>
        </BottomBar>
      </FooterContainer>
    </div>
  );
};

export default LandingPage;
