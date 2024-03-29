/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import io from "socket.io-client";

import api from "./configs/endpoint";

import appContext from "./contexts/context.jsx";

const socket = new io(new URL(api).origin, {
    query: {
        token: localStorage.getItem("token"),
    },
});

socket.on("connect_error", (err) => {
    console.log(err.message);

    if (
        localStorage.getItem("token") &&
        err.message === "Authorization error"
    ) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        document.location.reload();
    }
});

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
    // <React.StrictMode>
    <Router>
        <appContext.Provider value={{ toast, socket }}>
            <Toaster />
            <div className="App">
                <App />
            </div>
        </appContext.Provider>
    </Router>,
    // </React.StrictMode>
    document.getElementById("root")
);
