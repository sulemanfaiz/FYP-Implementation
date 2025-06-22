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
import { useToast } from "../../hooks/useToast";
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
import AddAmenitiesModal from "../addamenitiesmodal";
import Header from "../../components/header/header";
import ToastProvider from "../../components/toast componenet/ToastProvider";

const AddListingContent = (props) => {
  const [isFeatureModalVisible, setIsFeatureModalVisible] = useState(false);

  const { isEditMode, isDuplicateMode, property } = props || {};
  const navigate = useNavigate();
  const { showSuccess, showError, showLoading, dismiss } = useToast();
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
    features = [],
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
      features,
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
    isSeasonalDiscount: isSeasonalDiscountWatched,
  } = watch();

  const onFeatureModalOpen = () => {
    setIsFeatureModalVisible(true);
  };

  const onFeatureModalClose = (data) => {
    setIsFeatureModalVisible(false);
  };

  const onFeaturesSaved = (data) => {
    setValue(
      "features",
      data?.map((f) => ({ key: f.key, label: f.label, count: f.count || 0 }))
    );
    onFeatureModalClose();
  };

  const onSubmitValues = useCallback(
    async (values, isDraft, isEdited) => {
      const toastId = showLoading(
        isEdited
          ? "Updating listing…"
          : isDraft
          ? "Saving draft…"
          : "Adding listing…"
      );
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
        features = [],
        isSeasonalDiscount,
        discountStartDate,
        discountEndDate,
        discountPercentage,
        discountLabel,
      } = values || {};

      const formData = new FormData();

      images.forEach((file) => {
        if (file.originFileObj instanceof File) {
          formData.append("images", file.originFileObj);
        }
      });

      const existingImageUrls = images
        .filter((file) => typeof file === "string" || !file.originFileObj)
        .map((file) => (typeof file === "string" ? file : file.url));

      formData.append("existingImages", JSON.stringify(existingImageUrls));
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
      formData.append("features", JSON.stringify(features));
      formData.append("isDiscountEnabled", isSeasonalDiscount);
      formData.append("discountStartDate", discountStartDate);
      formData.append("discountEndDate", discountEndDate);
      formData.append("discountPercentage", discountPercentage);
      formData.append("discountLabel", discountLabel);

      const token = localStorage.getItem("token");

      const url = isEdited
        ? `${API_URL}/listing/edit-listing/${listingId}`
        : `${API_URL}/listing/add-listing`;

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
        dismiss(toastId);
        const { success, message, error } = result;
        if (success) {
          showSuccess(
            isEdited
              ? "✅ Listing updated successfully!"
              : isDraft
              ? "✅ Draft saved successfully!"
              : "✅ Listing added successfully!"
          );
          navigate("/my-properties");
        } else if (error) {
          const msg =
            error?.details?.[0]?.message || message || "Action failed.";
          showError(`❌ ${msg}`);
        }
      } catch (err) {
        dismiss(toastId);
        console.error("catch error", err);
        showError("❌ Something went wrong. Please try again later.");
      }
    },
    [API_URL, listingId, navigate, showError, showLoading, showSuccess, dismiss]
  );

  const onAdd = useCallback(
    (values) => {
      onSubmitValues(values, false, false);
    },
    [onSubmitValues]
  );

  const onSaveAsDraft = useCallback(
    (values) => {
      onSubmitValues(values, true, false);
    },
    [onSubmitValues]
  );

  const onSaveAsEdit = useCallback(
    (values) => {
      onSubmitValues(values, false, true);
    },
    [onSubmitValues]
  );

  const onOptionChange = (name, option) => {
    setValue(name, option);
  };

  const pageTitle = isEditMode
    ? "Edit your property details"
    : isDuplicateMode
    ? "Duplicate your property"
    : "Add your property details";

  const onChange = (checked) => {
    setValue("isSeasonalDiscount", checked);
  };

  return (
    <AddListingPageStyled>
      <Header />
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
              <div className="ques">What amenities are available?</div>

              <div className="field-desc">
                Add additional features e.g balcony, utilities, security details
                etc. (Optional)
              </div>
              <div className="add-container" onClick={onFeatureModalOpen}>
                Add Features
              </div>
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

            <FormInputWrapperStyled>
              <div className="ques">
                Wanna Enable Seasonal Discount on your property?
                <Controller
                  control={control}
                  name="isSeasonalDiscount"
                  render={({ field }) => <Switch onChange={onChange} />}
                />
              </div>
            </FormInputWrapperStyled>

            {isSeasonalDiscountWatched && (
              <>
                <FormInputWrapperStyled>
                  <div className="ques">What will be the discount title?</div>
                  <Controller
                    control={control}
                    name="discountLabel"
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="e.g Seasonal Summer Discount"
                        className="input-field"
                      />
                    )}
                  />
                </FormInputWrapperStyled>

                <FormInputWrapperStyled>
                  <div className="ques">What is discount percentage (%)?</div>
                  <Controller
                    control={control}
                    name="discountPercentage"
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="e.g 10%"
                        className="input-field"
                      />
                    )}
                  />
                </FormInputWrapperStyled>

                <FormInputWrapperStyled>
                  <div className="ques">
                    Choose when the discount should begin.
                  </div>
                  <Controller
                    control={control}
                    name="discountStartDate"
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="e.g 10%"
                        className="input-field"
                        type="date"
                      />
                    )}
                  />
                </FormInputWrapperStyled>

                <FormInputWrapperStyled>
                  <div className="ques">
                    Choose when the discount should end.
                  </div>
                  <Controller
                    control={control}
                    name="discountEndDate"
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="e.g 10%"
                        className="input-field"
                        type="date"
                      />
                    )}
                  />
                </FormInputWrapperStyled>
              </>
            )}

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

              <AddAmenitiesModal
                visible={isFeatureModalVisible}
                onClose={onFeatureModalClose}
                onSubmit={onFeaturesSaved}
                existingAmenities={features}
              />
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
