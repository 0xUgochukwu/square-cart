/* eslint-disable no-unused-vars */
import React from "react";
import { Spinner } from "./Spinner";

const Loader = () => {
    return (
        <div className="h-full w-full flex justify-center items-center flex-col bg-[ghostwhite] p-2">
            <Spinner />
        </div>
    );
};

export default Loader;
