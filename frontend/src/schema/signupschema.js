import * as yup from "yup";

const REQUIRED_MESSAGE = "This field is required";

export const signupFormSchema = yup.object().shape({
  name: yup.string().required(REQUIRED_MESSAGE),
  email: yup.string().required(REQUIRED_MESSAGE),
  password: yup.string().required(REQUIRED_MESSAGE),
  mobile: yup.string().required(REQUIRED_MESSAGE),
});
