/** @format */

import { Card } from "./ui/card";
import logo from "/src/assets/social-mart-logo.jpeg";

const Header = ({ image }: { image: string }) => {
  return (
    <div className='pb-5'>
      <Card className='bg-white text-indigo-900 px-10 py-1 z-10 w-full'>
        <div className='flex items-center justify-between py-2 text-5x1'>
          <div className='font-bold text-indigo-900 text-xl flex items-center'>
            <img src={logo} alt='logo' className='w-9 rounded-full' />
            <span className='ml-2'>
              Square <span className='text-black'>Cart</span>
            </span>
          </div>
          <div className='flex items-center text-gray-500'>
            <img
              className={`bg-center bg-cover bg-no-repeat rounded-full inline-block h-12 w-12 ml-2`}
              src={image}
              alt='avatar'
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Header;
