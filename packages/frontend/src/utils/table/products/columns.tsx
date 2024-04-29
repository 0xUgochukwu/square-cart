/** @format */

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../../components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<any>[] = [
  {
    id: "active",
    accessorKey: "active",
    header: "Active Product",
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "social",
    accessorKey: "social",
    header: "Add to Social",
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Product Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Amount (USD)",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className='font-medium'>{formatted}</div>;
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => {
      const quantity = parseFloat(row.getValue("quantity"));

      return <div className='font-medium'>{quantity}pcs</div>;
    },
  },
  {
    id: "action",
    accessorKey: "_id",
    header: "Actions",
    enableHiding: false,
  },
];
