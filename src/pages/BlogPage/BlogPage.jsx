import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import blogApi from "../../hooks/blogApi";

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const fetchBlog = async () => {
    try {
      const response = await blogApi.getAllBlog(searchTerm, filter);
      console.log(response.data.blogs);
      setBlogs(response.data.blogs);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBlog();
  }, [searchTerm, filter]);
  const handleDetailClick = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <div className="my-5">
      <div className="bg container mx-auto">
        <div className="mx-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {blogs.map((blog, index) => (
              <div
                className="bg-white shadow-md rounded-lg p-4 m-4"
                key={blog._id}
              >
                <img
                  className="w-full h-48 object-cover rounded-t-lg"
                  src={blog.image}
                  alt={blog.title}
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                  <p className="text-gray-700">{blog.content}</p>
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDetailClick(blog._id)}
                  >
                    View Detail
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg bg-slate-100"></div>
    </div>
  );
};

export default BlogPage;
