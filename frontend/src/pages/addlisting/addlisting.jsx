import {
  AddListingFormContainerStyled,
  AddListingFormStyled,
  AddListingPageStyled,
  AddListingWrapperStyled,
  BannerWrapperStyled,
  FormButtonWrapperStyled,
  FormInputWrapperStyled,
  ImagesWrapperStyled,
  ImageWrapperStyled,
} from "./addlistingstyle";

import { Input, Select } from "antd";
import { Switch } from "antd";

import { useForm, Controller } from "react-hook-form";
import { Button, Upload } from "antd";
import { useCallback } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupFormSchema } from "../../schema/signupschema";
import { Link, useNavigate } from "react-router-dom";
import {
  areaSizeOptions,
  bathroomOptions,
  bedroomOptions,
  cityOptions,
  garageOptioons,
  propertyOptions,
} from "./addlisting.config";
import TextArea from "antd/es/input/TextArea";
import ToggleSelect from "../../components/toggleselect";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const AddListingContent = (props) => {
  const { isEditMode, isDuplicateMode, property } = props || {};
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

  const listingId = useParams().id;

  const {
    propertyType = "",
    city,
    areaSizeUnit,
    areaSizeMetric,
    rent,
    bedrooms,
    bathrooms,
    title,
    desc,
    garages,
    yearBuilt,
    adress,
    houseNo,
    status,
    fileNames: alreadyUploadedImages,
  } = property || {};

  const {
    control,
    formState: { isValid },
    handleSubmit,
    setValue,
    setError,
    watch,
    getValues,
  } = useForm({
    defaultValues: {
      propertyType,
      city: city || undefined,
      areaSizeUnit,
      areaSizeMetric: areaSizeMetric || undefined,
      rent,
      bedrooms,
      garages,
      bathrooms,
      title,
      desc,
      images: alreadyUploadedImages || [],
      yearBuilt,
      adress,
      houseNo,
      status,
    },
    mode: "onChange",
    // resolver: yupResolver(signupFormSchema),
  });

  const {
    images: fileList,
    propertyType: propertyTypeWatched,
    bedrooms: bedroomsWatched,
    bathrooms: bathroomsWatched,
    garages: garagesWatched,
  } = watch();

  const onSubmitValues = useCallback(async (values, isDraft, isEdited) => {
    const {
      propertyType,
      city,
      areaSizeUnit,
      areaSizeMetric,
      rent,
      bedrooms,
      garages,
      bathrooms,
      title,
      desc,
      images,
      yearBuilt,
      status,
      adress,
      houseNo,
    } = values || {};

    const formData = new FormData();

    console.log("images", images);

    images.forEach((file) => {
      formData.append("images", file.originFileObj); // Append each file
    });

    formData.append("propertyType", propertyType);
    formData.append("city", city);
    formData.append("areaSizeUnit", areaSizeUnit);
    formData.append("areaSizeMetric", areaSizeMetric);
    formData.append("rent", rent);
    formData.append("bedrooms", bedrooms);
    formData.append("bathrooms", bathrooms);
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("garages", garages);
    formData.append("yearBuilt", yearBuilt);
    formData.append("adress", adress);
    formData.append("houseNo", houseNo);
    formData.append("isDraft", isDraft);

    const token = localStorage.getItem("token");

    const url = isEdited
      ? `http://localhost:8080/listing/edit-listing/${listingId}`
      : "http://localhost:8080/listing/add-listing";

    const method = isEdited ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const result = await response.json();

      const { success, message, error } = result;
      if (success) {
        navigate("/my-properties");
      } else if (error) {
        const details = error?.details[0].message;
      }
    } catch (err) {
      console.log("catch error", err);
    }
  }, []);

  const onAdd = useCallback((values) => {
    onSubmitValues(values, false);
  }, []);

  const onSaveAsDraft = useCallback((values) => {
    onSubmitValues(values, true);
  }, []);

  const onSaveAsEdit = useCallback((values) => {
    onSubmitValues(values, false, true);
  }, []);

  const onOptionChange = (name, option) => {
    setValue(name, option);
  };

  const pageTitle = isEditMode
    ? "Edit your property details"
    : isDuplicateMode
    ? "Duplicate your property"
    : "Add your property details";

  return (
    <AddListingPageStyled>
      <BannerWrapperStyled>
        <div className="text">{pageTitle}</div>
        <div className="desc">
          Get the best value for your property in a few steps.
        </div>
      </BannerWrapperStyled>

      <AddListingWrapperStyled>
        <AddListingFormContainerStyled>
          <AddListingFormStyled>
            <FormInputWrapperStyled>
              <div className="ques">What kind of property do you have?</div>

              <ToggleSelect
                options={propertyOptions}
                propsOnClick={(value) => onOptionChange("propertyType", value)}
                selectedValue={propertyTypeWatched}
              />
            </FormInputWrapperStyled>

            <FormInputWrapperStyled>
              <div className="ques">Which city is your property in?</div>
              <Controller
                control={control}
                name="city"
                render={({ field }) => (
                  <Select
                    {...field}
                    className="select-field"
                    options={cityOptions}
                    placeholder="Choose City"
                  />
                )}
              />
            </FormInputWrapperStyled>

            <FormInputWrapperStyled>
              <div className="ques">What is your house number?</div>
              <Controller
                control={control}
                name="houseNo"
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter House No"
                    className="input-field"
                  />
                )}
              />
            </FormInputWrapperStyled>

            <FormInputWrapperStyled>
              <div className="ques">Which area is your property in?</div>
              <Controller
                control={control}
                name="adress"
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Address, Block, Phase, City etc"
                    className="input-field"
                  />
                )}
              />
            </FormInputWrapperStyled>

            <FormInputWrapperStyled>
              <div className="ques">What is the rent price?</div>
              <Controller
                control={control}
                name="rent"
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Rent"
                    className="input-field"
                  />
                )}
              />
            </FormInputWrapperStyled>

            <FormInputWrapperStyled>
              <div className="ques">What is the size of your property?</div>
              <div className="inputs-container">
                <Controller
                  control={control}
                  name="areaSizeUnit"
                  render={({ field }) => (
                    <Input
                      {...field}
                      className="input-field"
                      placeholder="Area Size"
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="areaSizeMetric"
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={areaSizeOptions}
                      className="small-select-field"
                      placeholder="Area Size Unit"
                    />
                  )}
                />
              </div>
            </FormInputWrapperStyled>

            <FormInputWrapperStyled>
              <div className="ques">How many bedrooms does it have?</div>

              <ToggleSelect
                options={bedroomOptions}
                propsOnClick={(value) => onOptionChange("bedrooms", value)}
                selectedValue={bedroomsWatched}
              />
            </FormInputWrapperStyled>

            <FormInputWrapperStyled>
              <div className="ques">How many bathrooms does it have?</div>

              <ToggleSelect
                options={bathroomOptions}
                propsOnClick={(value) => onOptionChange("bathrooms", value)}
                selectedValue={bathroomsWatched}
              />
            </FormInputWrapperStyled>

            <FormInputWrapperStyled>
              <div className="ques">How many garages does it have?</div>

              <ToggleSelect
                options={garageOptioons}
                propsOnClick={(value) => onOptionChange("garages", value)}
                selectedValue={garagesWatched}
              />
            </FormInputWrapperStyled>

            <FormInputWrapperStyled>
              <div className="ques">When is your house built?</div>
              <Controller
                control={control}
                name="yearBuilt"
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter Property Built Year"
                    className="input-field"
                  />
                )}
              />
            </FormInputWrapperStyled>

            <FormInputWrapperStyled>
              <div className="ques">Name your property</div>
              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter Property title"
                    className="input-field"
                  />
                )}
              />
            </FormInputWrapperStyled>

            <FormInputWrapperStyled>
              <div className="ques">What do you love about the place?</div>
              <Controller
                control={control}
                name="desc"
                render={({ field }) => (
                  <TextArea
                    {...field}
                    placeholder="Describe your property"
                    className="textarea-field"
                  />
                )}
              />
            </FormInputWrapperStyled>

            <FormInputWrapperStyled>
              <div className="ques">Upload images of your property</div>
              <div className="field-desc">
                Properties with images of good quality generate 8X more leads.
              </div>

              <Controller
                control={control}
                name="images"
                render={({ field: { value, onChange } }) => {
                  const handleUpload = ({ file, fileList }) => {
                    const newImages = fileList.map((f) => f);
                    onChange([...value, ...newImages]);
                  };

                  const handleRemove = (imgToRemove) => {
                    const updated = value.filter(
                      (img) =>
                        typeof img === "string"
                          ? img !== imgToRemove // remove old
                          : img.uid !== imgToRemove.uid // remove new
                    );

                    onChange(updated);
                  };

                  return (
                    <>
                      <Upload
                        multiple
                        listType="picture"
                        beforeUpload={() => false} // Prevent auto-upload
                        onChange={handleUpload}
                        showUploadList={false}
                      >
                        <Button>Click to Upload</Button>
                      </Upload>
                      <ImagesWrapperStyled>
                        {Array.isArray(value) ? (
                          value?.map((path, index) => {
                            const isOld = typeof path === "string";

                            const src = isOld
                              ? `${API_URL}/uploads/${path}`
                              : URL.createObjectURL(path.originFileObj);

                            return (
                              <ImageWrapperStyled>
                                <div
                                  className="delete-icon"
                                  onClick={() => handleRemove(path)}
                                >
                                  x
                                </div>

                                <img
                                  className="property-image"
                                  src={src}
                                  alt={`property-image-${index}`}
                                />
                              </ImageWrapperStyled>
                            );
                          })
                        ) : (
                          <>No images found</>
                        )}
                      </ImagesWrapperStyled>
                    </>
                  );
                }}
              />
            </FormInputWrapperStyled>

            <FormButtonWrapperStyled>
              <Button
                className="cancel-button"
                onClick={handleSubmit(onSaveAsDraft)}
              >
                Save as draft
              </Button>
              {isEditMode ? (
                <Button
                  className="add-button"
                  onClick={handleSubmit(onSaveAsEdit)}
                >
                  Save
                </Button>
              ) : (
                <Button className="add-button" onClick={handleSubmit(onAdd)}>
                  Add
                </Button>
              )}
            </FormButtonWrapperStyled>
          </AddListingFormStyled>
        </AddListingFormContainerStyled>
      </AddListingWrapperStyled>
    </AddListingPageStyled>
  );
};

const AddListing = (props) => {
  const { isEditMode, isDuplicateMode } = props || {};
  const params = useParams();
  const propertyId = params.id;

  const [property, setProperty] = useState({});
  const [isLoading, setIsLoading] = useState(propertyId);

  const token = localStorage.getItem("token");

  const getListingDetailBasedOnId = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/listing/get-listing-detail/" + propertyId,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Important
          },
        }
      );
      const result = await response.json();
      const { success, message, error } = result;

      setIsLoading(false);
      if (success) {
        const listing = result.data || {};
        setProperty(listing);
      } else if (error) {
        const details = error?.details[0].message;
      }
    } catch (err) {
      console.log("catch error", err);
    }
  };

  useEffect(() => {
    propertyId && getListingDetailBasedOnId();
  }, []);

  return (
    <AddListingContent
      {...props}
      property={property}
      key={isLoading ? "" : "property-form"}
    />
  );
};

export default AddListing;
