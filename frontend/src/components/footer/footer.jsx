import {
  BottomBar,
  Copyright,
  FooterContactItem,
  FooterContainer,
  FooterHeading,
  FooterLink,
  FooterSection,
  MadeWithLove,
  SocialIcon,
  SocialIcons,
} from "./footer.styles";

import { MdEmail, MdPhone } from "react-icons/md";

import {
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
  FaFacebook,
  FaHeart,
} from "react-icons/fa";

const Footer = () => {
  return (
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
          <span>info@RentASpace.com</span>
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
          © {new Date().getFullYear()} Rent A Space. All Rights Reserved.
        </Copyright>
        <MadeWithLove>
          Made with <FaHeart color="#E73A5D" /> by Us
        </MadeWithLove>
      </BottomBar>
    </FooterContainer>
  );
};

export default Footer;
