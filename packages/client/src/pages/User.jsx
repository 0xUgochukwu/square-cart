/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import CardForm from "../components/Card";
import { Avatar } from "@mui/material";
import { Input, Textarea } from "../components/Input";
import { Button } from "../components/Button";
import get from "../utils/Get";
import appContext from "../contexts/context";

const User = () => {
    const { toast } = useContext(appContext);

    const user = JSON.parse(localStorage.getItem("user"));
    const [form, setForm] = useState({});

    const updateAddress = async () => {
        const billingAddress = form.billingAddress || user.billingAddress;
        const shippingAddress = form.shippingAddress || user.shippingAddress;

        localStorage.setItem(
            "user",
            JSON.stringify({ ...user, billingAddress, shippingAddress })
        );

        try {
            const res = await get.post("/customer/update", {
                billingAddress,
                shippingAddress,
            });

            const { data } = res;

            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            if (error?.response?.data) {
                toast.error(error.response.data.message);
            }
        }
    };

    return (
        <div className="h-full bg-white">
            <div className="text-center bg-[grey] h-full w-full">
                <div className="text-center flex items-center justify-center flex-col">
                    <Avatar
                        alt={user.name}
                        src={
                            "https://api.dicebear.com/7.x/initials/svg?seed=" +
                            user.name
                        }
                        className="mt-5"
                    />
                    <h1 className="[font-family:'poppins'] p-2">{user.name}</h1>
                    <br />
                    <Textarea
                        className="h-[80px] !p-[5px] !rounded-[5px]"
                        placeholder="Billing Address"
                        value={user.billingAddress}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                billingAddress: e.target.value,
                            });
                        }}
                    />
                    <br />
                    <Textarea
                        className="h-[80px] !p-[5px] !rounded-[5px]"
                        placeholder="Shipping Address"
                        value={user.shippingAddress}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                shippingAddress: e.target.value,
                            });
                        }}
                    />
                    <br />
                    <Button
                        className={
                            "border-transparent !mt-1 !bg-[#fe2c55] text-white !m-0"
                        }
                        onClick={updateAddress}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default User;
