import React from "react";
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
import { FiLogIn } from "react-icons/fi";
import {
  NavbarContainer,
  Logo,
  NavLinks,
  NavItem,
  SignInButton,
  LeftSectionContainer,
} from "./landingpage.styles";

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
const LandingPage = () => {
  return (
    <div>
      <NavbarContainer role="navigation" aria-label="Main navigation">
        <LeftSectionContainer>
          <Logo tabIndex="0">Kiraye Pa</Logo>
          <NavLinks>
            <NavItem tabIndex="0">List It Now</NavItem>
            <NavItem tabIndex="0">About Us</NavItem>
            <NavItem tabIndex="0">SmartRent AI</NavItem>
          </NavLinks>
        </LeftSectionContainer>

        <SignInButton aria-label="Sign In" className="SignInButton">
          Sign In
        </SignInButton>
      </NavbarContainer>
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

      <FilterSection>
        <div className="filter-by">Filter By City</div>
      </FilterSection>

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
