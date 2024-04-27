/** @format */

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../../components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "item",
    accessorFn: (row) => row.item.name,
    header: "Item",
    cell: ({ row }) => {
      const item: string = row.getValue("item");

      return <div className='font-medium'>{item}</div>;
    },
  },
  {
    accessorKey: "payment_id",
    header: "Payment ID",
    cell: ({ row }) => {
      return <Button variant='ghost'>{row.getValue("payment_id")}</Button>;
    },
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => {
      return <div className='font-medium'>{row.getValue("customer")}</div>;
    },
  },
  {
    id: "action",
    accessorKey: "_id",
    header: "Actions",
    enableHiding: false,
  },
];
