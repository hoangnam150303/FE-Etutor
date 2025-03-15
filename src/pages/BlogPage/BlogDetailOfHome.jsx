import { Breadcrumb } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LikeOutlined } from "@ant-design/icons";
import blogApi from "../../hooks/blogApi";
import { useDispatch, useSelector } from "react-redux";
import { getUserRequest } from "../../reducers/user";
const BlogDetailOfHome = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [detailBlog, setDetailBlog] = useState(null);
  const userId = useSelector((state) => state.user.id);
  const [isLike, setIsLike] = useState(false);
  const [otherBlogs, setOtherBlogs] = useState([]);
  const fetchDetailBlog = async () => {
    try {
      const response = await blogApi.getBlogById(id);
      await dispatch(getUserRequest());
      setDetailBlog(response.data.blog);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOtherCouse = async () => {
    try {
      const response = await blogApi.getAllBlog("", "");
      setOtherBlogs(response.data.blogs);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDetailBlog();
    if (detailBlog) {
      detailBlog.userLikeId.map((item) => {
        if (item === userId) {
          setIsLike(true);
        }
      });
    }
  }, [id, detailBlog, isLike]);
  useEffect(() => {
    fetchOtherCouse();
  }, []);
  const handleDetailClick = () => {
    navigate(`/blog/1`);
  };
  const handleLike = async () => {
    try {
      const response = await blogApi.likePost(id);
      if (response.status === 200) {
        setIsLike(!isLike);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      <div className="blog-header">
        <div className="relative">
          <img
            src={detailBlog?.image}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative bg-sky-300 bg-opacity-75 py-4">
            <div className="container mx-auto">
              <p className="text-white text-sm text-center my-4">
                Home<span> / </span>{" "}
                <span className="text-white">Blog Detail</span>
              </p>
              <div className="title-blog w-3/4 mx-auto mb-5">
                <h1 className="text-white text-3xl text-center">
                  Title of Blog
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-screen-xl mx-auto">
          <div className="blog-body flex items-start m-5 gap-5">
            <div className="blog-body__content w-2/3 px-10 py-5">
              <div className="author_blog mx-1">
                <p className="text-slate-500 text-sm">
                  Author<span> - </span>{" "}
                  <span className="text-white bg-slate-300 px-2 py-1 rounded-xl">
                    {detailBlog?.author.username}
                  </span>
                </p>
              </div>
              <div className="line h-0.5 w-full bg-slate-100 my-2.5"></div>
              <h2 className="text-2xl font-semibold">{detailBlog?.title}</h2>
              <div className="img_blog">
                <img
                  src={detailBlog?.image}
                  alt=""
                  className="rounded-md my-2"
                />
              </div>
              <h2>{detailBlog?.content}</h2>
              <div className="flex justify-start p-7 cursor-pointer space-x-2">
                <LikeOutlined
                  onClick={handleLike}
                  className={isLike ? "text-blue-500" : "text-gray-500"}
                />
                <span>{detailBlog?.like}</span>
              </div>
            </div>

            <div className="blog-other w-1/3 border border-gray-100 shadow-lg rounded-xl px-4 py-2">
              <h1 className="text-xl font-semibold">Blog other</h1>
              <div className="line h-0.5 w-full bg-slate-100 my-2 mx-auto"></div>
              <div className="list-blog">
                {otherBlogs
                  .filter((item) => item._id !== id)
                  .map((blog, index) => (
                    <div
                      className="bg-white shadow-md rounded-lg p-3 my-4 flex items-start"
                      key={index}
                    >
                      <div className="">
                        <div className="mb-2">
                          <h2 className="text-xl font-bold mb-1">
                            {blog.title}
                          </h2>
                          <p className="text-gray-700">{blog.content}</p>
                        </div>
                        <div className="flex justify-end">
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                            onClick={() => handleDetailClick()}
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailOfHome;
