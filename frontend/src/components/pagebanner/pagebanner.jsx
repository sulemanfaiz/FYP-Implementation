import { PageBannerStyled } from "./pagebanner.styles";

const PageBanner = (props) => {
  const { heading, description } = props;
  return (
    <PageBannerStyled>
      <div className="text">{heading}</div>
      <div className="desc">{description} </div>
    </PageBannerStyled>
  );
};

export default PageBanner;
