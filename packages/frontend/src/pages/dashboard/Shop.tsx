/** @format */
import { useState, useEffect } from "react";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import { Card } from "../../components/ui/card";
import { Plus } from "lucide-react";
import Upload from "../../components/upload";
import { Payment, columns } from "../../utils/columns";
import { DataTable } from "../../components/ui/data-table";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosRequest from "../../hooks/useAxiosRequest";
import { getCookieData } from "../../services/storage";
import { ReloadIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}

const Shop = () => {
  const [token, setToken] = useState<string>("");
  const [formData, setFormData] = useState<any>({
    name: "",
    price: "",
    quantity: "",
    info: "",
    images: [],
  });
  const { loading, error, sendRequest } = useAxiosRequest<any>();

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
      toast("error", {
        description: error?.message,
        action: {
          label: "clear",
          onClick: () => console.log("clear"),
        },
      });
    }
    if (mutation.isSuccess) {
      toast("success", {
        description: "Product added successfully!",
        action: {
          label: "clear",
          onClick: () => console.log("clear"),
        },
      });
    }
  }, [mutation.isError, error?.message, mutation.isSuccess]);

  return (
    <Card className='md:col-span-12 col-span-12 px-3'>
      <div className='w-full'>
        <div className='flex justify-end pt-4'>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant='outline' className='ml-auto'>
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
        <DataTable
          columns={columns}
          data={[
            {
              id: "728ed52f",
              amount: 100,
              image: "pending",
              name: "m@example.com",
            },
            // ...
          ]}
        />
      </div>
    </Card>
  );
};

export default Shop;
