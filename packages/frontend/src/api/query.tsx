/** @format */

import { useState, useEffect } from "react";
import { useQueries } from "@tanstack/react-query";
import useAxiosRequest from "../hooks/useAxiosRequest";
import { getCookieData } from "../services/storage";

type QueryProps = { id: string; url: string }[];

const Query = (queryParamsArray: QueryProps) => {
  const [token, setToken] = useState<string>(
    () => getCookieData("token") || ""
  );
  const { sendRequest } = useAxiosRequest<any>();
  const queries = useQueries({
    queries: queryParamsArray.map((user) => {
      return {
        queryKey: [user.id],
        queryFn: () => sendRequest("get", user.url, null, token),
      };
    }),
  });

  const handleDataUpdate = (index: number = 0) => {
    queries[index].refetch();
  };

  useEffect(() => {
    setToken((prevToken) => {
      const tokenData = getCookieData("token");
      return tokenData || prevToken;
    });
  }, []); 

  return { queries, handleDataUpdate };
};

export default Query;
