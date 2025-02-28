import React from "react";
import { useNavigate } from "react-router-dom";

let cardsData = [
    {
        title: 'ĐIỂM CHUẨN VÀO LỚP 10 TRƯỜNG THPT TAM PHƯỚC',
        description: 'Điểm chuẩn trường THPT Tam Phước – Biên Hòa 2024 đã được công bố và...',
        author: 'Viet Duc',
        image: 'https://picsum.photos/id/1/300/300',
    },
    {
        title: 'ĐIỂM CHUẨN VÀO LỚP 10 TRƯỜNG THPT TAM PHƯỚC',
        description: 'Điểm chuẩn trường THPT Tam Phước – Biên Hòa 2024 đã được công bố và...',
        author: 'Viet Duc',
        image: 'https://picsum.photos/id/2/300/300',
    },
    {
        title: 'ĐIỂM CHUẨN VÀO LỚP 10 TRƯỜNG THPT TAM PHƯỚC',
        description: 'Điểm chuẩn trường THPT Tam Phước – Biên Hòa 2024 đã được công bố và...',
        author: 'Viet Duc',
        image: 'https://picsum.photos/id/3/300/300',
    },
    {
        title: 'ĐIỂM CHUẨN VÀO LỚP 10 TRƯỜNG THPT TAM PHƯỚC',
        description: 'Điểm chuẩn trường THPT Tam Phước – Biên Hòa 2024 đã được công bố và...',
        author: 'Viet Duc',
        image: 'https://picsum.photos/id/4/300/300',
    },
    {
        title: 'ĐIỂM CHUẨN VÀO LỚP 10 TRƯỜNG THPT TAM PHƯỚC',
        description: 'Điểm chuẩn trường THPT Tam Phước – Biên Hòa 2024 đã được công bố và...',
        author: 'Viet Duc',
        image: 'https://picsum.photos/id/5/300/300',
    },
    {
        title: 'ĐIỂM CHUẨN VÀO LỚP 10 TRƯỜNG THPT TAM PHƯỚC',
        description: 'Điểm chuẩn trường THPT Tam Phước – Biên Hòa 2024 đã được công bố và...',
        author: 'Viet Duc',
        image: 'https://picsum.photos/id/6/300/300',
    },
];

const BlogPage = () => {

    const navigate = useNavigate();

    const handleDetailClick = () => {
        navigate(`/blog/:id`);
    };

    return (
        <div className="my-5">
            <div className="bg container mx-auto">
                <div className="mx-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {cardsData.map((card, index) => (
                            <div className="bg-white shadow-md rounded-lg p-4 m-4" key={index}>
                                <img className="w-full h-48 object-cover rounded-t-lg" src={card.image} alt={card.title} />
                                <div className="p-4">
                                    <h2 className="text-xl font-bold mb-2">{card.title}</h2>
                                    <p className="text-gray-700">{card.description}</p>
                                </div>
                                <div className="flex justify-end">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDetailClick()}>View Detail</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="bg bg-slate-100"></div>
        </div>
    );
};

export default BlogPage;