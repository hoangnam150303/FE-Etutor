import { axiosClient } from "../ApiConfig/apiConfig";
const URL_BASE = "/blog";

const blogApi = {
  postCreateBlog: (data) => {    
    const url = `${URL_BASE}/createBlog/`;
    return axiosClient.post(url,data,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getAllBlogByUser: (search,filter) => {    
    const url = `${URL_BASE}/getBlogByUser/?search=${search}&filter=${filter}`;    
    return axiosClient.get(url);
  },
  
  getBlogById:(id)=>{
    const url = `${URL_BASE}/getBlogById/${id}`;    
    return axiosClient.get(url);
  }
};

export default blogApi;
