/** @format */

import { Skeleton } from "./ui/skeleton";
const EditSkeleton = () => {
  return (
    <div className='flex md:flex-row flex-col md:gap-20 md:pb-0 pb-24 p-5'>
      <div className='w-[100px]'>
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
      </div>
      <div className='w-full'>
        <div className='grid grid-cols-2 gap-4 p-4 bg-white rounded-lg'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
        </div>
      </div>
    </div>
  );
};

export default EditSkeleton;
