import { axiosClient } from "../ApiConfig/apiConfig";
const URL_BASE = "/course";
const courseApi = {
  getAllCourse: (filter,search,typeUser) => {
    const url = `${URL_BASE}/getAllCourse?filter=${filter}&search=${search}&typeUser=${typeUser}`;
    return axiosClient.get(url);
  },

  postCreateCourse: (data) => {


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

  activeOrDeactiveCourse: (id) => {
    const url = `${URL_BASE}/activeOrDeactive/${id}`;
    return axiosClient.put(url);
  },

  getDetailCourse: (id) => {
    const url = `${URL_BASE}/getDetailCourse/${id}`;
    return axiosClient.get(url);
  },

};

export default courseApi;
