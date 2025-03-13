import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-5/6 lg:w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
                    Forgot Password
                </h2>
                <Formik
                    initialValues={{ email: "" }}
                    validationSchema={Yup.object({
                        email: Yup.string()
                            .email("Invalid email address")
                            .required("Email is required"),
                    })}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        alert("A password reset link has been sent to " + values.email);
                        resetForm();
                        setSubmitting(false);
                        navigate("/reset-password")
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mb-4 relative">
                                <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                                    Email Address
                                </label>
                                <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                                    <MailOutlined className="text-gray-500 text-lg mr-2" />
                                    <Field
                                        type="email"
                                        name="email"
                                        className="w-full outline-none"
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <ErrorMessage name="email" component="p" className="text-sm text-red-500 mt-1" />
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
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Back to Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
