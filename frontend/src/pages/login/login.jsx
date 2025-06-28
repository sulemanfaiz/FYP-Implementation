// src/pages/login/Login.jsx
import {
  FormInputWrapperStyled,
  LeftSectionStyled,
  LoginContainerStyled,
  LoginPageStyled,
  LoginWrapperStyled,
  RightSectionStyled,
  StyledButton,
} from "./loginstyle";
import { Button, Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useCallback, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { loginFormSchema } from "../../schema/loginschema";
import { useToast } from "../../hooks/useToast"; // ⟵ NEW
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import { StyledTextButton } from "../../app.styles";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  /**  bring in the toast helpers  */
  const {
    showSuccess,
    showError,
    showLoading,
    dismiss, // dismiss single
  } = useToast();

  /**  react‑hook‑form setup  */
  const {
    control,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm({
    defaultValues: { email: "", password: "" },
    mode: "onChange",
    resolver: yupResolver(loginFormSchema),
  });

  /**  submit handler  */
  const onSubmit = useCallback(
    async (values) => {
      setIsLoading(true);

      try {
        const response = await fetch("http://localhost:8080/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const { success, message, error, jwtToken, name, email, mobile } =
          await response.json();

        if (success) {
          showSuccess("🎉 Login Successful! Welcome back!");
          localStorage.setItem("token", jwtToken);
          localStorage.setItem("user", JSON.stringify({ name, email, mobile }));

          // wait a moment so user sees the toast
          setTimeout(() => navigate("/my-properties"), 1500);
          return;
        }
      } catch (err) {
        showError("Login Failed!!. Please enter valid credentials");
      } finally {
        setIsLoading(false);
      }
    },
    [navigate, showLoading, showSuccess, showError, dismiss]
  );

  /* ---------- UI ---------- */
  return (
    <LoginPageStyled>
      {/* Left section (branding) */}
      <LeftSectionStyled>
        <div className="content">
          <h1 className="welcome-heading">Welcome to Rent A Space</h1>
          <p className="tagline">Rent Smart, Live Better.</p>
        </div>
      </LeftSectionStyled>

      {/* Right section (form) */}
      <RightSectionStyled>
        <LoginWrapperStyled>
          <h1 className="login-heading">Login</h1>
          <p className="login-description">
            Login to manage your properties and view applications.
          </p>

          <LoginContainerStyled>
            {/* Email */}
            <FormInputWrapperStyled>
              <div className="form-row">
                <div className="label">
                  Email
                  <span className="star">*</span>
                </div>
                <Controller
                  control={control}
                  name="email"
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Input
                        {...field}
                        placeholder="Enter your email"
                        className="input-field"
                        status={errors.email ? "error" : ""}
                        size="large"
                      />
                      <div className="error">{error?.message}</div>
                    </>
                  )}
                />
              </div>
            </FormInputWrapperStyled>

            {/* Password */}
            <FormInputWrapperStyled>
              <div className="form-row">
                <div className="label">
                  Password
                  <span className="star">*</span>
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

            {/* Buttons */}
            <StyledButton
              type="primary"
              onClick={handleSubmit(onSubmit)}
              disabled={!isValid || isLoading}
              loading={isLoading}
              size="large"
            >
              {isLoading ? "Logging in…" : "Login"}
            </StyledButton>

            <StyledTextButton
              onClick={() => navigate("/signup")}
              type="default"
            >
              Don’t have an account? Signup{" "}
            </StyledTextButton>
          </LoginContainerStyled>
        </LoginWrapperStyled>
      </RightSectionStyled>
    </LoginPageStyled>
  );
};

export default Login;
