import { axiosClient } from "../ApiConfig/apiConfig";
const URL_BASE = "/message";

const chatApi = {
  getAllChat: () => {
    const url = `${URL_BASE}/getAllConversation`;
    return axiosClient.get(url);
  },

  getMessage: (id) => {
    const url = `${URL_BASE}/getMessage/${id}`;
    return axiosClient.get(url);
  },

  sendMessage: (data,id) => {
    const url = `${URL_BASE}/sendMessage/${id}`;
    return axiosClient.post(url, data);
  },
};

export default chatApi;
