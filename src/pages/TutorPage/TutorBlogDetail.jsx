import { Breadcrumb } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import blogApi from "../../hooks/blogApi";

const TutorBlogDetail = () => {
  const { id } = useParams();
  const [blogSelected, setBlogSelected] = useState({});

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const response = await blogApi.getBlogById(id);
        setBlogSelected(response.data.blog);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogDetail();
  }, []);

  return (
    <div>
      <Content className="mx-2 my-7 lg:mx-5">
        <Breadcrumb className="mb-2 lg:my-5 lg:mx-3 text-base">
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item className="text-[#f18966] font-bold">
            Blog
          </Breadcrumb.Item>
          <Breadcrumb.Item> {blogSelected.title} 👋🏻</Breadcrumb.Item>
        </Breadcrumb>
        <body className="">
          <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {blogSelected.title}
            </h1>
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Class name: {blogSelected.classId?.name}
              </div>
              <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Course name: {blogSelected.courseId?.name}
              </div>
              <span className="text-gray-500 text-sm">
                {blogSelected?.createdAt}
              </span>
            </div>
            <div>
              <img src={blogSelected?.image} alt="Image of blog" />
            </div>
            <p className="text-gray-700 leading-relaxed">
              {blogSelected?.content}
            </p>
            <div>
              {blogSelected.file ? (
                <a
                  className="text-blue-500 font-semibold"
                  href={blogSelected?.file}
                >
                  Click here to see file
                </a>
              ) : null}
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-10">
                Update
              </button>
            </div>
          </div>
        </body>
      </Content>
    </div>
  );
};

export default TutorBlogDetail;
