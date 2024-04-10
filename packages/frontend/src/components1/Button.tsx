/** @format */

import React from "react";

const Button = {
  solid: ({
    label,
    icon,
    iconPosition = "right",
  }: {
    label: string;
    icon?: any;
    iconPosition?: string;
  }) => (
    <button
      type='button'
      className='transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block'>
      {iconPosition === "right" ? (
        <>
          <span className='inline-block mr-2'>{label}</span>
          {icon}
        </>
      ) : (
        <>
          {icon}
          <span className='inline-block mr-2'>{label}</span>
        </>
      )}
    </button>
  ),
  outline: ({
    label,
    icon,
    iconPosition = "right",
  }: {
    label: string;
    icon?: any;
    iconPosition?: string;
  }) => (
    <button
      type='button'
      className='transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block'>
      {iconPosition === "right" ? (
        <>
          <span className='inline-block mr-2'>{label}</span>
          {icon}
        </>
      ) : (
        <>
          {icon}
          <span className='inline-block mr-2'>{label}</span>
        </>
      )}
    </button>
  ),
  stale: ({
    label,
    icon,
    iconPosition = "right",
  }: {
    label: string;
    icon?: any;
    iconPosition?: string;
  }) => (
    <button className='transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset'>
      {iconPosition === "right" ? (
        <>
          <span className='inline-block ml-1'>{label}</span>
          {icon}
        </>
      ) : (
        <>
          {icon}
          <span className='inline-block ml-1'>{label}</span>
        </>
      )}
    </button>
  ),
};

export default Button;
