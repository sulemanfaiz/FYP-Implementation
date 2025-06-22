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
import {
  areaSizeOptions,
  bathroomOptions,
  bedroomOptions,
  cityOptions,
  propertyOptions,
} from "../addlisting/addlisting.config";
import { Button, Input, Select, Switch } from "antd";
import ToggleSelect from "../../components/toggleselect";
import PredictionCard from "../predictioncard";
import { useState } from "react";

const SmartPredictionForm = () => {
  const [showPrediction, setShowPrediction] = useState(false);

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
      city: "",
      propertyType: "",
      bedrooms: "",
      bathrooms: "",
      furnished: "",
      areaSizeUnit: "",
      areaSizeMetric: "",
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

  const onOptionChange = (name, option) => {
    setValue(name, option);
  };

  const onChange = (checked) => {
    setValue("furnished", checked);
  };

  const onPredict = (checked) => {
    setShowPrediction(true);
  };

  const onClose = () => {
    setShowPrediction(false); // Close the modal after submission
  };

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
            <div className="ques">What kind of property do you have?</div>

            <ToggleSelect
              options={propertyOptions}
              propsOnClick={(value) => onOptionChange("propertyType", value)}
              selectedValue={propertyTypeWatched}
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
            <div className="ques">
              Is it Furnished Property?
              <Controller
                control={control}
                name="furnished"
                render={({ field }) => <Switch onChange={onChange} />}
              />
            </div>
          </FormInputWrapperStyled>
        </PredictionPageFieldsWrapperStyled>
        <PredictionFormButtonWrapperStyled>
          <Button className="add-button" onClick={onPredict}>
            Predict
          </Button>
        </PredictionFormButtonWrapperStyled>
      </PredictionPageWrapperStyled>

      <Footer />

      <PredictionCard visible={showPrediction} onClose={onClose} />
    </PredictionPageStyled>
  );
};

export default SmartPredictionForm;
