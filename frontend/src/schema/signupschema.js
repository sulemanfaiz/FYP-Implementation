import * as yup from "yup";

const REQUIRED_MESSAGE = "This field is required";

export const signupFormSchema = yup.object().shape({
  name: yup.string().required(REQUIRED_MESSAGE),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required(REQUIRED_MESSAGE),
  password: yup
    .string()
    .required(REQUIRED_MESSAGE)
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase, one lowercase, one number and one special character"
    ),
  mobile: yup
    .string()
    .required(REQUIRED_MESSAGE)
    .matches(
      /^\+[1-9]\d{1,14}$/,
      "Phone number must be in international format (e.g., +923001234567)"
    )
    .test(
      "is-valid-length",
      "Phone number too short or too long",
      (value) => value && value.length >= 10 && value.length <= 15
    ),
});
