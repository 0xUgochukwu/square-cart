/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { register } from "swiper/element/bundle";

const Images = ({ images }) => {
    register();

    return (
        <div className="h-[300px] w-[300px] overflow-y-hidden overflow-x-scroll flex flex-col flex-wrap bg-white">
            <swiper-container
                slides-per-view="1"
                speed="500"
                loop="true"
                autoplay="true"
                style={{ width: "300px", height: "300px" }}
                className="h-[300px] w-[300px] overflow-y-hidden overflow-x-scroll flex flex-col flex-wrap bg-white"
            >
                {images.map((image, key) => (
                    <swiper-slide
                        key={key}
                        style={{ width: "400px" }}
                        className="w-[300px] h-[300px] text-center bg-white flex justify-center items-center"
                    >
                        <img
                            className="h-fit w-fit object-contain"
                            src={image}
                            alt={"images"}
                            draggable="false"
                        />
                    </swiper-slide>
                ))}
            </swiper-container>
        </div>
    );
};

export default Images;
