import React from "react";
import Banner from "../../components/Banner";
import Footer from "../../components/Footer";
import Services from "../../components/Services";
import Supported from "../../components/Supported";
import Process from "../../components/Process";
import TestimonialPage from "../../components/Experience";
import Question from "../../components/Question";
import Post from "../../components/Post";

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
            <Footer />
        </div>
    );
};

export default HomePage;