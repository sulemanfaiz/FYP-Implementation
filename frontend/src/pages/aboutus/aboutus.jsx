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
            <div className="date">2015</div>
            <div className="heading">The Vision</div>
            <div className="desc">
              The Graana story began with the vision of one man. It was Shafiq
              Akbar’s dream to transform the real estate sector of Pakistan and
              elevate it to bring it at par with the best international
              standards. Having spent 15 years in the UK working in the real
              estate sector, among other achievements Akbar holds to his credit
              multiple real estate mega projects completed internationally as
              well as in Pakistan. Akbar moved back to Pakistan in order to give
              shape to his vision. Thus Graana was created – the next-generation
              real estate solutions platform for Pakistan. At Graana, we aim to
              provide users with constantly evolving services based on
              transparency and professionalism that are always a notch above the
              rest.
            </div>
          </SectionStyled>

          <SectionStyled>
            <div className="date">2016</div>
            <div className="heading">The Umbrella</div>
            <div className="desc">
              The quest to transform Pakistan’s estimated 1.2 trillion USD real
              estate sector is certainly an ambitious one, but Graana doesn’t
              shy away from challenges. Among the very first people taken aboard
              by Akbar were Farhan Javed, who joined as Creative Director, and
              Arslan Javed who joined as Head of Product Development.
            </div>
          </SectionStyled>

          <SectionStyled>
            <div className="date">2018</div>
            <div className="heading">The Launch</div>
            <div className="desc">
              And so it was 3…2…1…takeoff! Welcome to Graana.com: a complete
              user experience for those seeking to buy, sell, rent or look into
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
