import { Breadcrumb, Select, Input } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";

const { Search } = Input;

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
                <div className="my-2">
                    <div className="top-body flex justify-between items-center">
                        <div className="top-body-search">
                            <Search
                                placeholder="input search text"
                                allowClear
                                onSearch={onSearch}
                                style={{
                                    width: 300,
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
                    <div className="bottom-body">
                        
                    </div>
                </div>
            </Content>

        </div>
    );
};

export default UserBlog;