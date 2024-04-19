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
import { useMutation, useQueries } from "@tanstack/react-query";
import useAxiosRequest from "../../hooks/useAxiosRequest";
import { getCookieData } from "../../services/storage";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ToastAction } from "../../components/ui/toast";
import { useToast } from "../../components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import TableSkeleton from "../../components/table-skeleton";

const Shop = () => {
  const [token, setToken] = useState<string>("");
  const [product, setProduct] = useState<any>([]);
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

  const queryParamsArray = [
    {
      id: "products",
      url: "product/",
    },
    {
      id: "active_product",
      url: "product/active",
    },
  ];

  const productQueries = useQueries({
    queries: queryParamsArray.map((user) => {
      return {
        queryKey: [user.id],
        queryFn: () => sendRequest("get", user.url, null, token)
      };
    }),
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

  const handleDataUpdate = () => {
    productQueries[0].refetch();
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
  }, [mutation.isError, error?.message, mutation.isSuccess]);

  useEffect(() => {
    if (productQueries[0].data && productQueries[1].data) {
      if (productQueries[0]?.data?.message) {
        const combinedData = productQueries[0].data.message.map((item: any) => {
          if (item._id === productQueries[1].data.data.info?._id) {
            return { ...item, active: true };
          } else {
            return { ...item, active: false };
          }
        });
        setProduct(combinedData);
      }
    }
  }, [productQueries[0].data, productQueries[1].data]);

  return (
    <>
      <div className='w-full flex justify-end pt-4 px-3'>
        <p className=' text-xl'>My Shop</p>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='outline' className='ml-auto mb-5'>
              Add Product <Plus className='ml-2 h-4 w-4' />
            </Button>
          </SheetTrigger>
          <SheetContent className=' overflow-y-scroll'>
            <SheetHeader>
              <SheetTitle>Add product</SheetTitle>
              <SheetDescription>
                Add your product here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className='grid gap-4 py-4'>
              <div>
                <Label htmlFor='name' className='text-right'>
                  Product Name
                </Label>
                <Input
                  id='name'
                  type='text'
                  name='name'
                  placeholder='Apple Iphone 12'
                  className='mt-2'
                  value={formData.name}
                  required
                  onChange={(e) => handleFormChange(e)}
                />
              </div>
              <div>
                <Label htmlFor='name' className='text-right'>
                  Price
                </Label>
                <Input
                  id='price'
                  name='price'
                  type='text'
                  placeholder='1000'
                  className='mt-2'
                  value={formData.price}
                  required
                  onChange={(e) => handleFormChange(e)}
                />
              </div>
              <div>
                <Label htmlFor='name' className='text-right'>
                  Quantity
                </Label>
                <Input
                  id='quantity'
                  name='quantity'
                  type='number'
                  placeholder='10'
                  className='mt-2'
                  value={formData.quantity}
                  required
                  onChange={(e) => handleFormChange(e)}
                />
              </div>
              <div className='grid w-full gap-1.5'>
                <Label htmlFor='message-2'>Product Info</Label>
                <Textarea
                  placeholder='Type the product info here...'
                  id='message-2'
                  name='info'
                  className='mt-2'
                  value={formData.info}
                  required
                  onChange={(e) => handleFormChange(e)}
                />
              </div>
              <div className='grid w-full max-w-sm items-center gap-1.5'>
                <Label htmlFor='picture'>Product image</Label>
                <Upload updateFunction={setFormData} form={formData} />
              </div>
            </div>
            <SheetFooter>
              <Button onClick={handleFormSubmit} disabled={loading}>
                {loading ? (
                  <>
                    <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                    Saving
                  </>
                ) : (
                  "Save changes"
                )}
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {productQueries[0].isLoading || productQueries[1].isLoading ? (
        <TableSkeleton />
      ) : (
        <div className='w-full overflow-x-scroll bg-white p-4'>
          <DataTable
            columns={columns}
            data={product}
            token={token}
            onDataUpdate={handleDataUpdate}
          />
        </div>
      )}
    </>
  );
};

export default Shop;
