import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  ArrowLeftOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import userApi from "../../hooks/useUser";
import { message } from "antd";
import constants from "../../constants/constants";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const togglePasswordConfirmVisibility = () => {
    setPasswordConfirmVisible(!passwordConfirmVisible);
  };
  const onSuccess = async (data) => {
    try {
      message.success("OTP sent to your email.");
      localStorage.setItem(constants.VERIFY_TOKEN, data.verifyToken);
      navigate("/otp");
    } catch (error) {
      message.error("Lỗi đăng nhập.");
      console.log(error, "error");
    }
  };

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("* Username is required"),
    email: Yup.string()
      .email("* Invalid email format")
      .required("* Email is required"),
    password: Yup.string()
      .min(8, "* Password must be at least 8 characters")
      .required("* Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "* Passwords must match")
      .required("* Confirm password is required"),
  });

  const onSubmit = async (values) => {
    console.log("Form submitted:", values);
    // Call API
    const respone = await userApi.postRegister(values);
    if (respone.status === 200) {
      onSuccess(respone.data);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white px-7 py-5 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-3">Register</h1>
        <p className="text-sm text-center text-gray-600 mb-3">
          Welcome! Create an account to get started.
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="mb-1 ml-0.5 block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className="w-full py-2 px-3 mb-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your username"
                />
                <div className="h-2">
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="ml-0.5 text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="mb-1 ml-0.5 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full py-2 px-3 mb-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your email"
                />
                <div className="h-2">
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="ml-0.5 text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="password"
                  className="mb-1 ml-0.5 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Field
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full py-2 px-3 mb-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute top-9 right-3 flex items-center text-sm text-gray-600"
                >
                  {passwordVisible ? (
                    <EyeInvisibleOutlined className="text-lg" />
                  ) : (
                    <EyeOutlined className="text-lg" />
                  )}
                </button>
                <div className="h-2">
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="ml-0.5 text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="relative mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="mb-1 ml-0.5 block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <Field
                  type={passwordConfirmVisible ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full py-2 px-3 mb-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={togglePasswordConfirmVisibility}
                  className="absolute top-9 right-3 flex items-center text-sm text-gray-600"
                >
                  {passwordConfirmVisible ? (
                    <EyeInvisibleOutlined className="text-lg" />
                  ) : (
                    <EyeOutlined className="text-lg" />
                  )}
                </button>
                <div className="h-2">
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="ml-0.5 text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  className="w-full p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Register"}
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="mt-1 ml-1 text-blue-500 hover:text-blue-800 transition duration-200"
                >
                  <span className="underline underline-offset-2">
                    Back to Home
                  </span>
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
