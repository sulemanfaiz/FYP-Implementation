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
import { Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useCallback, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { loginFormSchema } from "../../schema/loginschema";
import { useToast } from "../../hooks/useToast"; // ⟵ NEW
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";

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
      const loadingId = showLoading("Logging you in…");

      try {
        const response = await fetch("http://localhost:8080/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        dismiss(loadingId); // stop spinner

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const { success, message, error, jwtToken, name, email } =
          await response.json();

        if (success) {
          showSuccess("🎉 Login Successful! Welcome back!");
          localStorage.setItem("token", jwtToken);
          localStorage.setItem("user", JSON.stringify({ name, email }));

          // wait a moment so user sees the toast
          setTimeout(() => navigate("/my-properties"), 1500);
          return;
        }

        // server‑side validation errors
        if (error?.details?.length) {
          showError(`❌ Login Failed: ${error.details[0].message}`);
        } else {
          showError(`❌ Login Failed: ${message ?? "Invalid credentials."}`);
        }
      } catch (err) {
        dismiss(loadingId); // just in case
        // Map common errors → friendly copy
        const friendly = {
          ["HTTP 401"]: "🔐 Invalid credentials. Please try again.",
          ["HTTP 404"]: "🔍 Service not found. Contact support.",
          ["HTTP 429"]: "⏰ Too many attempts. Please wait and retry.",
          ["HTTP 500"]: "⚠️ Server error. Try again later.",
          TypeError: "🌐 Network error. Check your connection.",
        };

        const key = err.name === "TypeError" ? "TypeError" : err.message;
        showError(friendly[key] ?? "🔌 Unable to connect. Try again later.");
        console.error("Login error:", err);
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
          <img src="/Kiraya pa logo.png" alt="Logo" className="logo" />
          <h1 className="welcome-heading">Welcome to Kiraya Pa</h1>
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
                <div className="label">Email</div>
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter your email"
                      className="input-field"
                      status={errors.email ? "error" : ""}
                      size="large"
                    />
                  )}
                />
                {errors.email && (
                  <span className="error-message">{errors.email.message}</span>
                )}
              </div>
            </FormInputWrapperStyled>

            {/* Password */}
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
                {errors.password && (
                  <span className="error-message">
                    {errors.password.message}
                  </span>
                )}
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

            <StyledButton
              type="default"
              onClick={() => navigate("/signup")}
              disabled={isLoading}
              size="large"
            >
              Don’t have an account? Signup
            </StyledButton>
          </LoginContainerStyled>
        </LoginWrapperStyled>
      </RightSectionStyled>
    </LoginPageStyled>
  );
};

export default Login;
