/** @format */

import { Card } from "./ui/card";

const Header = ({ image }: { image: string }) => {
  return (
    <div className='pb-5'>
      <Card className='bg-white text-blue-800 px-10 py-1 z-10 w-full'>
        <div className='flex items-center justify-between py-2 text-5x1'>
          <div className='font-bold text-[#399CE5] text-xl'>
            Admin<span className='text-orange-600'>Panel</span>
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
