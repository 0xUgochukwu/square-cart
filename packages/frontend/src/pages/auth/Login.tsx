/** @format */

import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "../../components/ui/label";
import useAxiosRequest from "../../hooks/useAxiosRequest";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";
import { setCookie } from "../../services/storage";

const Login = () => {
  const [formData, setFormData] = useState<any>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { loading, error, sendRequest } = useAxiosRequest<any>();

  const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleFormSubmit = async () => {
    try {
      const data = await sendRequest("post", "auth/login", formData);
      setCookie("@user", JSON.stringify(data.data), 1);
      toast("success", {
        description: data.message,
        action: {
          label: "clear",
          onClick: () => console.log("clear"),
        },
      });
      navigate("/dashboard/home");
    } catch (error: any) {
      console.error("Error occurred during registration:", error.message);
    }
  };
  return (
    <>
      <div className='px-5 py-7'>
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
            "Login"
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
          <div className='text-center sm:text-left whitespace-nowrap'>
            <Link
              to={"/register"}
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
              <span className='inline-block ml-1'>Create Account</span>
            </Link>
          </div>
          {/* <div className='text-center sm:text-right whitespace-nowrap'>
                <button className='transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    className='w-4 h-4 inline-block align-text-bottom	'>
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z'
                    />
                  </svg>
                  <span className='inline-block ml-1'>Help</span>
                </button>
              </div> */}
        </div>
      </div>
    </>
  );
};
export default Login;
