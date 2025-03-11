import { Breadcrumb } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

import imgBlog from '../../assets/images/AdvancedQualifications.webp'

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

const BlogDetailOfHome = () => {

    const navigate = useNavigate();

    const handleDetailClick = () => {
        navigate(`/blog/1`);
    };
    
    return (
        <div className="">
            <div className="blog-header">
                <div className="relative">
                    <img
                        src={imgBlog}
                        alt="Background"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="relative bg-sky-300 bg-opacity-75 py-4">
                        <div className="container mx-auto">
                            <p className="text-white text-sm text-center my-4">Home<span> / </span> <span className="text-white">Blog Detail</span></p>
                            <div className="title-blog w-3/4 mx-auto mb-5">
                                <h1 className="text-white text-3xl text-center">
                                    Title of Blog
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-screen-xl mx-auto">
                    <div className="blog-body flex items-start m-5 gap-5">
                        <div className="blog-body__content w-2/3 px-10 py-5">
                            <div className="author_blog mx-1">
                                <p className="text-slate-500 text-sm">Author<span> - </span> <span className="text-white bg-slate-300 px-2 py-1 rounded-xl">Việt Đức</span></p>
                            </div>
                            <div className="line h-0.5 w-full bg-slate-100 my-2.5"></div>
                            <div className="img_blog">
                                <img src={imgBlog} alt="" className="rounded-md my-2" />
                            </div>
                            <h2>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
                                alias repellendus expedita laborum optio aspernatur sapiente illum
                                ab ipsum sint quaerat esse ipsa facere similique, accusantium
                                dolor. Vero inventore repellendus ullam quasi nisi consequatur
                                rerum, porro eos voluptate saepe nam est numquam soluta iure
                                dolores ratione delectus, accusamus totam. Ea quod sit rem animi
                                commodi, maiores error deleniti quo totam ab eos architecto
                                ratione provident pariatur optio laborum recusandae! Quis
                                molestias fugit perspiciatis in suscipit id dicta facere
                                aspernatur sequi esse, ea eius magni exercitationem quo
                                necessitatibus blanditiis eligendi consectetur laborum autem
                                corporis nihil excepturi, sed officia! Eos provident tenetur
                                tempore voluptas porro doloremque suscipit veritatis, nemo, ipsam,
                                placeat sit natus dolores alias. Veniam, eaque. Eum est ducimus
                                architecto, deleniti officia distinctio perspiciatis quaerat!
                                Accusantium repellendus esse aperiam asperiores quasi ab dolore
                                aspernatur voluptas odit pariatur distinctio modi, quas, expedita,
                                adipisci quod itaque qui voluptatum ut aliquid id perspiciatis a
                                soluta quidem ipsum. Itaque delectus nostrum, ipsam alias vel quam
                                autem tempora sed nihil, saepe beatae recusandae earum nam.
                                Officia reprehenderit nobis cupiditate itaque quasi necessitatibus
                                temporibus fugit similique, numquam doloribus perspiciatis eveniet
                                eligendi dolor! Atque, quis? Consequuntur unde officiis ratione,
                                ullam ipsa at quaerat numquam animi est recusandae labore.
                            </h2>
                        </div>
                        <div className="blog-other w-1/3 border border-gray-100 shadow-lg rounded-xl px-4 py-2">
                            <h1 className="text-xl font-semibold">Blog other</h1>
                            <div className="line h-0.5 w-full bg-slate-100 my-2 mx-auto"></div>
                            <div className="list-blog">
                                {cardsData.map((card, index) => (
                                    <div className="bg-white shadow-md rounded-lg p-3 my-4 flex items-start" key={index}>
                                        <div className="">
                                            <div className="mb-2">
                                                <h2 className="text-xl font-bold mb-1">{card.title}</h2>
                                                <p className="text-gray-700">{card.description}</p>
                                            </div>
                                            <div className="flex justify-end">
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
    );
};

export default BlogDetailOfHome;
