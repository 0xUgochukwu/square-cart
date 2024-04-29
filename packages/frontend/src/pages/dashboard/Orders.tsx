/** @format */
import { useState, useEffect } from "react";
import { columns } from "../../utils/table/orders/columns";
import { DataTable } from "../../components/ui/data-table";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosRequest from "../../hooks/useAxiosRequest";
import { getCookieData } from "../../services/storage";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ToastAction } from "../../components/ui/toast";
import { useToast } from "../../components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import Loading from "../../components/table-skeleton";
import Query from "../../api/query";

const Orders = () => {
  const [token, setToken] = useState<string>("");
  const { error, sendRequest } = useAxiosRequest<any>();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const queryParamsArray = [
    {
      id: "transactions",
      url: "user/transactions",
    },
  ];

  const { queries, handleDataUpdate } = Query(queryParamsArray);

  const mutation = useMutation({
    mutationFn: (newProducts: any) => {
      return sendRequest("post", "product/add", newProducts, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  useEffect(() => {
    const tokenData = getCookieData("token");
    if (tokenData) {
      setToken(tokenData);
    }
  }, [token]);

  useEffect(() => {
    if (mutation.isError) {
      toast({
        variant: "destructive",
        title: "Uh oh! we've got a problem.",
        description: error?.message,
        action: <ToastAction altText='Try again'>Try again</ToastAction>,
      });
    }
    if (mutation.isSuccess) {
      toast({
        title: "Success! All done.",
        description: "Product added successfully!",
        action: <ToastAction altText='done'>done</ToastAction>,
      });
    }
  }, [mutation.isError, error?.message, mutation.isSuccess, queries[0]]);

  return (
    <>
      <div className='w-full flex justify-start py-4 px-3'>
        <p className=' text-xl'>All Orders</p>
      </div>
      {queries[0].isLoading ? (
        <Loading />
      ) : (
        <div className='w-full overflow-x-scroll bg-white p-4 rounded-xl'>
          <DataTable
            columns={columns}
            data={queries[0].data.data}
            onDataUpdate={handleDataUpdate}
          />
        </div>
      )}
    </>
  );
};

export default Orders;
