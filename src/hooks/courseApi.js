import { axiosClient } from "../ApiConfig/apiConfig";
const URL_BASE = "/course";
const courseApi = {
  getAllCourse: (filter) => {
    const url = `${URL_BASE}/getAllCourse?filter=${filter}`;
    return axiosClient.get(url);
  },

  postCreateCourse: (data) => {
    console.log(data);

    const url = `${URL_BASE}/createCourse`;
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  postUpdateCourse: (id, data) => {
    const url = `${URL_BASE}/updateCourse/${id}`;
    return axiosClient.put(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  postDeleteCourse: (id) => {
    const url = `${URL_BASE}/deleteCourse/${id}`;
    return axiosClient.put(url);
  },

  getDetailCourse: (id) => {
    const url = `${URL_BASE}/getDetailCourse/${id}`;
    return axiosClient.get(url);
  }
};

export default courseApi;
