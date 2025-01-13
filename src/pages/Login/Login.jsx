import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import userApi from "../../hooks/useUser";
import { useGoogleLogin } from '@react-oauth/google';
import { message } from 'antd';
export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userRole = useSelector((state) => state.user.role[0]?.name);
    // const isAuth = useSelector((state) => state.authenticate.isAuth);

    const goHome = () => {
        navigate('/'); // Quay lại trang Home
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

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your email"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your password"
                        />
                    </div>

                    <div className="space-y-4">
                        <button
                            type="button"
                            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
                        >
                            Login
                        </button>

                        <button
                            type="button"
                            className="w-full p-3 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900 transition duration-200"
                            onClick={handleLogin}
                        >
                            <i className="fab fa-google mr-2"></i> Login with Google
                        </button>

                        <button
                            type="button"
                            className="w-full p-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition duration-200"
                        >
                            <i className="fab fa-apple mr-2"></i> Login with Apple
                        </button>

                        <button
                            onClick={goHome}
                            className="w-full p-3 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition duration-200"
                        >
                            Back to Home
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}