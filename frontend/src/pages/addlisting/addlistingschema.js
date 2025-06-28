import * as yup from "yup";

const REQUIRED_MESSAGE = "This field is required";

export const addListingSchema = yup.object().shape({
  propertyType: yup.string().required(REQUIRED_MESSAGE),
  city: yup.string().required(REQUIRED_MESSAGE),
  adress: yup.string().required(REQUIRED_MESSAGE),
  rent: yup
    .number()
    .typeError("Rent must be a number")
    .required(REQUIRED_MESSAGE)
    .positive("Rent must be a positive number"),
  areaSizeUnit: yup.string().required(REQUIRED_MESSAGE),
  areaSizeMetric: yup.string().required(REQUIRED_MESSAGE),
  bedrooms: yup.string().required(REQUIRED_MESSAGE),
  bathrooms: yup.string().required(REQUIRED_MESSAGE),
  garages: yup.string().required(REQUIRED_MESSAGE),
  title: yup.string().required(REQUIRED_MESSAGE),
});
