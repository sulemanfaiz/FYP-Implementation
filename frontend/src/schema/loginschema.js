import * as yup from "yup";

const REQUIRED_MESSAGE = "This field is required";

export const loginFormSchema = yup.object().shape({
  email: yup.string().required(REQUIRED_MESSAGE),
  password: yup.string().required(REQUIRED_MESSAGE),
});
