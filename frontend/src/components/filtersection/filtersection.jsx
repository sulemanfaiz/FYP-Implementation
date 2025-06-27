import Property from "../property";
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
    // console.log(currentSlide);
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

  const isDataExists = properties?.length > 0;

  return (
    <FilterSectionStyled>
      <FilterSectionContentStyled>
        <div className="filter-by">{filterBy}</div>
        <div className="comapre">Compare</div>

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
                    return <Property card={card} />;
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
        </Carousel>
      </CarasolWrapperStyled>
    </FilterSectionStyled>
  );
};

export default FilterSection;
