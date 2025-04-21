import { ToggleSelectWrapperStyled } from "./toggleselect.styles";

const ToggleSelect = (props) => {
  const { options, propsOnClick, selectedValue = "" } = props || {};

  return (
    <ToggleSelectWrapperStyled>
      {options?.map((option, index) => {
        const { label = "", value = "" } = option || {};

        return (
          <div
            className={`option ${selectedValue === value ? "selected" : ""}`}
            key={`${value}-${label}`}
            onClick={() => propsOnClick(value)}
          >
            {label}
          </div>
        );
      })}
    </ToggleSelectWrapperStyled>
  );
};

export default ToggleSelect;
