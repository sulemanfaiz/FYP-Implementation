import {
  FormInputWrapperStyled,
  LeftSectionStyled,
  RightSectionStyled,
  SignupContainerStyled,
  SignupFormStyled,
  SignupPageStyled,
  SignupWrapperStyled,
} from "./signupstyle";

import { Input, Button } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useCallback } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupFormSchema } from "../../schema/signupschema";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast"; // ✅ Import hook
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import { StyledTextButton } from "../../app.styles";

const SignUp = () => {
  const navigate = useNavigate();
  const { showSuccess, showError, showLoading } = useToast(); // ✅ Use methods

  const {
    control,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      mobile: "",
    },
    mode: "onChange",
    resolver: yupResolver(signupFormSchema),
  });

  const onSubmit = useCallback(
    async (values) => {
      localStorage.removeItem("token");

      try {
        const response = await fetch("http://localhost:8080/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const result = await response.json();

        const { success, message, error, jwtToken, name, email } = result;

        if (success) {
          showSuccess("Signup successful! Welcome to Rent A Space");

          // ⬇️ SAVE token AND name + email in localStorage
          localStorage.setItem("token", jwtToken);
          localStorage.setItem(
            "user",
            JSON.stringify({ name: values.name, email: values.email })
          );

          // Redirect after delay
          setTimeout(() => navigate("/my-properties"), 1500);
        } else {
          showError(message);
        }
      } catch (err) {
        showError(
          "An error occurred while creating your account. Please try again."
        );
      }
    },
    [navigate, showSuccess, showError, showLoading]
  );

  return (
    <SignupPageStyled>
      {/* Left Section */}
      <LeftSectionStyled>
        <h1>Join Rent A Space</h1>
        <p>Your Property, Your Terms — Rent Effortlessly!</p>
      </LeftSectionStyled>

      {/* Right Section */}
      <RightSectionStyled>
        <SignupWrapperStyled>
          <h1 className="signup-heading">Sign Up</h1>
          <p className="signup-description">
            Create your account and manage your rental listings with ease.
          </p>

          <SignupContainerStyled>
            {/* Name Field */}
            <FormInputWrapperStyled>
              <div className="form-row">
                <div className="label">
                  Name <span className="star">*</span>
                </div>
                <Controller
                  control={control}
                  name="name"
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Input
                        {...field}
                        placeholder="User"
                        className="input-field"
                      />
                      <div className="error">{error?.message}</div>
                    </>
                  )}
                />
              </div>
            </FormInputWrapperStyled>

            {/* Email Field */}
            <FormInputWrapperStyled>
              <div className="form-row">
                <div className="label">
                  Email <span className="star">*</span>
                </div>
                <Controller
                  control={control}
                  name="email"
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Input
                        {...field}
                        placeholder="user@domain.com"
                        className="input-field"
                      />
                      <div className="error">{error?.message}</div>
                    </>
                  )}
                />
              </div>
            </FormInputWrapperStyled>

            {/* Password Field */}
            <FormInputWrapperStyled>
              <div className="form-row">
                <div className="text-wrapper">
                  <div className="label">
                    Password <span className="star">*</span>
                  </div>
                  <div className="desc">
                    Password must contain at least one uppercase, one lowercase,
                    one number and one special character
                  </div>
                </div>

                <Controller
                  control={control}
                  name="password"
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Input.Password
                        {...field}
                        placeholder="Password"
                        className="input-field"
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                      />
                      <div className="error">{error?.message}</div>
                    </>
                  )}
                />
              </div>
            </FormInputWrapperStyled>

            {/* Mobile Field */}
            <FormInputWrapperStyled>
              <div className="form-row">
                <div className="text-wrapper">
                  <div className="label">
                    Mobile <span className="star">*</span>
                  </div>
                  <div className="desc">
                    Enter a valid Pakistani mobile number in international
                    format (e.g., 923001234567)
                  </div>
                </div>

                <Controller
                  control={control}
                  name="mobile"
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Input
                        {...field}
                        className="input-field"
                        placeholder="Mobile Number"
                      />
                      <div className="error">{error?.message}</div>
                    </>
                  )}
                />
              </div>
            </FormInputWrapperStyled>

            {/* Signup Button */}
            <Button
              onClick={handleSubmit(onSubmit)}
              className="signup-button"
              type="primary"
              disabled={!isValid}
            >
              Sign Up
            </Button>

            {/* Navigate to Login */}
            <StyledTextButton
              onClick={() => navigate("/login")}
              className="text-button"
              type="default"
            >
              Already have an account? Login
            </StyledTextButton>
          </SignupContainerStyled>
        </SignupWrapperStyled>
      </RightSectionStyled>
    </SignupPageStyled>
  );
};

export default SignUp;
