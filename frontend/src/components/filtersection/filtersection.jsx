import {
  areaSizeOptions,
  propertyOptions,
} from "../../pages/addlisting/addlisting.config";
import {
  ArrowIcon,
  ImageWrapper,
  InfoSectionStyled,
} from "../../pages/landingpage/landingpage.styles";
import ToggleSelect from "../toggleselect";
import {
  AreaButton,
  AreaImage,
  AreaInfo,
  AreaTitle,
  CarasolWrapperStyled,
  CardContainer,
  FilterSectionContentStyled,
  FilterSectionStyled,
  NoDataCardContainerStyled,
  RentCount,
  RentIcon,
  StatItem,
  StatsRow,
  StyledCarouselContentGroupWrapper,
} from "./filtersection.styles";
import { Carousel, Divider } from "antd";

const FilterSection = (props) => {
  const {
    selectedFilter,
    onOptionChange,
    options,
    properties,
    filterBy = "",
  } = props || {};

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  const groupCardsIntoRows = (cardsList) => {
    return cardsList?.reduce((acc, card, index) => {
      if (index % 4 === 0) {
        acc.push([card]);
      } else {
        acc[acc?.length - 1]?.push(card);
      }
      return acc;
    }, []);
  };

  const groupedCarsolCards = groupCardsIntoRows(properties);

  console.log("properties", properties?.length);

  const isDataExists = properties?.length > 0;

  return (
    <FilterSectionStyled>
      <FilterSectionContentStyled>
        <div className="filter-by">{filterBy}</div>

        <ToggleSelect
          options={options}
          propsOnClick={(value) => onOptionChange?.(value)}
          selectedValue={selectedFilter}
        />
      </FilterSectionContentStyled>

      <CarasolWrapperStyled>
        <Carousel afterChange={onChange} dots={false} arrows>
          {isDataExists ? (
            groupedCarsolCards?.map((group, index) => {
              return (
                <StyledCarouselContentGroupWrapper
                  key={index}
                  isDataExists={isDataExists}
                >
                  {group?.map((card) => {
                    const {
                      rent,
                      title,
                      desc,
                      bedrooms,
                      bathrooms,
                      propertyType,
                      areaSizeUnit,
                      areaSizeMetric,
                      fileNames,
                      city,
                    } = card || {};

                    const propertyTypeText =
                      propertyOptions?.find(
                        (property) => property.value === propertyType
                      )?.label || "";

                    const propertyAreaText =
                      areaSizeOptions?.find(
                        (property) => property.value === areaSizeMetric
                      )?.label || "";

                    const imgExists = fileNames?.length > 0;
                    const path = fileNames?.[0];
                    return (
                      <CardContainer>
                        <ImageWrapper className="ImageWrapper">
                          {imgExists ? (
                            <AreaImage
                              src={`${API_URL}/uploads/${path}`}
                              alt="property-image"
                            />
                          ) : (
                            <AreaImage
                              src="/property/adminpropertyimg.jpg"
                              alt="Banner"
                            />
                          )}
                        </ImageWrapper>

                        <InfoSectionStyled>
                          <div className="price">PKR {rent}</div>
                          <div className="type">
                            {propertyTypeText} in {city}
                          </div>
                          <div className="amenties-section">
                            <div className="amenity">
                              <div className="icon">
                                <img src="/property/bed.svg" alt="Banner" />
                              </div>
                              <div className="count">{bedrooms}</div>
                            </div>

                            <div className="amenity">
                              <div className="icon">
                                <img src="/property/bath.svg" alt="Banner" />
                              </div>
                              <div className="count">{bathrooms}</div>
                            </div>

                            <div className="amenity">
                              <div className="icon">
                                <img src="/property/area.svg" alt="Banner" />
                              </div>
                              <div className="count">{`${areaSizeUnit} ${propertyAreaText}`}</div>
                            </div>
                          </div>

                          <div className="title">{title}</div>
                          <div className="desc">{desc}</div>
                        </InfoSectionStyled>
                      </CardContainer>
                    );
                  })}
                </StyledCarouselContentGroupWrapper>
              );
            })
          ) : (
            <NoDataCardContainerStyled>
              <div className="no-data">
                No data found against selected filter
              </div>
            </NoDataCardContainerStyled>
          )}

          {/* {groupedCarsolCards?.map((property, index) => {
            const { label = "", value = "", fileNames } = property || {};

            const imgExists = fileNames?.length > 0;
            const path = fileNames?.[0];

            return (
              <div>I am here</div>
              // <CardContainer>
              //   <ImageWrapper className="ImageWrapper">
              //     {imgExists ? (
              //       <AreaImage
              //         className="property-image"
              //         src={`${API_URL}/uploads/${path}`}
              //         alt="property-image"
              //       />
              //     ) : (
              //       <AreaImage
              //         src="/property/adminpropertyimg.jpg"
              //         alt="Banner"
              //       />
              //     )}
              //   </ImageWrapper>

              //   <AreaInfo>
              //     <AreaTitle>Phase 8, Bahria Town, Sector F</AreaTitle>

              //     <StatsRow>
              //       <StatItem>
              //         <RentIcon>🏠</RentIcon>
              //         <RentCount>12</RentCount>
              //         <span>on rent</span>
              //       </StatItem>
              //     </StatsRow>

              //     <Divider />
              //     <AreaButton>
              //       VIEW AREA GUIDE <ArrowIcon>➤</ArrowIcon>
              //     </AreaButton>
              //   </AreaInfo>
              // </CardContainer>
            );
          })} */}
        </Carousel>
      </CarasolWrapperStyled>
    </FilterSectionStyled>
  );
};

export default FilterSection;
