import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { LockOutlined } from "@ant-design/icons";
import userApi from "../../hooks/useUser";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const passwWordToken = localStorage.getItem("password_token");
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Reset Password
        </h2>
        <Formik
          initialValues={{
            newPassword: "",
            confirmPassword: "",
            OTP: "",
            passWordToken: passwWordToken,
          }}
          validationSchema={Yup.object({
            newPassword: Yup.string()
              .min(6, "Password must be at least 6 characters")
              .required("New password is required"),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
              .required("Confirm password is required"),
            OTP: Yup.number()
              .oneOf([Yup.ref("OTP"), null, "OTP must be number"])
              .required("Confirm OTP is required"),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const response = await userApi.resetPassword(values);
            console.log(response);

            if (response.status === 200) {
              message.success("Password reset successfully");
              navigate("/login");
              localStorage.removeItem("password_token");
              resetForm();
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4 relative">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="newPassword"
                >
                  New Password
                </label>
                <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                  <LockOutlined className="text-gray-500 text-lg mr-2" />
                  <Field
                    type="password"
                    name="newPassword"
                    className="w-full outline-none"
                    placeholder="Enter new password"
                  />
                </div>
                <ErrorMessage
                  name="newPassword"
                  component="p"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              <div className="mb-4 relative">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                  <LockOutlined className="text-gray-500 text-lg mr-2" />
                  <Field
                    type="password"
                    name="confirmPassword"
                    className="w-full outline-none"
                    placeholder="Confirm new password"
                  />
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="p"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              <div className="mb-4 relative">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="OTP"
                >
                  OTP
                </label>
                <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                  <LockOutlined className="text-gray-500 text-lg mr-2" />
                  <Field
                    type="password"
                    name="OTP"
                    className="w-full outline-none"
                    placeholder="Input OTP"
                  />
                </div>
                <ErrorMessage
                  name="OTP"
                  component="p"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Reset Password
              </button>
            </Form>
          )}
        </Formik>
        <p className="mt-4 text-center text-gray-600">
          <a href="/login" className="text-blue-500 hover:underline">
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
