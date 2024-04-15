/** @format */
import { useState, useEffect } from "react";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import { Plus } from "lucide-react";
import Upload from "../../components/upload";
import { columns } from "../../utils/columns";
import { DataTable } from "../../components/ui/data-table";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosRequest from "../../hooks/useAxiosRequest";
import { getCookieData } from "../../services/storage";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ToastAction } from "../../components/ui/toast";
import { useToast } from "../../components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import Loading from "../../components/loading";

const Orders = () => {
  const [token, setToken] = useState<string>("");
  const [formData, setFormData] = useState<any>({
    name: "",
    price: "",
    quantity: "",
    info: "",
    images: [],
  });
  const { loading, error, sendRequest } = useAxiosRequest<any>();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => {
      return sendRequest("get", "product/", null, token);
    },
  });

  const mutation = useMutation({
    mutationFn: (newProducts: any) => {
      return sendRequest("post", "product/add", newProducts, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleFormSubmit = () => {
    mutation.mutate(formData);
  };

  useEffect(() => {
    const tokenData = getCookieData("token");
    if (tokenData) {
      setToken(tokenData);
    }
  }, []);

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
  }, [mutation.isError, error?.message, mutation.isSuccess, data]);

  return (
    <>
      <div className='w-full flex justify-start py-4 px-3'>
        <p className=' text-xl'>All Orders</p>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='w-full overflow-x-scroll bg-white p-4'>
          <DataTable columns={columns} data={data.message} />
        </div>
      )}
    </>
  );
};

export default Orders;
