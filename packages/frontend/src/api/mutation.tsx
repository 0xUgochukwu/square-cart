/** @format */

import { useMutation } from "@tanstack/react-query";
import useAxiosRequest from "../hooks/useAxiosRequest";
import { useState, useEffect } from "react";
import { getCookieData } from "../services/storage";

const Mutation = () => {
  const [token, setToken] = useState<string>("");
  const { sendRequest } = useAxiosRequest<any>();

  const mutation = useMutation({
    mutationFn: (data: any) => {
      return sendRequest(data.method, data.url, data.content, token);
    },
  });

  useEffect(() => {
    setToken((prevToken) => {
      const tokenData = getCookieData("token");
      return tokenData || prevToken;
    });
  }, []); 

  return { mutation };
};

export default Mutation;
