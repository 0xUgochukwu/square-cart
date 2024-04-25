/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CreditCardIcon from "@mui/icons-material/CreditCard";

import context from "../contexts/context";

import { CreateCustomer } from "./Customer";
import api from "../configs/endpoint";
import Shop from "./Shop";
import User from "./User";
import Card from "./Card";
import { ThemeProvider, createTheme } from "@mui/material";
import platformTheme from "../configs/theme";

const Extention = () => {
    const [value, setValue] = useState(0);
    const { toast, socket } = useContext(context);
    const params = useParams();

    const [tabs, setTabs] = useState([
        <Shop socket={socket} />,
        <Card socket={socket} />,
        <User socket={socket} />,
    ]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log({ newValue });
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: platformTheme[params.type], // Define a primary color
            },
            text: {
                primary: platformTheme[params.type], // Define a text color
            },
        },
    });

    useEffect(() => {
        socket.emit("join", params.id);
    }, []);

    return (
        <>
            <div className="bg-[white] h-full w-full">
                <div className="h-[400px] w-full bg-[grey]">
                    {!localStorage.getItem("token") ? (
                        <CreateCustomer />
                    ) : (
                        <>{tabs[value]}</>
                    )}
                </div>
                <div className="w-full bg-white text-center m-[auto]">
                    <ThemeProvider theme={theme}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                            className=""
                        >
                            <Tab icon={<ShoppingBagIcon />} aria-label="" />
                            <Tab icon={<CreditCardIcon />} aria-label="" />
                            <Tab icon={<PersonIcon />} aria-label="" />
                        </Tabs>
                    </ThemeProvider>
                </div>
            </div>
        </>
    );
};

export default Extention;
