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
  ReloadIcon,
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select";
import { NavLink } from "react-router-dom";
import { useToast } from "./use-toast";
import { ToastAction } from "./toast";
import Mutation from "../../api/mutation";
import { useLocation } from "react-router-dom";
import { Plus } from "lucide-react";
import { Label } from "./label";

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
  const [videoLink, setVideoLink] = useState<{ [key: string]: string }>({});
  const [startTime, setStartTime] = useState<{ [key: string]: string }>({});
  const [endTime, setEndTime] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [rowSelection, setRowSelection] = useState<{ [key: number]: boolean }>(
    {}
  );
  const { mutation } = Mutation();

  useEffect(() => {
    const initialRowSelection: { [key: number]: boolean } = {};

    data.forEach((item: any, index: number) => {
      if (item?.active) {
        initialRowSelection[index] = true;
      }
    });
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

  const handleRefund = async (id: string) => {
    try {
      const data = {
        method: "post",
        url: `product/refund`,
        content: { id },
      };
      const refundItem = await mutation.mutateAsync(data);
      if (refundItem.success) {
        onDataUpdate();
        toast({
          title: "Success",
          description: refundItem.message,
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

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputName
  : string) => {
    const target = e.target as HTMLInputElement;
    if (inputName === "video") {
      setVideoLink((prev) => ({
        ...prev,
        [target.name]: target.value,
      }));
    }
    if (inputName === "start") {
      setStartTime((prev) => ({
        ...prev,
        [target.name]: target.value,
      }));
    }
    if (inputName === "end") {
      setEndTime((prev) => ({
        ...prev,
        [target.name]: target.value,
      }));
    }
  };

  const handleFormSubmit = async (id: string) => {
    try {
      setLoading(true);
      const content = {
        youtube_id: videoLink[`youtube_id_${id}`],
        start: startTime[`start_${id}`],
        end: endTime[`end_${id}`],
      };
      const data = {
        method: "post",
        url: `product/youtube/${id}`,
        content,
      };
      const addToSocial = await mutation.mutateAsync(data);
      if (addToSocial.success) {
        toast({
          title: "Success",
          description: "Item successfully added to social",
          action: <ToastAction altText='done'>done</ToastAction>,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
              table.getRowModel().rows.map((row: any, rowIndex) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell: any) => (
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
                      ) : cell.column.id === "social" ? (
                        <Dialog>
                          <DialogTrigger>
                            <Button
                              variant={"outline"}
                              className='border-0 shadow-none active:bg-muted hover:bg-muted  '>
                              <Plus />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Add this item to your social
                              </DialogTitle>
                              <DialogDescription>
                                <Select>
                                  <SelectTrigger className='w-full'>
                                    <SelectValue placeholder='Select Social Media' />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectLabel>
                                        Select Social Media
                                      </SelectLabel>
                                      <SelectItem value='youtube'>
                                        Youtube
                                      </SelectItem>
                                      <SelectItem value='kick'>Kick</SelectItem>
                                      <SelectItem value='twitch'>
                                        Twitch
                                      </SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                                <div className='mt-2'>
                                  <Label>Video Link</Label>
                                  <Input
                                    type='text'
                                    className='mt-2'
                                    placeholder='Video Link'
                                    name={`youtube_id_${row.original._id}`}
                                    value={
                                      videoLink[
                                        `youtube_id_${row.original._id}`
                                      ]
                                    }
                                    required
                                    onChange={(e) =>
                                      handleFormChange(e, "video")
                                    }
                                  />
                                </div>
                                <div className='mt-2'>
                                  <Label>Start Time</Label>
                                  <Input
                                    type='number'
                                    placeholder='Start Time'
                                    name={`start_${row.original._id}`}
                                    className='mt-2'
                                    value={
                                      startTime[`start_${row.original._id}`]
                                    }
                                    required
                                    onChange={(e) =>
                                      handleFormChange(e, "start")
                                    }
                                  />
                                </div>
                                <div className='mt-2'>
                                  <Label>End Time</Label>
                                  <Input
                                    type='number'
                                    placeholder='End Time'
                                    className='mt-2'
                                    name={`end_${row.original._id}`}
                                    value={endTime[`end_${row.original._id}`]}
                                    required
                                    onChange={(e) => handleFormChange(e, "end")}
                                  />
                                </div>
                                <DialogClose className='mt-2 pb-5 w-full'>
                                  <Button
                                    className='w-full mt-5'
                                    onClick={() =>
                                      handleFormSubmit(row.original._id)
                                    }
                                    disabled={loading}>
                                    {loading ? (
                                      <>
                                        <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                                        Please wait
                                      </>
                                    ) : (
                                      "Submit"
                                    )}
                                  </Button>
                                </DialogClose>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
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
                                      <Button
                                        variant={"outline"}
                                        className='border-0 hover:shadow-none bg-transparent shadow-none'
                                        onClick={() =>
                                          handleRefund(row.original._id)
                                        }>
                                        Refund
                                      </Button>
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
