/** @format */

import React from "react";
import logo from "/src/assets/social-mart-logo.jpeg";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12'>
      <div className='p-10 xs:p-0 mx-auto md:w-full md:max-w-md'>
        <div className="flex justify-center">
          <img src={logo} alt='logo' className='mb-5 w-14 rounded-full' />
        </div>
        <div className='bg-white shadow w-full rounded-lg divide-y divide-gray-200'>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
