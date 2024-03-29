import { useContext, useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import useFetch from "../hooks/useFetch";
import api from "../configs/endpoint";
import axios from "axios";
import context from "../contexts/context";

const CreateCustomer = () => {
    const { toast } = useContext(context);
    const [formType, setFormType] = useState("");
    const [form, setForm] = useState({});
    const [get, setGet] = useFetch();

    const handleForm = () => {
        if (formType === "") {
            checkEmail();
        } else if (formType === "signup") {
            signUp();
        } else if (formType === "login") {
            login();
        }
    };

    const checkEmail = () => {
        setGet(
            axios.post(api + "/customer/email", {
                email: form.email,
            })
        );
    };

    const signUp = async () => {
        if (form.password !== form.confirmPassword) {
            return toast.error("Password does not match!");
        }

        try {
            const res = await axios.post(api + "/customer/signup", {
                name: form.name,
                email: form.email,
                password: form.password,
                social: "tiktok",
            });

            const { data } = res;

            if (data.success) {
                toast.success(data.message);
                localStorage.setItem("token", data.data.token);
                localStorage.setItem("user", JSON.stringify(data.data.user));
                document.location.reload();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            if (error?.response?.data) {
                toast.error(error.response.data.message);

                if (
                    error.response.data.message ===
                    "A user with this email already exists!"
                ) {
                    setFormType("login");
                }
            }
        }
    };

    const login = async () => {
        try {
            const res = await axios.post(api + "/customer/login", {
                email: form.email,
                password: form.password,
            });

            const { data } = res;

            if (data.success) {
                toast.success(data.message);
                localStorage.setItem("token", data.data.token);
                localStorage.setItem("user", JSON.stringify(data.data.user));
                document.location.reload();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            if (error?.response?.data) {
                toast.error(error.response.data.message);

                if (
                    error.response.data.message ===
                    "A user with this email already exists!"
                ) {
                    setFormType("login");
                }
            }
        }
    };

    useEffect(() => {
        console.log(get);

        if (get.error) {
            if (formType !== "") {
                return toast.error(get.error.message);
            }

            if (get.error.message) {
                setFormType("signup");
            }
        }

        if (get.success) {
            if (formType !== "") {
                return toast.success(get.success.message);
            }

            if (get.success.message) {
                setFormType("login");
            }
        }
    }, [get]);

    return (
        <>
            <div className="p-2 text-center bg-[grey] h-full w-full flex justify-center items-center">
                <div className="w-full">
                    <Input
                        placeholder="Name"
                        className={formType !== "signup" ? "hidden" : ""}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                name: e.target.value,
                            });
                        }}
                    />
                    <br className={formType !== "signup" ? "hidden" : ""} />
                    <Input
                        placeholder="Email"
                        onChange={(e) => {
                            setForm({
                                ...form,
                                email: e.target.value,
                            });
                        }}
                    />
                    <br />
                    <Input
                        placeholder="Password"
                        className={
                            formType !== "signup"
                                ? formType !== "login"
                                    ? "hidden"
                                    : ""
                                : ""
                        }
                        type="password"
                        onChange={(e) => {
                            setForm({
                                ...form,
                                password: e.target.value,
                            });
                        }}
                    />
                    <br
                        className={
                            formType !== "signup"
                                ? formType !== "login"
                                    ? "hidden"
                                    : ""
                                : ""
                        }
                    />
                    <Input
                        placeholder="Confirm Password"
                        className={formType !== "signup" ? "hidden" : ""}
                        type="password"
                        onChange={(e) => {
                            setForm({
                                ...form,
                                confirmPassword: e.target.value,
                            });
                        }}
                    />
                    <br className={formType !== "signup" ? "hidden" : ""} />
                    <Button text="Get Access" onClick={handleForm} />
                </div>
            </div>
        </>
    );
};

export { CreateCustomer };
