import React from "react";
import { useNavigate } from "react-router-dom";
import { message, Popconfirm } from 'antd';

import imgCourse from '../../assets/images/AdvancedQualifications.webp'

let courses = [
    {
        title: "Introduction to Web Development",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia alias repellendus expedita laborum optio aspernatur sapiente illum ab ipsum sint quaerat esse ipsa facere similique, accusantium dolor. ",
        tutor: "John Doe",
        image: "https://picsum.photos/id/1/300/300"
    },
    {
        title: "React.js Essentials",
        description: "Master React.js fundamentals and build scalable web applications.",
        tutor: "Jane Smith",
        image: "https://picsum.photos/id/2/300/300"
    },
    {
        title: "Node.js for Beginners",
        description: "Get started with Node.js and build your first server-side applications.",
        tutor: "Michael Johnson",
        image: "https://picsum.photos/id/3/300/300"
    },
    {
        title: "JavaScript Advanced Techniques",
        description: "Explore advanced JavaScript concepts such as closures, prototypes, and async programming.",
        tutor: "Emily Brown",
        image: "https://picsum.photos/id/4/300/300"
    },
    {
        title: "Python Programming",
        description: "Learn Python programming from scratch with hands-on exercises and projects.",
        tutor: "David Wilson",
        image: "https://picsum.photos/id/5/300/300"
    },
    {
        title: "Data Structures and Algorithms",
        description: "Study essential data structures and algorithms used in computer science.",
        tutor: "Sophia Lee",
        image: "https://picsum.photos/id/6/300/300"
    },
    {
        title: "Machine Learning Basics",
        description: "Introduction to machine learning algorithms and applications.",
        tutor: "Kevin Clark",
        image: "https://picsum.photos/id/7/300/300"
    },
    {
        title: "UX/UI Design Fundamentals",
        description: "Learn the principles of user experience (UX) and user interface (UI) design.",
        tutor: "Emma White",
        image: "https://picsum.photos/id/8/300/300"
    },
    {
        title: "Mobile App Development",
        description: "Build mobile applications for iOS and Android using React Native.",
        tutor: "Ryan Taylor",
        image: "https://picsum.photos/id/9/300/300"
    },
    {
        title: "Cybersecurity Basics",
        description: "Understand cybersecurity threats and preventive measures.",
        tutor: "Alex Turner",
        image: "https://picsum.photos/id/10/300/300"
    }
];

const CourseDetailOfHome = () => {

    const navigate = useNavigate();

    const handleDetailClick = () => {
        navigate(`/course/1`);
    };

    // Pop confirm register
    const confirmRegister = (e) => {
        console.log(e);
        message.success('Click on Yes');
    };
    const cancelRegister = (e) => {
        console.log(e);
        message.error('Click on No');
    };

    return (
        <div className="">
            <div className="course-header">
                <div className="relative">
                    <img
                        src={imgCourse}
                        alt="Background"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="relative bg-sky-300 bg-opacity-75 py-4">
                        <div className="container mx-auto">
                            <p className="text-white text-sm text-center my-4">Home<span> / </span> <span className="text-white">Course Detail</span></p>
                            <div className="title-course w-3/4 mx-auto mb-5">
                                <h1 className="text-white text-3xl text-center">
                                    Title of Course
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-screen-xl mx-auto">
                    <div className="course-body flex items-start m-5 gap-5">
                        <div className="course-body__content w-2/3 px-10 py-5 border border-slate-200 rounded-md shadow-md">
                            <div className="tutor_course mx-1">
                                <p className="text-slate-500 text-sm">Tutor<span> - </span> <span className="text-white bg-slate-300 px-2 py-1 rounded-xl">Việt Đức</span></p>
                            </div>
                            <div className="line h-0.5 w-full bg-slate-100 my-2.5"></div>
                            <div className="img_course px-1">
                                <img src={imgCourse} alt="" className="rounded-md my-2" />
                            </div>
                            <div className="my-4 border border-slate-200 rounded-md shadow-sm p-2">
                                <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia alias repellendus expedita laborum optio aspernatur sapiente illum ab ipsum sint quaerat esse ipsa facere similique, accusantium dolor. Vero inventore repellendus ullam quasi nisi consequatur rerum, porro eos voluptate saepe nam est numquam soluta iure dolores ratione delectus, accusamus totam. Ea quod sit rem animi commodi, maiores error deleniti quo totam ab eos architecto ratione provident pariatur optio laborum recusandae! Quis molestias fugit perspiciatis in suscipit id dicta facere aspernatur sequi esse, ea eius magni exercitationem quo necessitatibus blanditiis eligendi consectetur laborum autem corporis nihil excepturi, sed officia!.</h2>
                            </div>
                            <div className="flex justify-end mx-2">
                                <Popconfirm
                                    title="Confirm Register"
                                    description="Are you sure to register this course?" 
                                    onConfirm={confirmRegister}
                                    onCancel={cancelRegister}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Register Course</button>
                                </Popconfirm>
                            </div>
                        </div>
                        <div className="course-other w-1/3 border border-gray-100 shadow-lg rounded-xl px-4 py-2">
                            <h1 className="text-xl font-semibold">Course other</h1>
                            <div className="line h-0.5 w-full bg-slate-100 my-2 mx-auto"></div>
                            <div className="list-course">
                                {courses.map((card, index) => (
                                    <div className="bg-white shadow-md rounded-lg p-3 my-4 flex items-start" key={index}>
                                        <div className="">
                                            <div className="mb-2">
                                                <h2 className="text-xl font-bold mb-1">{card.title}</h2>
                                                <p className="text-gray-700 line-clamp-3">{card.description}</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="text-xs italic">Tutor : <span className="text-sm text-gray-700 font-semibold not-italic">{card.tutor}</span></p>
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" onClick={() => handleDetailClick()}>View</button>
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
    )
}

export default CourseDetailOfHome;