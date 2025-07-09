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
  bedrooms: yup
    .number()
    .typeError("Bedrooms must be a number")
    .required(REQUIRED_MESSAGE)
    .integer("Bedrooms must be an integer"),
  bathrooms: yup
    .number()
    .typeError("Bathrooms must be a number")
    .required(REQUIRED_MESSAGE)
    .integer("Bathrooms must be an integer"),
  garages: yup
    .number()
    .typeError("Garages must be a number")
    .required(REQUIRED_MESSAGE)
    .integer("Garages must be an integer"),
  houseNo: yup
    .number()
    .typeError("House number must be a number")
    .required(REQUIRED_MESSAGE)
    .integer("House number must be an integer"),
  title: yup.string().required(REQUIRED_MESSAGE),
  images: yup.array().of(
    yup
      .mixed()
      .test(
        "fileType",
        "Only image files are allowed (jpg, jpeg, png, webp)",
        (value) => {
          if (!value) return true;
          if (typeof value === "string") return true; // already uploaded
          if (value.originFileObj) {
            const fileType = value.originFileObj.type;
            return [
              "image/jpeg",
              "image/png",
              "image/jpg",
              "image/webp",
            ].includes(fileType);
          }
          return true;
        }
      )
  ),
});
