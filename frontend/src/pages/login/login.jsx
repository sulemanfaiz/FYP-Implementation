import {
  FormInputWrapperStyled,
  LoginContainerStyled,
  LoginWrapperStyled,
} from "./loginstyle";

import { Input, Button, Modal } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useCallback, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginFormSchema } from "../../schema/loginschema";
import { Link, useNavigate } from "react-router-dom";
import PageBanner from "../../components/pagebanner";

const Login = () => {
  const navigate = useNavigate();
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    control,
    formState: { isValid },
    handleSubmit,
    setValue,
    setError,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    resolver: yupResolver(loginFormSchema),
  });

  const showErrorModal = (message) => {
    setErrorMessage(message);
    setErrorModalVisible(true);
  };

  const handleModalClose = () => {
    setErrorModalVisible(false);
    setErrorMessage("");
  };

  const onSubmit = useCallback(async (values) => {
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
      const { success, message, error } = result;

      if (success) {
        localStorage.setItem("token", result.jwtToken);
        navigate("/my-properties");
      } else {
        const details =
          error?.details?.[0]?.message ||
          message ||
          "Invalid login credentials.";
        showErrorModal(details);
      }
    } catch (err) {
      console.log("catch error", err);
      showErrorModal("Something went wrong. Please try again later.");
    }
  }, []);

  return (
    <>
      <LoginWrapperStyled>
        <PageBanner
          heading="Login"
          description="Login to manage your properties and view applications."
        />
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
                  <Input.Password
                    {...field}
                    placeholder="Password"
                    className="input-field"
                  />
                )}
              />
            </div>
          </FormInputWrapperStyled>

          <Button onClick={handleSubmit(onSubmit)} className="login-button">
            Login
          </Button>

          <Button onClick={() => navigate("/signup")} className="text-button">
            Don’t have an account? Signup
          </Button>
        </LoginContainerStyled>
      </LoginWrapperStyled>

      {/* Ant Design Modal */}
      <Modal
        className="custom-error-modal"
        title="Login Error"
        open={errorModalVisible}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        okText="Okay"
        centered
      >
        <p>{errorMessage}</p>
      </Modal>
    </>
  );
};

export default Login;
