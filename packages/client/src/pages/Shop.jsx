/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Images from "../components/Images";
import ShopItem from "../components/ShopItem";
import { Spinner, SpinnerSmall } from "../components/Spinner";
import get from "../utils/Get";
import { useParams } from "react-router-dom";

const Shop = ({ socket }) => {
    const [product, setProduct] = useState({ images: [], info: null });
    const params = useParams();

    socket.on("connect", () => {
        console.log("Connected to server", socket.id);
    });

    socket.on(`item-${params.id}`, () => {
        setProduct(null);
        getProduct();
    });

    socket.on("product", (item) => {
        setProduct(null);
        setTimeout(() => {
            setProduct(item);
        }, 1000);
    });

    const getProduct = () => {
        get.get(`/customer/item?username=${params.id}`).then((res) => {
            const { data } = res;

            if (data.data) {
                setProduct(data.data);
            }
        });
    };

    useEffect(() => {
        setInterval(() => {
            // getProduct();
        }, 5000);
    }, []);

    useEffect(() => {
        getProduct();
    }, [params.id]);

    return (
        <div className="bg-[grey] h-full w-full">
            {product?.info ? (
                <ShopItem images={product.images} info={product.info} />
            ) : (
                <div className="h-full w-full flex justify-center items-center flex-col bg-[ghostwhite]">
                    <Spinner />
                    <h1 className="text-center text-[10px] text-[grey]">
                        Waiting for product!
                    </h1>
                </div>
            )}
        </div>
    );
};

export default Shop;
