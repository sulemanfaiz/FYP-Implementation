import { StyledTabsWrapperStyled } from "./styledtabs.styles";
import { Tabs } from "antd";

const StyledTabs = (props) => {
  const { items, onChange } = props || {};
  return (
    <StyledTabsWrapperStyled className="StyledTabsWrapperStyled">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </StyledTabsWrapperStyled>
  );
};

export default StyledTabs;
