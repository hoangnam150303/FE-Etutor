import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import userApi from "../../hooks/useUser";
import { useGoogleLogin } from '@react-oauth/google';
import { message } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined, GoogleOutlined } from '@ant-design/icons';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const userRole = useSelector((state) => state.user.role[0]?.name);
  // const isAuth = useSelector((state) => state.authenticate.isAuth);

  const goHome = () => {
    navigate('/'); // Quay lại trang Home
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Xử lý khi đăng nhập thành công
  const onLoginSuccess = async (data) => {
    try {
      message.success('Đăng nhập thành công');
      //   localStorage.setItem(constants.REFRESH_TOKEN, data.refreshToken);
      //   localStorage.setItem(constants.ACCESS_TOKEN_KEY, data.token);

      // Đánh dấu là đã xác thực
      //   dispatch(setIsAuth(true));
    } catch (error) {
      message.error('Lỗi đăng nhập.');
      console.log(error, 'error');
    }
  };

  // Xử lý điều hướng khi `userRole` thay đổi và `isAuth` là true
  //   useEffect(() => {
  //     // if (isAuth && userRole) {
  //     //   if (userRole === 'Admin') {
  //     //     window.location.href = '/admin';
  //     //   } else if (userRole === 'Customer') {
  //     //     window.location.href = '/';
  //     //   }
  //     // }
  //   }, [isAuth, userRole]);

  const handleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await userApi.postLoginWithGoogle({
          access_token: tokenResponse.access_token,
        });

        const { status, data } = response;

        if (status === 200) {
          await onLoginSuccess(data);
        }
      } catch (error) {
        if (error.response) {
          message.error(error.response.data.message);
        } else {
          message.error('Đăng nhập thất bại, thử lại');
        }
      }
    },
    onError: (error) => {
      message.error('Đăng nhập thất bại. Vui lòng thử lại.');
      console.error(error);
    },
  });

  // Định nghĩa validation schema với Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('* Invalid email format')
      .required('* Email is required'),
    password: Yup.string()
      .min(8, '* Password must be at least 8 characters')
      .required('* Password is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      // Xử lý đăng nhập (fake API)
      console.log('Form values:', values);
      message.success('Login successful!');
    } catch (error) {
      message.error('Login failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-3">Login</h2>
        <p className='text-sm text-center text-gray-600 mb-3'>Open the door to a world of opportunities with Etutor. Sign in to your account.</p>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="email" className="ml-0.5 mb-1.5 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

              <div className="relative mb-6">
                <label htmlFor="password" className="ml-0.5 mb-1.5 block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Field
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute top-1/2 right-3 flex items-center text-sm text-gray-600"
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

              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </button>

                <button
                  type="button"
                  className="w-full p-3 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900 transition duration-200"
                  onClick={handleLogin}
                >
                  <GoogleOutlined /> Login with Google
                </button>

                <button
                  onClick={goHome}
                  className="mt-1 ml-1 text-blue-500 hover:text-blue-800 transition duration-200"
                >
                  <span className="underline underline-offset-2">Back to Home</span>
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}