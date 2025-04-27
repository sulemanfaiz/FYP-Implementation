import {
  LeftSectionStyled,
  RightSectionStyled,
  SignupPageStyled,
  SignupContainerStyled,
  FormInputWrapperStyled,
  SignupWrapperStyled,
} from "./signupstyle";

import { Input, Button } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useCallback } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupFormSchema } from "../../schema/signupschema";
import { useNavigate } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
import styled from "styled-components";

const HouseIcon = styled(FaHouse)`
  color: white;
  font-size: 48px;
  margin-bottom: 20px;
`;

const SignUp = () => {
  const navigate = useNavigate();

  const {
    control,
    formState: { isValid },
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

  const onSubmit = useCallback(async (values) => {
    try {
      const response = await fetch(`http://localhost:8080/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      const { success } = result;
      if (success) {
        localStorage.setItem("token", result.jwtToken);
        navigate("/my-properties");
      }
    } catch (err) {
      console.log("Error", err);
    }
  }, []);

  return (
    <SignupPageStyled>
      {/* Left Section */}
      <LeftSectionStyled>
        <img src="/Kiraya pa logo.png" alt="Logo" className="logo" />
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

            <FormInputWrapperStyled>
              <div className="form-row">
                <div className="label">Password</div>
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Password"
                      className="input-field"
                      type="password"
                    />
                  )}
                />
              </div>
            </FormInputWrapperStyled>

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

            <Button onClick={handleSubmit(onSubmit)} className="signup-button">
              Sign Up
            </Button>

            <Button onClick={() => navigate("/login")} className="text-button">
              Already have an account? Login
            </Button>
          </SignupContainerStyled>
        </SignupWrapperStyled>
      </RightSectionStyled>
    </SignupPageStyled>
  );
};

export default SignUp;
