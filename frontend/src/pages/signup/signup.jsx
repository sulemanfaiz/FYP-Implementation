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
          showSuccess("Signup successful! Welcome to Kiraya Pa");

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
        <img src="/KirayaPeLogo.png" alt="Logo" className="logo" />
        <h1>Join Kiraya Pa</h1>
        <p>Your property, your terms — rent effortlessly!</p>
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
                <div className="label">Name</div>
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Name"
                      className="input-field"
                    />
                  )}
                />
              </div>
            </FormInputWrapperStyled>

            {/* Email Field */}
            <FormInputWrapperStyled>
              <div className="form-row">
                <div className="label">Email</div>
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Email"
                      className="input-field"
                    />
                  )}
                />
              </div>
            </FormInputWrapperStyled>

            {/* Password Field */}
            <FormInputWrapperStyled>
              <div className="form-row">
                <div className="label">Password</div>
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <Input.Password
                      {...field}
                      placeholder="Password"
                      className="input-field"
                      // 👇 custom icons ↴
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  )}
                />
              </div>
            </FormInputWrapperStyled>

            {/* Mobile Field */}
            <FormInputWrapperStyled>
              <div className="form-row">
                <div className="label">Mobile</div>
                <Controller
                  control={control}
                  name="mobile"
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Mobile"
                      className="input-field"
                    />
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
            <Button
              onClick={() => navigate("/login")}
              className="text-button"
              type="default"
            >
              Already have an account? Login
            </Button>
          </SignupContainerStyled>
        </SignupWrapperStyled>
      </RightSectionStyled>
    </SignupPageStyled>
  );
};

export default SignUp;
