import {
  FormInputWrapperStyled,
  PredictionFormButtonWrapperStyled,
  PredictionPageFieldsWrapperStyled,
  PredictionPageStyled,
  PredictionPageWrapperStyled,
} from "./smartaipredictionform.styles";
import { Header, Footer } from "../../components";
import PageBanner from "../../components/pagebanner";
import { useForm, Controller } from "react-hook-form";
import { areaSizeOptions, cityOptions } from "../addlisting/addlisting.config";
import { Button, Input, Select, message, Form } from "antd";
import PredictionCard from "../predictioncard";
import { useState } from "react";

// Property type and furnished options matching the model
const propertyTypeOptions = [
  { value: "Full House", label: "Full House" },
  { value: "Apartment", label: "Apartment" },
  { value: "Portion", label: "Portion" },
];
const furnishedOptions = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
];

// Validation rules
const validationRules = {
  city: {
    required: "Please select a city",
  },
  location: {
    required: "Please enter the property location",
    minLength: {
      value: 2,
      message: "Location must be at least 2 characters long",
    },
    maxLength: {
      value: 50,
      message: "Location must not exceed 50 characters",
    },
    pattern: {
      value: /^[a-zA-Z0-9\s\-\.]+$/,
      message:
        "Location can only contain letters, numbers, spaces, hyphens, and dots",
    },
  },
  propertyType: {
    required: "Please select a property type",
  },
  bedrooms: {
    required: "Please enter the number of bedrooms",
    min: {
      value: 1,
      message: "Bedrooms must be at least 1",
    },
    max: {
      value: 10,
      message: "Bedrooms cannot exceed 10",
    },
    pattern: {
      value: /^[1-9]|10$/,
      message: "Please enter a valid number of bedrooms (1-10)",
    },
  },
  bathrooms: {
    required: "Please enter the number of bathrooms",
    min: {
      value: 1,
      message: "Bathrooms must be at least 1",
    },
    max: {
      value: 10,
      message: "Bathrooms cannot exceed 10",
    },
    pattern: {
      value: /^[1-9]|10$/,
      message: "Please enter a valid number of bathrooms (1-10)",
    },
  },
  furnished: {
    required: "Please select whether the property is furnished",
  },
  areaSizeUnit: {
    required: "Please enter the property area size",
    min: {
      value: 100,
      message: "Area size must be at least 100 sq ft",
    },
    max: {
      value: 10000,
      message: "Area size cannot exceed 10,000 sq ft",
    },
    pattern: {
      value: /^\d+(\.\d{1,2})?$/,
      message:
        "Please enter a valid area size (numbers only, max 2 decimal places)",
    },
  },
  areaSizeMetric: {
    required: "Please select the area size unit",
  },
};

const predictRent = async (formData) => {
  try {
    const response = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Prediction failed");
    }
    return data;
  } catch (error) {
    throw new Error(error.message || "Network error");
  }
};

const processFormData = (formData) => {
  return {
    city: formData.city,
    location: formData.location,
    propertyType: formData.propertyType,
    bedrooms: parseInt(formData.bedrooms, 10),
    bathrooms: parseInt(formData.bathrooms, 10),
    furnished: formData.furnished,
    areaSizeUnit: parseFloat(formData.areaSizeUnit),
    areaSizeMetric: formData.areaSizeMetric,
  };
};

const SmartPredictionForm = () => {
  const [showPrediction, setShowPrediction] = useState(false);
  const [predictionData, setPredictionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
    watch,
    getValues,
    trigger,
  } = useForm({
    defaultValues: {
      city: "",
      location: "",
      propertyType: "",
      bedrooms: "",
      bathrooms: "",
      furnished: "No",
      areaSizeUnit: "",
      areaSizeMetric: "marla",
    },
    mode: "onChange",
  });

  // Watch form values for real-time validation
  const watchedValues = watch();

  // Custom validation function
  const validateForm = async (formData) => {
    const errors = {};

    // Required field validation
    Object.keys(validationRules).forEach((field) => {
      const value = formData[field];
      const rules = validationRules[field];

      if (rules.required && (!value || value === "")) {
        errors[field] = rules.required;
        return;
      }

      if (value) {
        // Min length validation
        if (rules.minLength && value.length < rules.minLength.value) {
          errors[field] = rules.minLength.message;
          return;
        }

        // Max length validation
        if (rules.maxLength && value.length > rules.maxLength.value) {
          errors[field] = rules.maxLength.message;
          return;
        }

        // Pattern validation
        if (rules.pattern && !rules.pattern.value.test(value)) {
          errors[field] = rules.pattern.message;
          return;
        }

        // Min value validation
        if (rules.min && parseFloat(value) < rules.min.value) {
          errors[field] = rules.min.message;
          return;
        }

        // Max value validation
        if (rules.max && parseFloat(value) > rules.max.value) {
          errors[field] = rules.max.message;
          return;
        }
      }
    });

    // Additional business logic validation
    if (formData.bedrooms && formData.bathrooms) {
      const bedrooms = parseInt(formData.bedrooms);
      const bathrooms = parseInt(formData.bathrooms);

      if (bathrooms > bedrooms * 2) {
        errors.bathrooms =
          "Number of bathrooms cannot be more than twice the number of bedrooms";
      }
    }

    if (formData.areaSizeUnit && formData.bedrooms) {
      const area = parseFloat(formData.areaSizeUnit);
      const bedrooms = parseInt(formData.bedrooms);

      // Minimum area per bedroom (assuming 200 sq ft per bedroom)
      const minAreaPerBedroom = 200;
      const minTotalArea = bedrooms * minAreaPerBedroom;

      if (area < minTotalArea) {
        errors.areaSizeUnit = `Area seems too small for ${bedrooms} bedroom(s). Minimum recommended: ${minTotalArea} sq ft`;
      }
    }

    return errors;
  };

  const onPredict = async () => {
    try {
      const rawFormData = getValues();

      // Validate form data
      const validationErrors = await validateForm(rawFormData);

      if (Object.keys(validationErrors).length > 0) {
        // Set errors in form
        Object.keys(validationErrors).forEach((field) => {
          setValue(field, rawFormData[field], { shouldValidate: true });
        });

        // Show first error message
        const firstError = Object.values(validationErrors)[0];
        message.error(firstError);
        return;
      }

      // Process form data before sending
      const processedFormData = processFormData(rawFormData);

      setShowPrediction(true);
      setLoading(true);
      setError(null);
      setPredictionData(null);

      const result = await predictRent(processedFormData);

      if (result.predicted_rent !== undefined) {
        setPredictionData({
          prediction: Math.round(result.predicted_rent),
          confidence: result.confidence || 0.85,
        });
        message.success("Prediction completed successfully!");
      } else {
        throw new Error(result.error || "Prediction failed");
      }
    } catch (error) {
      setError(error.message);
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onClose = () => {
    setShowPrediction(false);
    setPredictionData(null);
    setError(null);
    setLoading(false);
  };

  // Check if form is valid for submission
  const isFormValid =
    Object.keys(errors).length === 0 &&
    Object.values(watchedValues).every((value) => value && value !== "");

  return (
    <PredictionPageStyled>
      <Header />
      <PredictionPageWrapperStyled>
        <PageBanner
          heading="Smart Rent Ai Prediction"
          description="Get an instant AI-powered rent estimate based on your property's location, size, and features."
        />
        <PredictionPageFieldsWrapperStyled>
          <FormInputWrapperStyled>
            <div className="ques">Which city is your property in? *</div>
            <Controller
              control={control}
              name="city"
              rules={validationRules.city}
              render={({ field }) => (
                <div>
                  <Select
                    {...field}
                    className={`select-field ${errors.city ? "error" : ""}`}
                    options={cityOptions}
                    placeholder="Choose City"
                    status={errors.city ? "error" : ""}
                  />
                  {errors.city && (
                    <div className="error-message">{errors.city.message}</div>
                  )}
                </div>
              )}
            />
          </FormInputWrapperStyled>

          <FormInputWrapperStyled>
            <div className="ques">Enter the Property Location *</div>
            <Controller
              control={control}
              name="location"
              rules={validationRules.location}
              render={({ field }) => (
                <div>
                  <Input
                    {...field}
                    className={`input-field ${errors.location ? "error" : ""}`}
                    placeholder="e.g., F-7, G-6, Bahria Town, DHA Phase 2"
                    status={errors.location ? "error" : ""}
                  />
                  {errors.location && (
                    <div className="error-message">
                      {errors.location.message}
                    </div>
                  )}
                </div>
              )}
            />
          </FormInputWrapperStyled>

          <FormInputWrapperStyled>
            <div className="ques">What kind of property do you have? *</div>
            <Controller
              control={control}
              name="propertyType"
              rules={validationRules.propertyType}
              render={({ field }) => (
                <div>
                  <Select
                    {...field}
                    className={`select-field ${
                      errors.propertyType ? "error" : ""
                    }`}
                    options={propertyTypeOptions}
                    placeholder="Choose Property Type"
                    status={errors.propertyType ? "error" : ""}
                  />
                  {errors.propertyType && (
                    <div className="error-message">
                      {errors.propertyType.message}
                    </div>
                  )}
                </div>
              )}
            />
          </FormInputWrapperStyled>

          <FormInputWrapperStyled>
            <div className="ques">What is the size of your property? *</div>
            <div className="inputs-container">
              <Controller
                control={control}
                name="areaSizeUnit"
                rules={validationRules.areaSizeUnit}
                render={({ field }) => (
                  <div>
                    <Input
                      {...field}
                      className={`input-field ${
                        errors.areaSizeUnit ? "error" : ""
                      }`}
                      placeholder="Area Size"
                      type="number"
                      min={100}
                      max={10000}
                      step={0.01}
                      status={errors.areaSizeUnit ? "error" : ""}
                    />
                    {errors.areaSizeUnit && (
                      <div className="error-message">
                        {errors.areaSizeUnit.message}
                      </div>
                    )}
                  </div>
                )}
              />
              <Controller
                control={control}
                name="areaSizeMetric"
                rules={validationRules.areaSizeMetric}
                render={({ field }) => (
                  <div>
                    <Select
                      {...field}
                      className={`small-select-field ${
                        errors.areaSizeMetric ? "error" : ""
                      }`}
                      options={areaSizeOptions}
                      placeholder="Area Size Unit"
                      status={errors.areaSizeMetric ? "error" : ""}
                    />
                    {errors.areaSizeMetric && (
                      <div className="error-message">
                        {errors.areaSizeMetric.message}
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
          </FormInputWrapperStyled>

          <FormInputWrapperStyled>
            <div className="ques">How many bedrooms does it have? *</div>
            <Controller
              control={control}
              name="bedrooms"
              rules={validationRules.bedrooms}
              render={({ field }) => (
                <div>
                  <Input
                    {...field}
                    className={`input-field ${errors.bedrooms ? "error" : ""}`}
                    placeholder="Bedrooms (1-10)"
                    type="number"
                    min={1}
                    max={10}
                    status={errors.bedrooms ? "error" : ""}
                  />
                  {errors.bedrooms && (
                    <div className="error-message">
                      {errors.bedrooms.message}
                    </div>
                  )}
                </div>
              )}
            />
          </FormInputWrapperStyled>

          <FormInputWrapperStyled>
            <div className="ques">How many bathrooms does it have? *</div>
            <Controller
              control={control}
              name="bathrooms"
              rules={validationRules.bathrooms}
              render={({ field }) => (
                <div>
                  <Input
                    {...field}
                    className={`input-field ${errors.bathrooms ? "error" : ""}`}
                    placeholder="Bathrooms (1-10)"
                    type="number"
                    min={1}
                    max={10}
                    status={errors.bathrooms ? "error" : ""}
                  />
                  {errors.bathrooms && (
                    <div className="error-message">
                      {errors.bathrooms.message}
                    </div>
                  )}
                </div>
              )}
            />
          </FormInputWrapperStyled>

          <FormInputWrapperStyled>
            <div className="ques">Is it Furnished Property? *</div>
            <Controller
              control={control}
              name="furnished"
              rules={validationRules.furnished}
              render={({ field }) => (
                <div>
                  <Select
                    {...field}
                    className={`select-field ${
                      errors.furnished ? "error" : ""
                    }`}
                    options={furnishedOptions}
                    placeholder="Furnished?"
                    status={errors.furnished ? "error" : ""}
                  />
                  {errors.furnished && (
                    <div className="error-message">
                      {errors.furnished.message}
                    </div>
                  )}
                </div>
              )}
            />
          </FormInputWrapperStyled>
        </PredictionPageFieldsWrapperStyled>

        <PredictionFormButtonWrapperStyled>
          <Button
            className="add-button"
            onClick={onPredict}
            loading={loading}
            disabled={loading || !isFormValid}
          >
            {loading ? "Predicting..." : "Predict"}
          </Button>
        </PredictionFormButtonWrapperStyled>
      </PredictionPageWrapperStyled>
      <Footer />
      <PredictionCard
        visible={showPrediction}
        onClose={onClose}
        prediction={predictionData?.prediction}
        confidence={predictionData?.confidence}
        loading={loading}
        error={error}
      />
    </PredictionPageStyled>
  );
};

export default SmartPredictionForm;
