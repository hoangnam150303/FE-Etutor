import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import userApi from "../../hooks/useUser";
import constants from "../../constants/constants";

export default function OTPPage() {
    const [otpError, setOtpError] = useState("");
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        otp: Yup.string()
            .matches(/^[0-9]{5}$/, "OTP must be 5 digits.")
            .required("Please enter OTP."),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
            const verifyToken = localStorage.getItem('verify_token');
            const payload = { ...values, verifyToken };
            const respone = await userApi.postVerify(payload);
            if (respone.status === 200) {
                localStorage.removeItem('verify_token');
                navigate("/login");
            }
            else{
                setOtpError("OTP is incorrect.");
            }
        } catch (error) {
            
        }
        setSubmitting(false);
    };

    const handleInputChange = (value, setFieldValue) => {
        const deletedValue = value.replace(/[^0-9]/g, "");
        setFieldValue("otp", deletedValue);

        if (otpError) {
            setOtpError("");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h1 className="text-2xl font-bold text-center mb-4">OTP Confirmation</h1>
                <p className="text-gray-600 text-center mb-4">
                    Please enter the 5-digit OTP code sent to your email.
                </p>
                <Formik
                    initialValues={{ otp: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, setFieldValue }) => (
                        <Form>
                            <div className="mb-4">
                                <Field
                                    type="text"
                                    name="otp"
                                    maxLength={5}
                                    placeholder="Enter OTP code"
                                    className="w-full px-4 py-2 mb-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                    onChange={(e) => handleInputChange(e.target.value, setFieldValue)}
                                />
                                <div className="h-0.5">
                                    <ErrorMessage
                                        name="otp"
                                        component="div"
                                        className="text-red-500 text-sm ml-0.5"
                                    />
                                    {otpError && (
                                        <div className="text-red-500 text-sm ml-0.5">{otpError}</div>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end px-0.5">
                                <button
                                    type="button"
                                    className="text-blue-500 hover:underline transition duration-500"
                                    onClick={() => alert("Yêu cầu gửi lại OTP!")}
                                >
                                    Resend OTP
                                </button>
                            </div>
                            <button
                                type="submit"
                                className={`w-full my-3 p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                disabled={isSubmitting}
                            >
                                Confirm
                            </button>
                            <button
                                onClick={() => navigate("/register")}
                                className="ml-1 text-blue-500 hover:text-blue-800 transition duration-300"
                            >
                                <span className="underline underline-offset-2">Back to Register Page</span>
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}