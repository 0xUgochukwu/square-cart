import { Skeleton } from "./ui/skeleton";

const Loading = () => {
  return (
    <div className='flex items-center md:justify-between justify-center space-x-4 p-5'>
      <div className='space-y-2'>
        <Skeleton className='h-4 md:w-[250px] w-[350]' />
        <Skeleton className='h-4 md:w-[250px] w-[350]' />
      </div>
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[250px]' />
        <Skeleton className='h-4 w-[250px]' />
      </div>
    </div>
  );
};

export default Loading;
