import React from 'react';
import { useParams } from 'react-router-dom';

const DetailsPage = () => {
    const { id } = useParams();

    return (
        <div className='w-11/12 mx-auto my-10'>
            <h1 className='text-2xl font-bold text-[#F18966]'>Chi tiết về Tutor: {id}</h1>
            <p className='text-gray-600'>Đây là trang chi tiết cho Tutor có ID: {id}</p>
        </div>
    );
};

export default DetailsPage;
