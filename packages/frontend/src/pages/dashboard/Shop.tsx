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
import { columns } from "../../utils/table/products/columns";
import { DataTable } from "../../components/ui/data-table";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ToastAction } from "../../components/ui/toast";
import { useToast } from "../../components/ui/use-toast";
import TableSkeleton from "../../components/table-skeleton";
import Query from "../../api/query";
import Mutation from "../../api/mutation";

const Shop = () => {
  const { toast } = useToast();
  const [product, setProduct] = useState<any>([]);
  const [formData, setFormData] = useState<any>({
    name: "",
    price: "",
    quantity: "",
    info: "",
    images: [],
  });

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
  const { queries, handleDataUpdate } = Query(queryParamsArray);
  const { mutation } = Mutation();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    setFormData({
      ...formData,
      info: target.value,
    });
    console.log(formData);
  };

  const handleFormSubmit = async () => {
    try {
      const data = { method: "post", url: "product/add", content: formData };
      const addNewProduct = await mutation.mutateAsync(data);
      if (addNewProduct.success) {
        setFormData({
          name: "",
          price: "",
          quantity: "",
          category: "",
          image: [],
        });
        toast({
          title: "Success! All done.",
          description: "Product added successfully!",
          action: <ToastAction altText='done'>done</ToastAction>,
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! we've got a problem.",
        description: error?.response?.data?.message,
        action: <ToastAction altText='Try again'>Try again</ToastAction>,
      });
    }
  };

  useEffect(() => {
    if (queries[0].data && queries[1].data) {
      if (queries[0]?.data?.message) {
        const combinedData = queries[0].data.message.map((item: any) => {
          if (item._id === queries[1].data.data.info?._id) {
            return { ...item, active: true };
          } else {
            return { ...item, active: false };
          }
        });
        setProduct(combinedData);
      }
    }
  }, [queries[0].data, queries[1].data]);

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
                  onChange={(e) => handleTextAreaChange(e)}
                />
              </div>
              <div className='grid w-full max-w-sm items-center gap-1.5'>
                <Label htmlFor='picture'>Product image</Label>
                <Upload updateFunction={setFormData} form={formData} />
              </div>
            </div>
            <SheetFooter>
              <Button onClick={handleFormSubmit} disabled={mutation.isPending}>
                {mutation.isPending ? (
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

      {queries[0].isLoading || queries[1].isLoading ? (
        <TableSkeleton />
      ) : (
        <div className='w-full overflow-x-scroll bg-white p-4 rounded-xl'>
          <DataTable
            columns={columns}
            data={product}
            onDataUpdate={handleDataUpdate}
          />
        </div>
      )}
    </>
  );
};

export default Shop;
