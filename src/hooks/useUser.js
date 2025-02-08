import { axiosClient } from "../ApiConfig/apiConfig";

const userApi = {
  //   postLogin: (account) => {
  //     const url = LOGIN_API_ENDPOINT;
  //     return axiosClient.post(url, account);
  //   },
  //   verifyUser: (account) => {
  //     const url = LOGIN_API_ENDPOINT + '/verify';
  //     return axiosClient.post(url, account);
  //   },
  postLoginWithGoogle: (accessToken) => {
    const url = "/loginGoogle";
    return axiosClient.post(url, accessToken);
  },

  postLoginLocal: (account) => {
    const url = "/login";
    return axiosClient.post(url, account);
  },
  postRegister: (account) => {
    const url = "/register";
    return axiosClient.post(url, account);
  },
  postVerify: (data) => {
    const url = "/approveAccount";
    return axiosClient.post(url, data);
  },

  getUser: () => {
    const url = "/getUser";
    return axiosClient.get(url);
  },
  getAllUser: (filter) => {
    const url = `/getAllUser?filter=${filter}`;
    console.log(url);

    return axiosClient.get(url);
  },

  postCreateTutor: (data) => {
    const url = "/createTutor";
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  //   postLoginWithFacebook: (accessToken) => {
  //     const url = LOGIN_API_ENDPOINT + '/fb';
  //     return axiosClient.post(url, accessToken);
  //   },
  //   getAuth: () => {
  //     const url = LOGIN_API_ENDPOINT + '/auth';
  //       return axiosClient.get(url);
  //   },

  //   postRefreshToken: (refreshToken) => {
  //     const url = LOGIN_API_ENDPOINT + '/refresh_token';
  //     return axiosClient.post(url, refreshToken);
  //   },

  //   postLogout: () => {
  //     const url = LOGIN_API_ENDPOINT + '/logout';
  //       return axiosClient.post(url, {
  //         token: localStorage.getItem(constants.ACCESS_TOKEN_KEY),
  //       });
  //   },
};

export default userApi;
