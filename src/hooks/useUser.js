
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
  getAllUser: (filter,search) => {
    const url = `/getAllUser?filter=${filter}&search=${search}`;
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

  updateStatusUser: (id, data) => {


    const url = `/updateStatusUser/${id}`;
    return axiosClient.put(url, data);
  },

  getUserById: (id) => {
    const url = `/getUserById/${id}`;
    return axiosClient.get(url);
  },

  updateProfile: (data) => {
    const url = `/updateProfile`;
    return axiosClient.put(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  forgotPassword:(email)=>{
    const url = '/forgotPassword';
    return axiosClient.post(url,email);
  },

  resetPassword:(data)=>{
    const url = '/resetPassword';
    return axiosClient.put(url,data);
  },

  getAllTutor: () => {
    const url = "/getAllTutor";
    return axiosClient.get(url);
  },
  getAllStudent: () => {
    const url = "/getAllStudent";
    return axiosClient.get(url);
  },
};

export default userApi;
