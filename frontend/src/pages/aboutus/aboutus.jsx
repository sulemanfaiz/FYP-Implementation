import {
  AboutUsPageSectionWrapperStyled,
  AboutUsPageStyled,
  AboutUsPageWrapperStyled,
  SectionStyled,
} from "./aboutus.styles";
import { Header, Footer } from "../../components";
import PageBanner from "../../components/pagebanner";

const AboutUs = () => {
  return (
    <AboutUsPageStyled>
      <Header />
      <AboutUsPageWrapperStyled>
        <PageBanner heading="About Us" description="Our story" />

        <AboutUsPageSectionWrapperStyled>
          <SectionStyled>
            <div className="date">2024</div>
            <div className="heading">The Vision</div>
            <div className="desc">
              The Rent A Space story began with the vision of our team. It was
              Our dream to transform the real estate sector of Pakistan and
              elevate it to bring it at par with the best international
              standards. Thus Rent A Space was created – the next-generation
              real estate solutions platform for Pakistan. At RentASpace, we aim
              to provide users with constantly evolving services based on
              transparency and professionalism that are always a notch above the
              rest.
            </div>
          </SectionStyled>

          <SectionStyled>
            <div className="date">2016</div>
            <div className="heading">The Umbrella</div>
            <div className="desc">
              The quest to transform Pakistan’s estimated 1.2 trillion USD real
              estate sector is certainly an ambitious one, but Rent A Space
              doesn’t shy away from challenges. 
            </div>
          </SectionStyled>

          <SectionStyled>
            <div className="date">2025</div>
            <div className="heading">The Launch</div>
            <div className="desc">
              And so it was 3…2…1…takeoff! Welcome to RentASpace.com: a complete
              user experience for those seeking to  sell, rent or look into
              property development, in just a few clicks. We carefully curate
              and analyse the latest offers and facilitate smooth transactions
              so that you never have to deal with real estate woes again. Now
              that you know our story, are you ready to start your search?
            </div>
          </SectionStyled>
        </AboutUsPageSectionWrapperStyled>
      </AboutUsPageWrapperStyled>
      <Footer />
    </AboutUsPageStyled>
  );
};
export default AboutUs;
