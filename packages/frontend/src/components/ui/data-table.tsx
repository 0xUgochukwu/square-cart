/** @format */

import { useEffect, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Input } from "./input";
import { Checkbox } from "./checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "./dialog";
import { NavLink } from "react-router-dom";
import { useToast } from "./use-toast";
import { ToastAction } from "./toast";
import Mutation from "../../api/mutation";
import { useLocation } from "react-router-dom";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onDataUpdate: () => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onDataUpdate,
}: DataTableProps<TData, TValue>) {
  const { toast } = useToast();
  const location = useLocation();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [tableType, setTableType] = useState<string>("order");
  const [rowSelection, setRowSelection] = useState<{ [key: number]: boolean }>(
    {}
  );
  const { mutation } = Mutation();

  useEffect(() => {
    const initialRowSelection: { [key: number]: boolean } = {};

    data.forEach((item, index) => {
      if (item?.active) {
        initialRowSelection[index] = true;
      }
    });
    if (initialRowSelection) {
      setTableType("shop");
    }
    setRowSelection(initialRowSelection);
  }, [data]);

  const [globalFilter, setGlobalFilter] = useState<string>("");

  const handleDelete = async (id: string) => {
    try {
      const data = {
        method: "delete",
        url: `product/${id}`,
        content: null,
      };
      const deleteItem = await mutation.mutateAsync(data);
      // console.log(deleteItem);
      if (deleteItem.success) {
        onDataUpdate();
        toast({
          title: "Success",
          description: "Item deleted successfully",
          action: <ToastAction altText='done'>done</ToastAction>,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckboxChange = async (index: number, item: any) => {
    const newRowSelection: { [key: number]: boolean } = {};
    newRowSelection[index] = !rowSelection[index];
    setRowSelection(newRowSelection);
    if (newRowSelection[index]) {
      try {
        const data = {
          method: "post",
          url: `product/active/${item._id}`,
          content: null,
        };
        const updateActiveItem = await mutation.mutateAsync(data);
        console.log(updateActiveItem);
        onDataUpdate();
        toast({
          title: "Success",
          description: "Item successfully updated as active",
          action: <ToastAction altText='done'>done</ToastAction>,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      <div className='flex items-center py-4'>
        <div className='flex items-center border rounded pl-2'>
          <MagnifyingGlassIcon />
          <Input
            placeholder='Search'
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className='border-0 shadow-none focus:outline-none focus:ring-0'
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              className='ml-auto border-gray-200 shadow-none rounded'>
              Columns <ChevronDownIcon className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='bg-background'>
            {table.getAllColumns().map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className='capitalize'
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='rounded border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, rowIndex) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className=''>
                      {cell.column.id === "active" ? (
                        <div className='flex justify-center md:w-1/3 w-full'>
                          <Checkbox
                            checked={
                              rowIndex in rowSelection && rowSelection[rowIndex]
                            }
                            onCheckedChange={() =>
                              handleCheckboxChange(rowIndex, row.original)
                            }
                            aria-label='Select row'
                          />
                        </div>
                      ) : cell.column.id === "action" ? (
                        <div className='flex justify-center md:w-1/3 w-full'>
                          <>
                            <Dialog>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant='ghost'
                                    className='h-8 w-8 p-0'>
                                    <span className='sr-only'>Open menu</span>
                                    <DotsHorizontalIcon className='h-4 w-4' />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align='end'>
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>
                                    {location.pathname === "/dashboard/shop" ? (
                                      <NavLink
                                        to={`/dashboard/edit-product/${row.original._id}`}>
                                        Edit item
                                      </NavLink>
                                    ) : (
                                      <NavLink
                                        to={`/dashboard/edit-product/${row.original._id}`}>
                                        Refund
                                      </NavLink>
                                    )}
                                  </DropdownMenuItem>
                                  {location.pathname === "/dashboard/shop" && (
                                    <>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem>
                                        <DialogTrigger>
                                          Delete Item
                                        </DialogTrigger>
                                      </DropdownMenuItem>
                                    </>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Are you sure?</DialogTitle>
                                  <DialogDescription>
                                    This action cannot be undone. Are you sure
                                    you want to permanently delete this item?
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <DialogClose>
                                    <Button
                                      onClick={() =>
                                        handleDelete(row.original._id)
                                      }>
                                      Confirm
                                    </Button>
                                  </DialogClose>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </>
                        </div>
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          {data && table.getFilteredSelectedRowModel().rows.length}{" "}
          {data && "of"} {data && table.getFilteredRowModel().rows.length}{" "}
          {data && "row(s)"}
          {data && "selected."}
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
