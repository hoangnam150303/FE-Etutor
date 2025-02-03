import { AlignLeftOutlined, AreaChartOutlined, BookOutlined, DropboxOutlined, ProductOutlined, ProfileOutlined, RightOutlined, TagsOutlined, UnorderedListOutlined, UserOutlined, UserSwitchOutlined, WalletOutlined, WechatOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import avatarDefault from "../../assets/images/AvatarDefault.png"

export default function AdminHeader({onToggle, isOpen}) {
    
    const Menus = [
        { title: "User", icon: <UserOutlined className='text-2xl' />, path: `/test/user` },
        { title: "Courses", icon: <BookOutlined className='text-2xl' />, path: `/test/courses` },
        { title: "Class Registration", icon: <UnorderedListOutlined className='text-2xl' />, path: `/test/class-registration` },
        { title: "Chat", icon: <WechatOutlined className='text-2xl' />, path: `/test/chat` },
    ];

    // Tablet - Mobile - Ipad
    const [openDrawer, setOpenDrawer] = useState(false);
    const showDrawer = () => {
        setOpenDrawer(true);
    };
    const onCloseDrawer = () => {
        setOpenDrawer(false);
    };

    return (
        <div className="">
            <div className={`${isOpen ? "w-52" : "w-20"} duration-300 relative h-full bg-gradient-to-br from-[#679089] via-[#679079] to-[#679069] hidden lg:block rounded-l-lg`}>
                <div className="w-64 h-20">
                    <div className="w-3/5 flex justify-between items-center mx-2">
                        <img src={avatarDefault} 
                            alt="Shop" className={`cursor-pointer duration-500 rounded-full w-16 h-16 my-2`} />
                    </div>
                </div>
                <RightOutlined className={`${isOpen && "rotate-180"} absolute text-3xl cursor-pointer -right-4 top-16 w-8 border-2 bg-slate-50 text-slate-500 border-slate-50 rounded-full`} onClick={onToggle} />
                <ul className='pt-6'>
                    {Menus.map((menu, index) => (
                        <NavLink
                            key={index}
                            to={menu.path}
                            className={({ isActive }) => `flex items-center gap-x-4 py-4 h-16 px-7 text-base ${isActive ? 'bg-[#eee5da] text-[#f18966]' : 'text-slate-200'} hover:bg-[#eee5da] duration-300 hover:text-black`}
                        >
                            {menu.icon}
                            <span className={`${!isOpen && "scale-0"} origin-left duration-100 text-base font-medium`}>{menu.title}</span>
                        </NavLink>
                    ))}
                </ul>
            </div>
            {/* Tablet - Mobile - Ipad */}
            <div className="m-2 lg:hidden ">
                <Button type="primary" onClick={showDrawer} className='text-base bg-[#679089] text-white px-3 py-2 rounded-full hover:bg-slate-100 duration-300 hover:text-bg-teal-500'>
                    <AlignLeftOutlined />
                </Button>
                <Drawer title="Menu" onClose={onCloseDrawer} open={openDrawer} placement="left" width={225}>
                    <div className="">
                        <div className="w-64 h-20 mb-4">
                            <div className="w-8/12 flex justify-center items-center mx-2">
                                <img src={avatarDefault} alt="" className={`cursor-pointer duration-500 rounded-full w-24 h-24 my-2`} />
                            </div>
                        </div>
                        <ul className='pt-6'>
                            {Menus.map((menu, index) => (
                                <NavLink
                                    key={index}
                                    to={menu.path}
                                    className={({ isActive }) => `flex items-center gap-x-4 py-4 h-16 px-7 text-base ${isActive ? 'bg-slate-100 text-indigo-600' : 'text-gray-600'} hover:bg-slate-100 duration-300`}
                                >
                                    {menu.icon}
                                    <span className={`${!isOpen && "scale-0"} origin-left duration-300 text-base font-medium`}>{menu.title}</span>
                                </NavLink>
                            ))}
                        </ul>
                    </div>
                </Drawer>
            </div>
        </div>
    );
}