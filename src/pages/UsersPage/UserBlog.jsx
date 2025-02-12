import { Breadcrumb, Select, Input } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";

const { Search } = Input;

let blogs = [
    {
        title: "Hướng dẫn bắt đầu với React.js",
        description: "Bài viết này sẽ hướng dẫn bạn từng bước để bắt đầu làm việc với React.js.",
        author: "John Doe"
    },
    {
        title: "Cách nhanh chóng học Angular từ cơ bản đến nâng cao",
        description: "Những điều cơ bản bạn cần biết và những thủ thuật nâng cao để trở thành một lập trình viên Angular giỏi.",
        author: "Jane Smith"
    },
    {
        title: "Làm thế nào để tối ưu hóa website của bạn cho tốc độ tải nhanh",
        description: "Bài viết này sẽ cung cấp những chiến lược và công cụ để tối ưu hóa hiệu suất tải trang web của bạn.",
        author: "David Johnson"
    },
    {
        title: "10 framework JavaScript phổ biến bạn nên biết",
        description: "Tổng quan về các framework JavaScript phổ biến nhất hiện nay và lý do tại sao bạn nên sử dụng chúng.",
        author: "Emily Brown"
    },
    {
        title: "Tại sao TypeScript là một lựa chọn tốt cho dự án của bạn",
        description: "Lý do và lợi ích của việc sử dụng TypeScript trong các dự án phần mềm của bạn.",
        author: "Michael Clark"
    },
    {
        title: "Các thủ thuật để trở thành một lập trình viên front-end xuất sắc",
        description: "Những bí quyết và kinh nghiệm để phát triển kỹ năng lập trình front-end của bạn.",
        author: "Sophia Rodriguez"
    },
    {
        title: "Làm thế nào để thiết kế giao diện người dùng hiệu quả",
        description: "Những nguyên tắc thiết kế UI/UX để tối ưu hóa trải nghiệm người dùng.",
        author: "Daniel Lee"
    },
    {
        title: "Tại sao Agile là phương pháp phát triển phần mềm phổ biến nhất",
        description: "Lợi ích của việc áp dụng phương pháp Agile trong phát triển phần mềm và các thực tiễn hiệu quả.",
        author: "Jessica Wang"
    },
    {
        title: "Cách sử dụng Node.js để xây dựng các ứng dụng web mạnh mẽ",
        description: "Hướng dẫn từng bước để bắt đầu với Node.js và xây dựng các ứng dụng web phức tạp.",
        author: "Andrew Miller"
    },
    {
        title: "Làm thế nào để bảo mật ứng dụng web của bạn chống lại các cuộc tấn công",
        description: "Các chiến lược và công cụ để bảo vệ ứng dụng web của bạn khỏi các mối đe dọa an ninh mạng.",
        author: "Alexandra Martinez"
    }
];

const UserBlog = () => {

    const onSearch = (value, _e, info) => console.log(info?.source, value);

    const handleChangeFilter = (value) => {
        console.log(`selected ${value}`);
    };

    return (
        <div className="">
            <Content className='mx-2 my-7 lg:mx-5'>
                <Breadcrumb className="mb-2 lg:my-5 lg:mx-3 text-base">
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item className="text-[#f18966] font-bold">Blog 👋🏻</Breadcrumb.Item>
                </Breadcrumb>
                <div className="">
                    <div className="top-body flex justify-between items-center">
                        <div className="top-body-search">
                            <Search
                                placeholder="input search text"
                                allowClear
                                onSearch={onSearch}
                                style={{
                                    width: 500,
                                }}
                            />
                        </div>
                        <div className="top-body-select">
                            <Select
                                defaultValue="lucy"
                                style={{
                                    width: 200,
                                }}
                                onChange={handleChangeFilter}
                                options={[
                                    {
                                        value: 'jack',
                                        label: 'Jack',
                                    },
                                    {
                                        value: 'lucy',
                                        label: 'Lucy',
                                    },
                                    {
                                        value: 'Yiminghe',
                                        label: 'yiminghe',
                                    },
                                    {
                                        value: 'disabled',
                                        label: 'Disabled',
                                        disabled: true,
                                    },
                                ]}
                            />
                        </div>
                    </div>
                    <div className="bottom-body my-5">
                        <div className="list-blog">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {blogs.map((blog, index) => (
                                    <div className="" key={index}>
                                        <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-all border border-gray-200">
                                            <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{blog.title}</h2>
                                            <p className="text-gray-600 mb-3 line-clamp-4">{blog.description}</p>
                                            <p className="text-sm text-gray-500 mb-5">Author: <span className="font-semibold text-red-500">{blog.author}</span></p>
                                            <div className="flex justify-end">
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded duration-500">Detail</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Content>

        </div>
    );
};

export default UserBlog;