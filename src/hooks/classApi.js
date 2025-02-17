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
    console.log(data);

    const url = `${URL_BASE}/updateClass/${classId}`;
    return axiosClient.put(url, data);
  },
};
export default classApi;
