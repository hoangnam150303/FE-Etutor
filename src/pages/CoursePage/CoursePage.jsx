import React from "react";
import { useNavigate } from "react-router-dom";

let courses = [
    {
        title: "Introduction to Web Development",
        description: "Learn the basics of web development using HTML, CSS, and JavaScript.",
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

const CoursePage = () => {

    const navigate = useNavigate();

    const handleDetailClick = () => {
        navigate(`/course/:id`);
    };

    return (
        <div className="my-5">
            <div className="bg container mx-auto">
                <div className="mx-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"> 
                        {courses.map((card, index) => (
                            <div className="bg-white shadow-md rounded-lg p-2" key={index}>
                                <img className="w-full h-48 object-cover rounded-t-lg" src={card.image} alt={card.title} />
                                <div className="p-2">
                                    <div className="mb-4">
                                        <h2 className="text-xl font-bold mb-2 line-clamp-1">{card.title}</h2>
                                        <p className="text-gray-700 line-clamp-2">{card.description}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs italic">Tutor : <span className="text-sm text-gray-700 font-semibold not-italic">{card.tutor}</span></p>
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDetailClick()}>View</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursePage;
