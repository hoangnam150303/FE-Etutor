import React from "react";
import Banner from "../../components/HomePage/Banner";
import Footer from "../../components/HomePage/Footer";
import Services from "../../components/HomePage/Services";
import Supported from "../../components/HomePage/Supported";
import Process from "../../components/HomePage/Process";
import TestimonialPage from "../../components/HomePage/Experience";
import Question from "../../components/HomePage/Question";
import Post from "../../components/HomePage/Post";

const HomePage = () => {
    return (
        <div className="flex flex-col gap-y-6">
            <Banner />
            <Services />
            <Supported />
            <Process />
            <TestimonialPage />
            <Question />
            <Post />
        </div>
    );
};

export default HomePage;