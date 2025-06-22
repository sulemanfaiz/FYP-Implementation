import { Button, Collapse, Modal } from "antd";
import {
  AddAmenitiesModalFooterStyled,
  AddAmenitiesModalHeaderStyled,
  AddAmenitiesModalStyled,
  CollapsedAmenitiesWrapperStyled,
  ConfirmButtonStyled,
  ListedAmenityStyled,
  SelectedAmenitiesListStyled,
  SelectedAmenityStyled,
} from "./addamenitiesmodal.styles";
import {
  COMMUNICATION_ITEMS,
  LANDMARKS_ITEMS,
  PRIMARY_FEATURES,
  SECONDARY_FEATURES,
  UTILITIES_ITEMS,
} from "./config";

import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const FeturesList = ({ list, onAddAmenity, selectedAmenities }) => {
  const selectedAmenitiesKeys = selectedAmenities?.map((item) => item?.key);

  return list?.map((item) => {
    const selectedAmenityCnt =
      selectedAmenities?.find((amenity) => amenity?.key === item?.key)?.count ||
      0;

    return (
      <ListedAmenityStyled
        key={`list-amenity-${item?.key}`}
        onClick={() => onAddAmenity(item)}
        className={selectedAmenitiesKeys?.includes(item?.key) ? "selected" : ""}
      >
        <div> {item?.label}</div>
        {item?.shouldGetCount && (
          <div className="count-container">
            <div
              className="minus"
              onClick={() => onAddAmenity(item, "decrement")}
            >
              <MinusCircleOutlined />
            </div>
            <div className="count">{selectedAmenityCnt}</div>
            <div
              className="add"
              onClick={() => onAddAmenity(item, "increment")}
            >
              <PlusCircleOutlined />
            </div>
          </div>
        )}
      </ListedAmenityStyled>
    );
  });
};

const AddAmenitiesModal = ({
  visible,
  onClose,
  onSubmit,
  existingAmenities = [],
}) => {
  const [selectedAmenities, setSelectedAmenities] = useState(existingAmenities);

  useEffect(() => {
    setSelectedAmenities(existingAmenities);
  }, [existingAmenities]);

  const onChange = (key) => {};

  const ALL_FETAURES = [
    ...UTILITIES_ITEMS,
    ...COMMUNICATION_ITEMS,
    ...LANDMARKS_ITEMS,
    ...PRIMARY_FEATURES,
    ...SECONDARY_FEATURES,
  ];
  const COUNTABLE_KEYS = ALL_FETAURES?.filter(
    (item) => item?.shouldGetCount
  )?.map((item) => item?.key);

  const onAddAmenity = (amenity, action = "toggle") => {
    setSelectedAmenities((prev) => {
      const isCountable = COUNTABLE_KEYS.includes(amenity.key);
      const existing = prev.find((item) => item.key === amenity.key);

      if (isCountable) {
        if (existing) {
          if (action === "increment") {
            return prev.map((item) =>
              item.key === amenity.key
                ? { ...item, count: item.count + 1 }
                : item
            );
          } else if (action === "decrement") {
            if (existing.count === 1) {
              return prev.filter((item) => item.key !== amenity.key);
            } else {
              return prev.map((item) =>
                item.key === amenity.key
                  ? { ...item, count: item.count - 1 }
                  : item
              );
            }
          }
        } else if (action === "increment") {
          return [...prev, { ...amenity, count: 1 }];
        }

        return prev;
      }

      // Non-countable toggle behavior
      const exists = prev.some((item) => item.key === amenity.key);
      if (exists) {
        return prev.filter((item) => item.key !== amenity.key);
      } else {
        return [...prev, amenity];
      }
    });
  };

  const items = [
    {
      key: "1",
      label: "Primary Features",
      children: (
        <FeturesList
          list={PRIMARY_FEATURES}
          onAddAmenity={onAddAmenity}
          selectedAmenities={selectedAmenities}
        />
      ),
    },
    {
      key: "2",
      label: "Utilities",
      children: (
        <FeturesList
          list={UTILITIES_ITEMS}
          onAddAmenity={onAddAmenity}
          selectedAmenities={selectedAmenities}
        />
      ),
    },
    {
      key: "3",
      label: "Communication",
      children: (
        <FeturesList
          list={COMMUNICATION_ITEMS}
          onAddAmenity={onAddAmenity}
          selectedAmenities={selectedAmenities}
        />
      ),
    },
    {
      key: "4",
      label: "Landmarks Near By",
      children: (
        <FeturesList
          list={LANDMARKS_ITEMS}
          onAddAmenity={onAddAmenity}
          selectedAmenities={selectedAmenities}
        />
      ),
    },
    {
      key: "5",
      label: "Secondary Features",
      children: (
        <FeturesList
          list={SECONDARY_FEATURES}
          onAddAmenity={onAddAmenity}
          selectedAmenities={selectedAmenities}
        />
      ),
    },
  ];

  return (
    <Modal
      title={
        <AddAmenitiesModalHeaderStyled>
          Features and Amenities
        </AddAmenitiesModalHeaderStyled>
      }
      visible={visible}
      footer={null} // Custom footer
      onCancel={onClose}
      centered
      width={1000}
    >
      <AddAmenitiesModalStyled>
        <SelectedAmenitiesListStyled>
          {selectedAmenities?.map((amenity) => {
            const isCountExists = COUNTABLE_KEYS.includes(amenity.key);

            return (
              <SelectedAmenityStyled>
                <div className="amenity-name">
                  {isCountExists ? `${amenity?.count} ` : ""}
                  {amenity?.label}
                </div>

                <div
                  className="amenity-cancel"
                  onClick={() => onAddAmenity(amenity, "toggle")}
                >
                  x
                </div>
              </SelectedAmenityStyled>
            );
          })}
        </SelectedAmenitiesListStyled>
        <CollapsedAmenitiesWrapperStyled>
          <Collapse items={items} onChange={onChange} />
        </CollapsedAmenitiesWrapperStyled>

        <AddAmenitiesModalFooterStyled>
          <Button onClick={onClose}>Cancel</Button>
          <ConfirmButtonStyled
            type="primary"
            onClick={() => onSubmit(selectedAmenities)}
          >
            Confirm
          </ConfirmButtonStyled>
        </AddAmenitiesModalFooterStyled>
      </AddAmenitiesModalStyled>
    </Modal>
  );
};

export default AddAmenitiesModal;
