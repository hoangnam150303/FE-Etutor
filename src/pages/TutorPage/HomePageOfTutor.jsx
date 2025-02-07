import { Breadcrumb } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";

const HomePageOfTutor = () => {
    return (
        <div className="">
            <Content className='mx-2 my-7 lg:mx-5'>
                <Breadcrumb className='mb-2 lg:my-5 lg:mx-3 text-base '>
                    <Breadcrumb.Item>Tutor</Breadcrumb.Item>
                    <Breadcrumb.Item className='text-[#f18966] font-bold'>Home 👋🏻</Breadcrumb.Item>
                </Breadcrumb>
                <div className="flex justify-center">
                    <h1>Welcome!!</h1>
                </div>
            </Content>
        </div>
    );
};

export default HomePageOfTutor;