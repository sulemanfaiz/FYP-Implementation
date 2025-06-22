import { useParams } from "react-router-dom";
import { Footer, Header, Property } from "../../components";
import {
  PopOverContainerStyled,
  PopOverFooterStyled,
  PopOverInputWrapperStyled,
  PopOverValuesContainerStyled,
  SearchListingWrapperStyled,
  SearchOptionStyled,
  SearchOptionsWrapperStyled,
  SearchOptionWithActionWrapperStyled,
  SearchPageStyled,
  SearchPageWrapperStyled,
  SearchQueryStyled,
} from "./searchpage.styles";
import { useEffect, useState } from "react";
import { Button, Input, Popover, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import {
  areaSizeOptions,
  bathroomOptions,
  bedroomOptions,
  propertyOptions,
} from "../addlisting/addlisting.config";
import ToggleSelect from "../../components/toggleselect";

const SearchPage = () => {
  const { query } = useParams();
  const [listings, setListings] = useState([]);
  const [showPopover, setShowPopover] = useState({});
  const [detailedSearch, setDetailedSearch] = useState({
    residential: { value: "" },
  });

  const [transientFilters, setTransientFilters] = useState({
    sizeMetric: { value: "marla" },
  });

  console.log({ query });

  const token = localStorage.getItem("token");

  const getListingBasedOnSearchQuery = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/listing/search?q=${query}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Important
          },
        }
      );
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        const listings = result.listings || [];
        console.log("listings", listings);
        setListings(listings);
      } else if (error) {
        const details = error?.details[0].message;
      }
    } catch (err) {
      console.log("catch error", err);
    }
  };

  useEffect(() => {
    getListingBasedOnSearchQuery();
  }, []);

  const residentialValue = detailedSearch?.residential?.value || "";
  const bedroomValue = detailedSearch?.bedroom?.value || "";
  const bathroomValue = detailedSearch?.bathroom?.value || "";
  const sizeMinValue = detailedSearch?.minSize?.value || "";
  const sizeMaxValue = detailedSearch?.maxSize?.value || "";
  const sizeMetricValue = detailedSearch?.sizeMetric?.value || "";

  const isSizeFilterSet = sizeMinValue || sizeMaxValue;

  const transientResVal = transientFilters?.residential?.value || "";
  const transientBedVal = transientFilters?.bedroom?.value || "";
  const transientBathVal = transientFilters?.bathroom?.value || "";

  const getListingBasedOnFilters = async (updatedFilters) => {
    const resVal = updatedFilters?.residential?.value || "";
    const bedVal = updatedFilters?.bedroom?.value || "";
    const bathVal = updatedFilters?.bathroom?.value || "";
    const sizeMinVal = updatedFilters?.minSize?.value || "";
    const sizeMaxVal = updatedFilters?.maxSize?.value || "";
    const sizeMetVal = updatedFilters?.sizeMetric?.value || "";

    try {
      const response = await fetch(
        `http://localhost:8080/listing/filtered-search?q=${query}&propertyType=${resVal}&bedroomCount=${bedVal}&bathroomCount=${bathVal}&plotSizeMin=${sizeMinVal}&plotSizeMax=${sizeMaxVal}&plotSizeUnit=${sizeMetVal}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Important
          },
        }
      );
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        const listings = result.listings || [];
        console.log("listings", listings);
        setListings(listings);
      } else if (error) {
        const details = error?.details[0].message;
      }
    } catch (err) {
      console.log("catch error", err);
    }
  };

  const onShowPopover = (id) => () => {
    setShowPopover((prev) => ({
      ...Object.keys(prev).reduce((acc, key) => {
        acc[key] = false; // hide all
        return acc;
      }, {}),
      [id]: true, // show only selected
    }));
  };

  const onHidePopover = () => {
    setShowPopover((prev) => ({
      ...Object.keys(prev).reduce((acc, key) => {
        acc[key] = false; // hide all
        return acc;
      }, {}),
    }));
  };

  const onApplyFilters = () => {
    onHidePopover();
    setDetailedSearch(transientFilters);
    getListingBasedOnFilters(transientFilters);
  };

  const onToggleValue = (key, value) => {
    setTransientFilters((prev) => {
      const currentValue = prev?.[key]?.value;

      if (currentValue === value) {
        const updated = { ...prev };
        delete updated?.[key];
        return updated;
      }

      return {
        ...prev,
        [key]: { value },
      };
    });
  };

  const onClearFilters = (key) => () => {
    setTransientFilters((prev) => {
      const updated = { ...prev };
      delete updated[key];

      setDetailedSearch(updated);
      getListingBasedOnFilters(updated);

      return updated;
    });
    onHidePopover();
  };

  const commonFooter = (key) => (
    <PopOverFooterStyled>
      <Button className="cancel" onClick={onHidePopover}>
        Cancel
      </Button>

      <Button className="clear" onClick={onClearFilters(key)}>
        Clear
      </Button>
      <Button className="apply" onClick={onApplyFilters}>
        Apply
      </Button>
    </PopOverFooterStyled>
  );

  const residentialPlotContent = (
    <PopOverContainerStyled>
      <PopOverValuesContainerStyled>
        <ToggleSelect
          options={propertyOptions}
          propsOnClick={(value) => onToggleValue("residential", value)}
          selectedValue={transientResVal}
        />
      </PopOverValuesContainerStyled>
      {commonFooter("residential")}
    </PopOverContainerStyled>
  );

  const bedroomContent = (
    <PopOverContainerStyled>
      <PopOverValuesContainerStyled>
        <ToggleSelect
          options={bedroomOptions}
          propsOnClick={(value) => onToggleValue("bedroom", value)}
          selectedValue={transientBedVal}
        />
      </PopOverValuesContainerStyled>
      {commonFooter("bedroom")}
    </PopOverContainerStyled>
  );

  const bathRoomContent = (
    <PopOverContainerStyled>
      <PopOverValuesContainerStyled>
        <ToggleSelect
          options={bathroomOptions}
          propsOnClick={(value) => onToggleValue("bathroom", value)}
          selectedValue={transientBathVal}
        />
      </PopOverValuesContainerStyled>
      {commonFooter("bathroom")}
    </PopOverContainerStyled>
  );

  const sizeContent = (
    <PopOverContainerStyled>
      <PopOverInputWrapperStyled>
        <Input
          placeholder="0"
          onChange={(e) => {
            setTransientFilters({
              ...transientFilters,
              minSize: { value: e?.target?.value },
            });
          }}
        />
        To
        <div className="inputs-wrapper">
          <Input
            placeholder="Any"
            onChange={(e) => {
              setTransientFilters({
                ...transientFilters,
                maxSize: { value: e?.target?.value },
              });
            }}
          />
          <Select
            className="select-field"
            options={areaSizeOptions}
            placeholder="Choose Metric Unit"
            defaultValue={transientFilters?.sizeMetric?.value}
            onChange={(value) => {
              setTransientFilters({
                ...transientFilters,
                sizeMetric: { value },
              });
            }}
          />
        </div>
      </PopOverInputWrapperStyled>
      {commonFooter("size")}
    </PopOverContainerStyled>
  );

  const residentialTxt = propertyOptions?.find(
    (item) => item.value === residentialValue
  )?.label;

  const selectedResidentialValue = residentialValue ? residentialTxt : "All";
  const selectedBedroomValue = bedroomValue
    ? `${bedroomValue} Bedroom(s)`
    : "Bedroom";
  const selectedBathroomValue = bathroomValue
    ? `${bathroomValue} Bathroom(s)`
    : "Bathroom";

  return (
    <SearchPageStyled>
      <Header />
      <SearchPageWrapperStyled>
        <SearchOptionsWrapperStyled>
          <Popover
            content={residentialPlotContent}
            title="Residential"
            trigger="click"
            placement="bottomRight"
            open={showPopover?.residential}
          >
            <SearchOptionStyled onClick={onShowPopover("residential")}>
              <SearchOptionWithActionWrapperStyled>
                {selectedResidentialValue}
              </SearchOptionWithActionWrapperStyled>
            </SearchOptionStyled>
          </Popover>

          <Popover
            content={bedroomContent}
            title="Bedrooms Count"
            trigger="click"
            placement="bottomRight"
            open={showPopover?.bedroom}
          >
            <SearchOptionStyled onClick={onShowPopover("bedroom")}>
              {selectedBedroomValue}
            </SearchOptionStyled>
          </Popover>

          <Popover
            content={bathRoomContent}
            title="Bathrooms Count"
            trigger="click"
            placement="bottomRight"
            open={showPopover?.bathroom}
          >
            <SearchOptionStyled onClick={onShowPopover("bathroom")}>
              {selectedBathroomValue}
            </SearchOptionStyled>
          </Popover>

          <Popover
            content={sizeContent}
            title=""
            trigger="click"
            placement="bottomLeft"
            open={showPopover?.size}
          >
            <SearchOptionStyled onClick={onShowPopover("size")}>
              {isSizeFilterSet
                ? `${sizeMinValue ?? ""} - ${
                    sizeMaxValue ?? ""
                  } ${sizeMetricValue}`
                : "Size"}
            </SearchOptionStyled>
          </Popover>
        </SearchOptionsWrapperStyled>

        <SearchQueryStyled>
          <div className="query">{query}</div>
          <div className="count">({listings?.length} properties available)</div>
        </SearchQueryStyled>
        <SearchListingWrapperStyled>
          {listings?.map((listing) => {
            return <Property card={listing} width="330px" />;
          })}
        </SearchListingWrapperStyled>
      </SearchPageWrapperStyled>
      <Footer />
    </SearchPageStyled>
  );
};

export default SearchPage;
