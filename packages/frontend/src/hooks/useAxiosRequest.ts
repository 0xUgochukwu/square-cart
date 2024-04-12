/** @format */

import { useState } from "react";
import axios, { Method } from "axios";
import api from "../constants/api";

interface AxiosHookResponse<T> {
  loading: boolean;
  error: string | null;
  sendRequest: (method: Method, url: string, data?: any) => Promise<T>;
}

const useAxiosRequest = <T>(): AxiosHookResponse<T> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = async (
    method: Method,
    url: string,
    data?: any
  ): Promise<T> => {
    setLoading(true);
    setError(null);

    try {
      let response;

      switch (method.toLowerCase()) {
        case "get":
          response = await axios.get<T>(`${api}/${url}`);
          break;
        case "post":
          response = await axios.post<T>(`${api}/${url}`, data);
          break;
        case "patch":
          response = await axios.patch<T>(`${api}/${url}`, data);
          break;
        case "delete":
          response = await axios.delete<T>(`${api}/${url}`);
          break;
        default:
          throw new Error("Invalid HTTP method");
      }
      return response.data;
    } catch (error: any) {
      setError(error.response ? error.response.data : error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, sendRequest };
};

export default useAxiosRequest;
