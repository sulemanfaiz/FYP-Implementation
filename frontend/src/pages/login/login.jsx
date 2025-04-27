import {
  FormInputWrapperStyled,
  LoginContainerStyled,
  LoginWrapperStyled,
  LoginPageStyled,
  LeftSectionStyled,
  RightSectionStyled,
  StyledButton,
} from "./loginstyle";

import { Input, Button } from "antd"; // Same Ant Design ka Button
import { useForm, Controller } from "react-hook-form";
import { useCallback } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginFormSchema } from "../../schema/loginschema";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    resolver: yupResolver(loginFormSchema),
  });

  const onSubmit = useCallback(
    async (values) => {
      try {
        const url = `http://localhost:8080/auth/login`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const result = await response.json();

        const { success, error } = result;
        if (success) {
          localStorage.setItem("token", result.jwtToken);
          navigate("/my-properties");
        } else if (error) {
          console.log(error?.details[0]?.message);
        }
      } catch (err) {
        console.log("catch error", err);
      }
    },
    [navigate]
  );

  return (
    <LoginPageStyled>
      {/* Left Section */}
      <LeftSectionStyled>
        <div className="content">
          <img src="/Kiraya pa logo.png" alt="Logo" className="logo" />
          <h1 className="welcome-heading">Welcome to Kiraya Pa</h1>
          <p className="tagline">Rent Smart, Live Better.</p>
        </div>
      </LeftSectionStyled>

      {/* Right Section */}
      <RightSectionStyled>
        <LoginWrapperStyled>
          <h1 className="login-heading">Login</h1>
          <p className="login-description">
            Login to manage your properties and view applications.
          </p>
          <LoginContainerStyled>
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

            {/* Ant Design ka normal Button */}
            <StyledButton
              type="primary"
              onClick={handleSubmit(onSubmit)}
              disabled={!isValid}
            >
              Login
            </StyledButton>

            {/* Styled Text Button for Signup */}
            <StyledButton type="default" onClick={() => navigate("/signup")}>
              Don't have an account? Signup
            </StyledButton>
          </LoginContainerStyled>
        </LoginWrapperStyled>
      </RightSectionStyled>
    </LoginPageStyled>
  );
};

export default Login;
