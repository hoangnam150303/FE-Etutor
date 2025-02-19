import { axiosClient } from "../ApiConfig/apiConfig";
const URL_BASE = "/call";

const callApi = {
  makePhoneCall: (id) => {    
    const url = `${URL_BASE}/makeCall/${id}`;
    return axiosClient.post(url);
  },

  acceptCall:(id) => {
    const url = `${URL_BASE}/acceptCall/${id}`;
    return axiosClient.put(url);
  }
};

export default callApi;
