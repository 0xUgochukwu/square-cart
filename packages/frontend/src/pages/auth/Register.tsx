/** @format */

import { useState } from "react";
import Input from "../../components1/Input";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState<any>({
    fullName: "",
    email: "",
    password: "",
  });

  const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleFormSubmit = () => {};
  return (
    <div className='min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12'>
      <div className='p-10 xs:p-0 mx-auto md:w-full md:max-w-md'>
        <h1 className='font-bold text-center text-2xl mb-5'>Your Logo</h1>
        <div className='bg-white shadow w-full rounded-lg divide-y divide-gray-200'>
          <div className='px-5 py-7'>
            <Input
              label='Full Name'
              name='fullName'
              value={formData.fullName}
              required
              changeFunction={handleFormChange}
            />
            <Input
              label='E-mail'
              name='email'
              value={formData.email}
              required
              changeFunction={handleFormChange}
            />
            <Input
              label='Password'
              name='password'
              value={formData.password}
              required
              changeFunction={handleFormChange}
            />
            <Button className='w-full' onClick={handleFormSubmit}>
              Register
            </Button>
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
        </div>
      </div>
    </div>
  );
};
export default Register;
