/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
import { useState, useEffect } from "react";
import axios from "../utils/Fetch";

const useFetch = (data = { success: false, error: false, loading: false }) => {
    const [response, setResponse] = useState(data);

    const setPromiseHelper = (promise, load = true) => {
        if (promise instanceof Promise) {
            if (load) {
                setResponse({
                    ...response,
                    loading: true,
                });
            }
            promise
                .then((res) => {
                    setResponse({
                        success: res.data,
                        error: false,
                        loading: false,
                    });
                })
                .catch((err) => {
                    try {
                        setResponse({
                            error: err.response.data,
                            success: false,
                            loading: false,
                        });
                    } catch (error) {
                        setResponse({
                            error: {
                                message: err.message,
                                data: {},
                                status: 500,
                                success: false,
                            },
                            success: false,
                            loading: false,
                        });
                        throw err;
                    }
                });
            return;
        }
        throw new Error(`Expected a Promise but got ${typeof promise}`);
    };

    return [response, setPromiseHelper];
};

export default useFetch;
