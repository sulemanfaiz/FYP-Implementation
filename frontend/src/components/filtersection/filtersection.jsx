import ToggleSelect from "../toggleselect";
import { FilterSectionStyled } from "./filtersection.styles";

const FilterSection = (props) => {
  const { selectedFilter, onOptionChange, options, propeties } = props || {};

  return (
    <FilterSectionStyled>
      <div className="filter-by">Filter By City</div>
      <ToggleSelect
        options={options}
        propsOnClick={(value) => onOptionChange("propertyType", value)}
        selectedValue={selectedFilter}
      />
      {propeties?.map((property, index) => {
        const { label = "", value = "" } = property || {};

        return (
          <ToggleSelect
            key={`${value}-${label}`}
            options={options}
            propsOnClick={(value) => onOptionChange("propertyType", value)}
            selectedValue={selectedFilter}
          />
        );
      })}
    </FilterSectionStyled>
  );
};

export default FilterSection;
