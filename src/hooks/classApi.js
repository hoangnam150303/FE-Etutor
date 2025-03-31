import { axiosClient } from "../ApiConfig/apiConfig";
const URL_BASE = "/class";
const classApi = {
  getAllClass: (filter, search) => {
    const url = `${URL_BASE}/getAllClass?filter=${filter}&search=${search}`;
    return axiosClient.get(url);
  },
  postAcceptClass: (classId, tutorId) => {    
    const url = `${URL_BASE}/acceptClass/${classId}/${tutorId}`;
    return axiosClient.put(url);
  },
  updateClass: (classId, data) => {
    const url = `${URL_BASE}/updateClass/${classId}`;
    return axiosClient.put(url, data);
  },
  getClassByTutor: () => {
    const url = `${URL_BASE}/getClassByTutor`;
    return axiosClient.get(url);
  },
  getClassByStudent: () => {
    const url = `${URL_BASE}/getClassByStudent`;
    return axiosClient.get(url);
  },
  getClassById: (classId) => {
    const url = `${URL_BASE}/getClassById/${classId}`;
    return axiosClient.get(url);
  },

  postFile: (classId, value) => {
    const url = `${URL_BASE}/uploadFile/${classId}`;
    return axiosClient.put(url, value, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  finishClass: (classId) => {
    const url = `${URL_BASE}/finishClass/${classId}`;
    return axiosClient.put(url);
  },
  postCreateClass: (courseId) => {
    const url = `${URL_BASE}/registClass/${courseId}`;
    return axiosClient.post(url);
  },
};
export default classApi;
