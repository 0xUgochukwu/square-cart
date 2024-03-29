/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";
import Images from "./Images";
import { Button } from "./Button";
import { SpinnerSmall } from "./Spinner";
import get from "../utils/Get";
import appContext from "../contexts/context";

const ShopItem = ({ info, images }) => {
    const [buying, setBuying] = useState(false);
    const { toast, socket } = useContext(appContext);

    const buyProduct = async (id) => {
        console.log(id);
        setBuying(true);

        get.post("/product/buy/" + id)
            .then((res) => {
                console.log(res);
                setBuying(false);
            })
            .catch((err) => {
                console.error(err);
                setBuying(false);

                const error_msg = err?.response?.data?.message || err?.message;
                toast.error(error_msg);
            });
    };

    return (
        <div>
            <Images images={images} />
            <div className="h-fit w-full p-2 pb-0 bg-white">
                <h1 className="[font-family:'poppins'] font-bold">
                    {info?.name || "Item Name"}
                </h1>
                <p className="[font-family:'montserrat'] font-bold text-[11px] text-[grey]">
                    {info?.info || "Item Info"}
                </p>
            </div>
            <div className="h-fit w-full p-2 pt-0 bg-white flex justify-between items-center">
                <p className="[font-family:'montserrat'] font-bold text-[20px] inline-block">
                    ${info?.price || "350"}
                </p>
                {buying ? (
                    <Button className="!w-[100px] !bg-[#fe2c55] text-white !m-0 text-center flex justify-center items-center">
                        <SpinnerSmall size="sm" />
                    </Button>
                ) : (
                    <Button
                        className={"!w-[100px] !bg-[#fe2c55] text-white !m-0"}
                        text="Buy"
                        onClick={() => {
                            buyProduct(info._id);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default ShopItem;
