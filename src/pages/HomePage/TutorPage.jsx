import React from "react";
import { useNavigate } from "react-router-dom";

let cardsData = [
    {
        tutor: 'Lê Văn Luyện',
        email: 'hoangnambukiu@gmail.com',
        courses: ['Toan', 'Li', 'Hoa'],
        avatar: 'https://picsum.photos/id/1/300/300',
    },
    {
        tutor: 'Lê Văn Luyện',
        email: 'hoangnambukiu@gmail.com',
        courses: ['Toan', 'Li', 'Hoa'],
        avatar: 'https://picsum.photos/id/2/300/300',
    },
    {
        tutor: 'Lê Văn Luyện',
        email: 'hoangnambukiu@gmail.com',
        courses: ['Toan', 'Li', 'Hoa'],
        avatar: 'https://picsum.photos/id/3/300/300',
    },
    {
        tutor: 'Lê Văn Luyện',
        email: 'hoangnambukiu@gmail.com',
        courses: ['Toan', 'Li', 'Hoa'],
        avatar: 'https://picsum.photos/id/4/300/300',
    },
    {
        tutor: 'Lê Văn Luyện',
        email: 'hoangnambukiu@gmail.com',
        courses: ['Toan', 'Li', 'Hoa'],
        avatar: 'https://picsum.photos/id/5/300/300',
    },
    {
        tutor: 'Lê Văn Luyện',
        email: 'hoangnambukiu@gmail.com',
        courses: ['Toan', 'Li', 'Hoa'],
        avatar: 'https://picsum.photos/id/6/300/300',
    },
];

const TutorPage = () => {

    return (
        <div className="my-5">
            <div className="mx-20 mb-5 flex items-center gap-4">
                <select className="w-1/4 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Hello</option>
                    <option value="">Xin chao</option>
                    <option value="">Hello</option>
                </select>
                <input
                    type="text"
                    placeholder="Search ..."
                    className="border border-gray-300 rounded-lg px-4 py-2 w-3/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="bg container mx-auto">
                <div className="mx-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {cardsData.map((card, index) => (
                            <div className="bg-white shadow-md hover:shadow-lg rounded-lg m-4 p-4 flex items-center gap-2" key={index}>
                                <div className="rounded-full overflow-hidden w-1/3 h-auto">
                                    <img src={card.avatar} alt={card.tutor} className="border-2 border-slate-400 size-16 object-cover rounded-full" />
                                </div>
                                <div className="w-2/3">
                                    <h2 className="text-lg font-bold line-clamp-1">{card.tutor}</h2>
                                    <p className="text-gray-700 text-xs my-1 line-clamp-1">{card.email}</p>
                                    <div className="flex flex-wrap items-baseline gap-2">
                                        {card.courses.map((course, index) => (
                                            <p key={index} className="text-gray-700 text-xs my-2 bg-slate-300 px-2 py-0.5 rounded-xl">{course}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="bg bg-slate-100"></div>
        </div>
    );
}

export default TutorPage;