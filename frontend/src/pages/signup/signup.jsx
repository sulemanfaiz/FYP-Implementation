import {
  FormInputWrapperStyled,
  SignupContainerStyled,
  SignupFormStyled,
  SignupWrapperStyled,
} from "./signupstyle";

import { Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import { Button } from "antd";
import { useCallback } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupFormSchema } from "../../schema/signupschema";
import { Link, useNavigate } from "react-router-dom";
import PageBanner from "../../components/pagebanner";

const SignUp = () => {
  const navigate = useNavigate();

  const {
    control,
    formState: { isValid },
    handleSubmit,
    setValue,
    setError,
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
    console.log("values", values);

    try {
      const url = `http://localhost:8080/auth/signup`;
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
        navigate("/my-properties");
      } else if (error) {
        const details = error?.details[0].message;
        console.log("error", details);
      }
    } catch (err) {
      console.log("catch error", err);
    }
  }, []);

  return (
    <SignupWrapperStyled>
      <PageBanner
        heading="Signup"
        description="Access your dashboard, manage listings, and connect with potential tenants — all in one place."
      />

      <SignupContainerStyled>
        <FormInputWrapperStyled>
          <div className="form-row">
            <div className="label">Name</div>

            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Input {...field} placeholder="Name" className="input-field" />
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
                <Input {...field} placeholder="Email" className="input-field" />
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
          SignUp
        </Button>

        <Button onClick={() => navigate("/login")} className="text-button">
          Already have an account? Login
        </Button>
      </SignupContainerStyled>
    </SignupWrapperStyled>
  );
};

export default SignUp;
