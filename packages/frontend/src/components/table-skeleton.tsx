import { Skeleton } from "./ui/skeleton";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table";

const TableSkeleton = () => {
  return (
    <div className='space-x-4 p-5 bg-white'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>
              <Skeleton className='h-4 w-full' />
            </TableHead>
            <TableHead>
              <Skeleton className='h-4 w-full' />
            </TableHead>
            <TableHead>
              <Skeleton className='h-4 w-full' />
            </TableHead>
            <TableHead>
              <Skeleton className='h-4 w-full' />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className='font-medium'>
              <Skeleton className='h-4 w-full' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-4 w-full' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-4 w-full' />
            </TableCell>
            <TableCell className='text-right'>
              <Skeleton className='h-4 w-full' />
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>
              <Skeleton className='h-4 w-full' />
            </TableCell>
            <TableCell className='text-right'>
              <Skeleton className='h-4 w-full' />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default TableSkeleton;
