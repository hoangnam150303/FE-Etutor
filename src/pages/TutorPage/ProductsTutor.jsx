import React, { useState } from "react";
import { Breadcrumb, Menu, Select, Card, Slider, Spin, Checkbox, Pagination } from "antd";
import { SearchOutlined, ReadOutlined, QrcodeOutlined, BarsOutlined, HeartOutlined, EyeOutlined, ShoppingCartOutlined, } from "@ant-design/icons";
import { Link } from "react-router-dom";


const ProductsTutor = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [tutorsPerPage, setTutorsPerPage] = useState(10);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSort, setSelectedSort] = useState('default');
    const [viewMode, setViewMode] = useState('block');
    const [searchTerm, setSearchTerm] = useState('');

    const hardcodedTutors = [
        'Adventure',
        'Fantasy',
        'Educational Curriculum',
        'Fiction & Fantasy',
        'Religion & Spirituality',
        'Romance',
        'Literature & Fiction',
        'Biographies & Memoirs',
        'Children Book',
        'Novel/Light Novel',
        'Self-help',
        'Literary Fiction',
        'Biography/Autobiography',
        'Cookbooks',
        'History',
        'Graphic Novels/Comic',
        'Poetry',
        'Business',
        'Philosophy',
        'Travel',
        'Novel/Light Novel'
    ];

    const TutorList = [
        // Dữ liệu sách mẫu (có thể thay đổi theo nhu cầu)
        {
            _id: '1',
            title: 'Sample tutor 1',
            teacher: 'Teacher 1',
            images: ['https://via.placeholder.com/150'],
            description: 'This is a sample description for tutor 1.',
        },
        {
            _id: '2',
            title: 'Sample tutor 2',
            teacher: 'Teacher 2',
            images: ['https://via.placeholder.com/150'],
            description: 'This is a sample description for tutor 2.',
        },
        // Thêm nhiều sách mẫu nếu cần
    ];

    const handleSearchChange = (e) => {
        // Xử lý thay đổi tìm kiếm (có thể thêm logic tìm kiếm nếu cần)
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredTutors = TutorList.filter((tutor) =>
        tutor.title.toLowerCase().includes(searchTerm) ||
        tutor.teacher.toLowerCase().includes(searchTerm)
    );

    const handleCategoryChange = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(
                selectedCategories.filter(item => item !== category)
            );
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const handleViewModeChange = (mode) => {
        setViewMode(mode);
    };

    return (
        <div className="flex flex-col h-screen">
            {/* Breadcrumb */}
            <Breadcrumb className="mb-2 lg:my-5 lg:mx-3 text-sm md:text-base">
                <Breadcrumb.Item>Tutor</Breadcrumb.Item>
                <Breadcrumb.Item className="text-[#f18966] font-bold">Products 👋🏻</Breadcrumb.Item>
            </Breadcrumb>

            {/* Search Bar */}
            <div className='header my-3 md:my-5 p-4 md:p-6 lg:p-10 flex flex-col sm:flex-row justify-center sm:justify-between items-center bg-gradient-to-tl from-[#f8f4ef] to-transparent'>
                <h1 className='hidden sm:block text-2xl text-red-500 font-medium'>
                    <h1 className='text-lg text-black sm:block md:block font-bold'>Welcome to</h1>
                    <span className=' text-[#F18966] sm:block md:block  font-bold'> Tutor Page!</span>
                </h1>
                <div className='flex w-4/5 py-1 sm:w-1/2 md:w-2/3 items-center border rounded-full px-2 sm:px-3 sm:py-3 bg-gray-100'>
                    <input
                        type='text'
                        onChange={handleSearchChange}
                        placeholder='Search tutor...'
                        className='flex-grow outline-none text-sm md:text-base bg-gray-100 text-gray-700 px-2'
                    />
                    <SearchOutlined className='text-white cursor-pointer text-lg sm:text-xl bg-[#679089] p-2 rounded-full transition-transform duration-300 transform hover:scale-110' />
                </div>
            </div>

            <div className="flex flex-col lg:flex-row w-full">
                {/* Option left */}
                <div className='w-full lg:w-1/4 p-4'>
                    <div className='mx-5 lg:mx-0 lg:w-full flex flex-col'>
                        <div className="genre">
                            {/* List với Checkbox luôn hiển thị trên Desktop */}
                            <div className='genre-ipad hidden lg:block'>
                                <Menu
                                    className='overflow-y-auto max-h-96 border rounded-lg shadow'
                                    mode='inline'
                                    defaultOpenKeys={['sub1']}
                                    items={[{
                                        key: 'sub1',
                                        label: (
                                            <div className="flex items-center">
                                                <ReadOutlined className="mr-2" />
                                                <span>Categories</span>
                                            </div>
                                        ),
                                        children: hardcodedTutors.map((category, index) => ({
                                            key: index,
                                            label: (
                                                <div className="flex items-center justify-between">
                                                    <span>{category}</span>
                                                    <Checkbox
                                                        checked={selectedCategories.includes(category)}
                                                        onChange={() => handleCategoryChange(category)}
                                                    />
                                                </div>
                                            )
                                        }))
                                    }]}
                                />
                            </div>

                            {/* Select trên Mobile */}
                            <div className='genre-phone lg:hidden w-full mx-auto mt-3'>
                                <Select
                                    mode='multiple'
                                    className='w-full'
                                    value={selectedCategories}
                                    onChange={(value) => setSelectedCategories(value)}
                                    options={hardcodedTutors.map((category) => ({
                                        label: category,
                                        value: category,
                                    }))}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Option right */}
                <div className="w-full lg:w-3/4 p-4">

                    {/* Header all tutor */}
                    <div className="header-all-tutor flex flex-col md:flex-row justify-between items-center mx-4 my-2">

                        {/* kiểu hiển thị Tutor */}
                        <div className='option-form-left flex items-center w-full md:w-1/4 justify-end lg:justify-start mb-3 md:mb-0 gap-3'>
                            <QrcodeOutlined
                                className={`choice-icon-tnvd ${viewMode === 'block' ? 'text-blue-500' : ''}`}
                                onClick={() => handleViewModeChange('block')}
                            />
                            <BarsOutlined
                                className={`choice-icon-tnvd ${viewMode === 'line' ? 'text-blue-500' : ''}`}
                                onClick={() => handleViewModeChange('line')}
                            />
                        </div>

                        {/* Filter */}
                        <div className="options-right flex justify-between items-center w-full md:w-auto">
                            {/* Filter sorting */}
                            <div className='option-show'>
                                <Select
                                    defaultValue='Default sorting'
                                    value={selectedSort}
                                    onChange={(value) => setSelectedSort(value)}
                                    className='w-44 mr-2'
                                    options={[
                                        { value: 'default', label: 'Default sorting' },
                                        { value: 'popularity', label: 'Sort by popularity' },
                                        { value: 'averageRating', label: 'Sort by average rating' },
                                        { value: 'latest', label: 'Sort by latest' },
                                    ]}
                                />
                            </div>

                            {/* Filter number tutor show */}
                            <div className='option-number-tutor-show'>
                                <Select
                                    defaultValue='Show 10'
                                    value={`Show ${tutorsPerPage}`}
                                    onChange={(value) => setTutorsPerPage(parseInt(value.replace('Show ', '')))}
                                    className='w-28'
                                    options={[
                                        { value: 'Show 5', label: 'Show 5' },
                                        { value: 'Show 10', label: 'Show 10' },
                                        { value: 'Show 20', label: 'Show 20' },
                                        { value: 'Show 50', label: 'Show 50' },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Horizontal line */}
                    <div className='horizontal-line bg-slate-200 h-px w-11/12 my-2 mx-10'></div>

                    {/* List tutor */}
                    <div className='w-full'>
                        {loading ? (
                            <div className='flex justify-center items-center h-60'>
                                <Spin />
                            </div>
                        ) : (
                            <div className=''>
                                {viewMode === 'block' ? (
                                    <div className='list-by-block w-11/12 mx-auto'>
                                        {filteredTutors.length === 0 ? (
                                            <div className='not-found'>
                                                <h2 className='text-center my-20'>
                                                    No tutor found matching the selected filters.
                                                </h2>
                                            </div>
                                        ) : (
                                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:gap-4'>
                                                {filteredTutors.map((tutor, index) => {
                                                    const imageUrl = tutor.images[0] ? tutor.images[0] : '';
                                                    return (
                                                        <div
                                                            className='flex flex-col sm:flex-row justify-between items-start'
                                                            key={index}
                                                        >
                                                            <div
                                                                id={index}
                                                                className='bg-gradient-to-tl from-[#f8f4ef] to-transparent w-11/12 sm:w-full h-auto p-3 rounded-lg transition duration-500 ease-in-out hover:shadow-md sm:mb-4'
                                                            >
                                                                <div className='relative group overflow-hidden rounded-lg mb-4'>
                                                                    <img
                                                                        src={imageUrl}
                                                                        alt={tutor.title}
                                                                        className='w-full h-64 object-cover rounded-lg'
                                                                    />
                                                                    <div className='absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                                                                        <div className='absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-4'>
                                                                            <button className='flex justify-center p-3 bg-white rounded-full hover:bg-red-500 hover:text-white transform translate-x-10 group-hover:translate-x-0 duration-300 shadow-lg'>
                                                                                <HeartOutlined className='w-6 h-6 flex justify-center items-center text-black-500' />
                                                                            </button>
                                                                            <button className='flex justify-center items-center px-2 py-3 bg-white rounded-full hover:bg-red-500 hover:text-white transform translate-x-10 group-hover:translate-x-0 duration-300 delay-75 shadow-lg'>
                                                                                <Link to={`/details/${tutor._id}`}>
                                                                                    <EyeOutlined className='w-6 h-6 flex justify-center items-center text-black-500' />
                                                                                </Link>
                                                                            </button>
                                                                            <button className='flex justify-evenly items-center px-1 py-3 bg-white rounded-full hover:bg-red-500 hover:text-white transition-all transform translate-x-10 group-hover:translate-x-0 duration-300 delay-150 shadow-lg'>
                                                                                <ShoppingCartOutlined className='w-6 h-6 flex justify-center items-center text-black-500' />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <p className='text-xl font-bold mb-1 text-[#F18966]'>
                                                                    {tutor.title}
                                                                </p>

                                                                {/* <div className='flex flex-col justify-between items-start mr-5 space-y-1'> */}
                                                                <p className='text-base text-gray-600 truncate'>{tutor.author}</p>
                                                                {/* </div> */}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className='list-by-line '>
                                        {filteredTutors.length === 0 ? (
                                            <div className='not-found'>
                                                <h2 className='text-center my-20'>
                                                    No tutor found matching the selected filters.
                                                </h2>
                                            </div>
                                        ) : (
                                            <div className='grid grid-rows-1 gap-4'>
                                                {filteredTutors.map((tutor, index) => {
                                                    const imageUrl = tutor.images[0] ? tutor.images[0] : 'https://via.placeholder.com/150';
                                                    return (
                                                        <div
                                                            className='w-full h-auto'
                                                            key={index}>
                                                            <div className='flex items-start justify-between md:w-5/6 mx-auto'>
                                                                <div className='relative group overflow-hidden w-1/2 md:w-1/4 m-2'>
                                                                    {/* <div className=''> */}
                                                                    <img
                                                                        src={imageUrl}
                                                                        alt={tutor.title}
                                                                        className='w-full h-64 object-cover rounded-lg'
                                                                    />
                                                                    {/* </div> */}
                                                                    <div className='absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                                                                        <div className='absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-4'>
                                                                            <button className='flex justify-center p-3 bg-white rounded-full hover:bg-red-500 hover:text-white transform translate-x-10 group-hover:translate-x-0 duration-300 shadow-lg'>
                                                                                <HeartOutlined className='w-6 h-6 flex justify-center items-center text-black-500' />
                                                                            </button>
                                                                            <button className='flex justify-center items-center px-2 py-3 bg-white rounded-full hover:bg-red-500 hover:text-white transform translate-x-10 group-hover:translate-x-0 duration-300 delay-75 shadow-lg'>
                                                                                <Link to={`/details/${tutor._id}`}>
                                                                                    <EyeOutlined className='w-6 h-6 flex justify-center items-center text-black-500' />
                                                                                </Link>
                                                                            </button>
                                                                            <button className='flex justify-evenly items-center px-1 py-3 bg-white rounded-full hover:bg-red-500 hover:text-white transition-all transform translate-x-10 group-hover:translate-x-0 duration-300 delay-150 shadow-lg'>
                                                                                <ShoppingCartOutlined className='w-6 h-6 flex justify-center items-center text-black-500' />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div id={index} className='w-1/2 md:w-3/4 h-auto m-2'>
                                                                    <div className=''>
                                                                        <p className='text-[#f18966] text-xl font-bold mb-2'>{tutor.title}</p>
                                                                        <p className='text-gray-600 text-sm mb-2 truncate'>
                                                                            {tutor.author}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='jamb bg-slate-200 h-px w-3/4 my-2'></div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Pagination */}
                        <Pagination
                            current={currentPage}
                            total={filteredTutors.length} // Tổng số mục = số lượng sách mẫu
                            pageSize={tutorsPerPage}
                            onChange={(page) => setCurrentPage(page)}
                            className='mt-4 mb-10 flex justify-center'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsTutor;