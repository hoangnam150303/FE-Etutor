import { Breadcrumb } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import { useParams } from "react-router-dom";

const BlogDetail = () => {
  const { blogName } = useParams();

  return (
    <div>
      <Content className="mx-2 my-7 lg:mx-5">
        <Breadcrumb className="mb-2 lg:my-5 lg:mx-3 text-base">
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item className="text-[#f18966] font-bold">
            Blog
          </Breadcrumb.Item>
          <Breadcrumb.Item>{blogName} 👋🏻</Breadcrumb.Item>
        </Breadcrumb>
        <body className="">
          <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">ABC</h1>
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                XYZ
              </div>
              <span className="text-gray-500 text-sm">12/2/2025</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </body>
      </Content>
    </div>
  );
};

export default BlogDetail;
