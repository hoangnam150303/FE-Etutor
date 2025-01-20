import React from "react";
import bannerImage from "../assets/images/banner.png";

const Banner = () => {
    return (
        <div>
            <div>
                <img className="w-full" src={bannerImage} alt="logo" />
            </div>
        </div>
    )

};

export default Banner;