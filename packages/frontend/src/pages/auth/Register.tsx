/** @format */

import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import useAxiosRequest from "../../hooks/useAxiosRequest";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useToast } from "../../components/ui/use-toast";
import { setCookie, setLocalStorage } from "../../services/storage";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ToastAction } from "../../components/ui/toast";

const Register = () => {
  const [formData, setFormData] = useState<any>({
    name: "",
    email: "",
    password: "",
    tiktok: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  const { loading, error, sendRequest } = useAxiosRequest<any>();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleFormSubmit = async () => {
    try {
      const data = await sendRequest("post", "auth/signup", formData);
      const {
        user: { picture, ...userDataWithoutPictureUrl },
        token,
      } = data.data;

      setCookie("@user", JSON.stringify(userDataWithoutPictureUrl), 1);
      setCookie("@token", JSON.stringify(token), 1);
      setLocalStorage("@picture", JSON.stringify(picture));
      toast({
        title: "Success",
        description: data.message,
        action: <ToastAction altText='done'>done</ToastAction>,
      });
      navigate("/dashboard/home");
    } catch (error: any) {
      console.error("Error occurred during registration:", error.message);
    }
  };

  return (
    <>
      <div className='px-5 py-7'>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='email'>Full Name</Label>
          <Input
            type='text'
            className='w-full'
            id='name'
            placeholder='Full Name'
            name='name'
            required
            value={formData.name}
            onChange={(e) => handleFormChange(e)}
          />
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5 mt-5'>
          <Label htmlFor='email'>Email</Label>
          <Input
            type='email'
            id='email'
            placeholder='Email'
            name='email'
            value={formData.email}
            required
            onChange={(e) => handleFormChange(e)}
          />
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5 mt-5'>
          <Label htmlFor='email'>Password</Label>
          <Input
            type='password'
            id='password'
            placeholder='Password'
            name='password'
            value={formData.password}
            required
            onChange={(e) => handleFormChange(e)}
          />
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5 mt-5'>
          <Label htmlFor='email'>Social</Label>
          <Input
            type='text'
            className='w-full'
            id='social'
            placeholder='Social media links (TikTok, Instagram, Youtube)'
            name='tiktok'
            value={formData.tiktok}
            required
            onChange={(e) => handleFormChange(e)}
          />
        </div>
        <Button
          className='w-full mt-5 mb-5'
          onClick={handleFormSubmit}
          disabled={loading}>
          {loading ? (
            <>
              <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
              Please wait
            </>
          ) : (
            "Create Account"
          )}
        </Button>
        {error && (
          <Alert variant='destructive'>
            <ExclamationTriangleIcon className='h-4 w-4' />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error?.message}</AlertDescription>
          </Alert>
        )}
      </div>
      <div className='py-5'>
        <div className='grid grid-cols-2 gap-1'>
          <div className='text-center sm:text-left whitespace-nowrap pl-3'>
            <Link
              to={"/"}
              className='transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                className='w-4 h-4 inline-block align-text-top'>
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z'
                />
              </svg>
              <span className='inline-block ml-1'>Login</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
