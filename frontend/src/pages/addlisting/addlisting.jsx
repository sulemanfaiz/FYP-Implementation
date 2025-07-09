import {
  AddListingFormContainerStyled,
  AddListingFormStyled,
  AddListingPageStyled,
  AddListingPageWrapperStyled,
  AddListingWrapperStyled,
  BannerWrapperStyled,
  ColumnFlexStyled,
  FormButtonWrapperStyled,
  FormInputWrapperStyled,
  ImagesWrapperStyled,
  ImageWrapperStyled,
} from "./addlistingstyle";

import { DatePicker, Input, Select, Tooltip } from "antd";
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
import { Footer } from "../../components";
import { addListingSchema } from "./addlistingschema";
import { useToast } from "../../hooks/useToast";
import { PageLoader } from "../../components/pageloader";
import { BorderedButtonStyled, FilledButtonStyled } from "../../app.styles";
import { Checkbox } from "antd";
import PaymentModal from "../../components/paymentmodal/PaymentModal";

const AddListingContent = (props) => {
  const [isPremium, setIsPremium] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingFormValues, setPendingFormValues] = useState(null);

  const { showSuccess, showError, showLoading } = useToast(); // ✅ Use methods
  const [spinning, setSpinning] = useState(false);

  const [isFeatureModalVisible, setIsFeatureModalVisible] = useState(false);

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
    features = [],
    isSeasonalDiscount = false,
    discountEndDate,
    discountLabel = "",
    discountPercentage = "",
    discountStartDate,
  } = property || {};

  const {
    control,
    formState: { isValid, errors },
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
      areaSizeMetric: areaSizeMetric || "marla",
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
      isSeasonalDiscount,
      discountEndDate,
      discountLabel,
      discountPercentage,
      discountStartDate,
    },
    mode: "onChange",
    resolver: yupResolver(addListingSchema),
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
    setIsFeatureModalVisible(true); // Show the modal
  };
  const onFeatureModalClose = (data) => {
    setIsFeatureModalVisible(false); // Close the modal after submission
  };

  const onFeaturesSaved = (data) => {
    setValue(
      "features",
      data?.map((f) => ({ key: f.key, label: f.label, count: f.count || 0 }))
    );
    // Close the modal after submission
    onFeatureModalClose();
  };

  const onSubmitValues = useCallback(
    async (values, isDraft, isEdited, paymentIntentId = null) => {
      const { isPremium: isPremiumListing } = values;
      setSpinning(true);
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
        desc = "",
        images,
        yearBuilt = "",
        adress,
        houseNo = "",
        features = [],
        isSeasonalDiscount = false,
        discountStartDate = "",
        discountEndDate = "",
        discountPercentage = "",
        discountLabel = "",
      } = values || {};

      const formData = new FormData();
      formData.append("isPremium", isPremiumListing ? "true" : "false");
      if (paymentIntentId) formData.append("paymentIntentId", paymentIntentId);

      images.forEach((file) => {
        if (file.originFileObj instanceof File) {
          formData.append("images", file.originFileObj);
        }
      });

      const existingImageUrls = images
        .filter((file) => typeof file === "string" || !file.originFileObj)
        .map((file) => (typeof file === "string" ? file : file.url)); // depends on your structure

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
          showSuccess(
            isEdited
              ? "Property updated successfully!"
              : isDraft
              ? "Draft saved successfully!"
              : "Property added successfully!"
          );
          navigate("/my-properties");
        } else if (error) {
          const details = error?.details[0].message;
        }
      } catch (err) {
        console.log("catch error", err);
      } finally {
        setSpinning(false);
      }
    },
    []
  );

  const onAdd = useCallback(
    (values) => {
      if (isPremium) {
        setPendingFormValues({ ...values, isPremium: true });
        setShowPaymentModal(true);
      } else {
        onSubmitValues({ ...values, isPremium: false }, false);
      }
    },
    [isPremium, onSubmitValues]
  );

  const onSaveAsDraft = useCallback((values) => {
    onSubmitValues(values, true);
  }, []);

  const onSaveAsEdit = useCallback((values) => {
    onSubmitValues(values, false, true);
  }, []);

  const onOptionChange = (name, option) => {
    setValue(name, option, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const pageTitle = isEditMode
    ? "Edit your property details"
    : isDuplicateMode
    ? "Duplicate your property"
    : "Add your property details";

  const onChange = (checked) => {
    setValue("isSeasonalDiscount", checked);
  };

  const isFormValid = errors?.length > 0 ? false : true;

  // Handle payment modal success
  const handlePaymentSuccess = (paymentIntent) => {
    setShowPaymentModal(false);
    if (pendingFormValues) {
      onSubmitValues(pendingFormValues, false, false, paymentIntent.id);
      setPendingFormValues(null);
    }
  };
  const handlePaymentCancel = () => {
    setShowPaymentModal(false);
    setPendingFormValues(null);
  };

  return (
    <AddListingPageStyled>
      <Header />

      <PageLoader spinning={spinning} />

      <AddListingPageWrapperStyled>
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
                <div className="ques">
                  What kind of property do you have?
                  <span className="error">*</span>
                </div>

                <ToggleSelect
                  options={propertyOptions}
                  propsOnClick={(value) =>
                    onOptionChange("propertyType", value)
                  }
                  selectedValue={propertyTypeWatched}
                />
              </FormInputWrapperStyled>

              <FormInputWrapperStyled>
                <div className="ques">
                  Which city is your property in?{" "}
                  <span className="star">*</span>
                </div>
                <Controller
                  control={control}
                  name="city"
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Select
                        {...field}
                        className="select-field"
                        options={cityOptions}
                        placeholder="Choose City"
                      />
                      <div className="error">{error?.message}</div>
                    </>
                  )}
                />
              </FormInputWrapperStyled>

              <FormInputWrapperStyled>
                <div className="ques">What is your house number?</div>
                <Controller
                  control={control}
                  name="houseNo"
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Input
                        {...field}
                        placeholder="Enter House No"
                        className="input-field"
                      />
                      <div className="error">{error?.message}</div>
                    </>
                  )}
                />
              </FormInputWrapperStyled>

              <FormInputWrapperStyled>
                <div className="ques">
                  Which area is your property in?{" "}
                  <span className="star">*</span>
                </div>
                <Controller
                  control={control}
                  name="adress"
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Input
                        {...field}
                        placeholder="Address, Block, Phase, City etc"
                        className="input-field"
                      />
                      <div className="error">{error?.message}</div>
                    </>
                  )}
                />
              </FormInputWrapperStyled>

              <FormInputWrapperStyled>
                <div className="ques">
                  What is the rent price? <span className="star">*</span>
                </div>
                <Controller
                  control={control}
                  name="rent"
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Input
                        {...field}
                        placeholder="Rent"
                        className="input-field"
                      />
                      <div className="error">{error?.message}</div>
                    </>
                  )}
                />
              </FormInputWrapperStyled>

              <FormInputWrapperStyled>
                <div className="ques">
                  What is the size of your property?{" "}
                  <span className="star">*</span>
                </div>
                <div className="inputs-container">
                  <Controller
                    control={control}
                    name="areaSizeUnit"
                    render={({ field, fieldState: { error } }) => (
                      <ColumnFlexStyled>
                        <Input
                          {...field}
                          className="input-field"
                          placeholder="Area Size"
                        />
                        <div className="error">{error?.message}</div>
                      </ColumnFlexStyled>
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
                <div className="ques">
                  How many bedrooms does it have?{" "}
                  <span className="star">*</span>
                </div>

                <ToggleSelect
                  options={bedroomOptions}
                  propsOnClick={(value) => onOptionChange("bedrooms", value)}
                  selectedValue={bedroomsWatched}
                />
              </FormInputWrapperStyled>

              <FormInputWrapperStyled>
                <div className="ques">
                  How many bathrooms does it have?{" "}
                  <span className="star">*</span>
                </div>

                <ToggleSelect
                  options={bathroomOptions}
                  propsOnClick={(value) => onOptionChange("bathrooms", value)}
                  selectedValue={bathroomsWatched}
                />
              </FormInputWrapperStyled>

              <FormInputWrapperStyled>
                <div className="ques">
                  How many garages does it have?
                  <span className="star">*</span>
                </div>

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
                <div className="ques">
                  Name your property
                  <span className="star">*</span>
                </div>
                <Controller
                  control={control}
                  name="title"
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Input
                        {...field}
                        placeholder="Enter Property title"
                        className="input-field"
                      />
                      <div className="error">{error?.message}</div>
                    </>
                  )}
                />
              </FormInputWrapperStyled>

              <FormInputWrapperStyled>
                <div className="ques">What amenities are available?</div>

                <div className="field-desc">
                  Add additional features e.g balcony, utilities, security
                  details etc. (Optional)
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
                          accept="image/jpeg,image/png,image/jpg,image/webp"
                        >
                          <BorderedButtonStyled>
                            Click to Upload
                          </BorderedButtonStyled>
                        </Upload>
                        <ImagesWrapperStyled>
                          {Array.isArray(value) ? (
                            value?.map((path, index) => {
                              const isOld = typeof path === "string";

                              const src = isOld
                                ? `${API_URL}/uploads/${path}`
                                : URL.createObjectURL(path.originFileObj);

                              return (
                                <ImageWrapperStyled key={`${path}-${index}`}>
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

              <FormInputWrapperStyled>
                <Checkbox
                  checked={isPremium}
                  onChange={(e) => setIsPremium(e.target.checked)}
                  style={{ marginBottom: 12 }}
                >
                  <b>Become Premium Member for $5 (Featured Listing)</b>
                </Checkbox>
              </FormInputWrapperStyled>

              <FormButtonWrapperStyled>
                {["draft", "main"]?.map((type) => {
                  const isDraft = type === "draft";
                  const label = isDraft
                    ? "Save as draft"
                    : isEditMode
                    ? "Save"
                    : "Add";

                  const onClickHandler = isDraft
                    ? onSaveAsDraft
                    : isEditMode
                    ? onSaveAsEdit
                    : onAdd;

                  return (
                    <Tooltip
                      key={type}
                      title={
                        !isFormValid
                          ? "Please fill all the required fields."
                          : ""
                      }
                      overlayClassName="custom-tooltip"
                      placement="topRight"
                    >
                      <Button
                        className={isDraft ? "cancel-button" : "add-button"}
                        onClick={handleSubmit(onClickHandler)}
                        disabled={!isFormValid}
                      >
                        {label}
                      </Button>
                    </Tooltip>
                  );
                })}
                <AddAmenitiesModal
                  visible={isFeatureModalVisible}
                  onClose={onFeatureModalClose}
                  onSubmit={onFeaturesSaved}
                  existingAmenities={features}
                />
                <PaymentModal
                  visible={showPaymentModal}
                  amount={5}
                  onSuccess={handlePaymentSuccess}
                  onCancel={handlePaymentCancel}
                />
              </FormButtonWrapperStyled>
            </AddListingFormStyled>
          </AddListingFormContainerStyled>
        </AddListingWrapperStyled>
      </AddListingPageWrapperStyled>
      <Footer />
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
