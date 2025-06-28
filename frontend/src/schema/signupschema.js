import * as yup from "yup";

const REQUIRED_MESSAGE = "This field is required";

export const signupFormSchema = yup.object().shape({
  name: yup.string().required(REQUIRED_MESSAGE),
  email: yup
    .string()
    .required(REQUIRED_MESSAGE)
    .matches(
      /^[^\s@]+@[^\s@]+\.(com)$/,
      "Email must be a valid format and end with .com"
    ),
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
      /^92\d{10}$/,
      "Enter a valid Pakistani mobile number in international format (e.g., 923001234567)"
    )
    .test(
      "is-valid-length",
      "Phone number must be 12 digits",
      (value) => value && value.length === 12
    ),
});
