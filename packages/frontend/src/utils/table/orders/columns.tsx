/** @format */

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../../components/ui/button";

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
    accessorKey: "amount",
    header: "Amount (USD)",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <Button variant='ghost'>{formatted}</Button>;
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity (Pcs)",
    cell: ({ row }) => {
      const quantity = parseFloat(row.getValue("quantity"));

      return <Button variant='ghost'>{quantity || 1}</Button>;
    },
  },

  {
    accessorKey: "type",
    header: "Status",
    cell: ({ row }) => {
      const status: string = row.getValue("type");

      return <Button variant='ghost'>{status}</Button>;
    },
  },
  {
    accessorKey: "customer_name",
    accessorFn: (row) => row.customer.name,
    header: "Customer Name",
    cell: ({ row }) => {
      const item: any = row.getValue("customer_name");
      return <div className='font-medium'>{item}</div>;
    },
  },
  {
    accessorKey: "customer_shippingAddress",
    accessorFn: (row) => row.customer.shippingAddress,
    header: "Shipping Address",
    cell: ({ row }) => {
      const item: any = row.getValue("customer_shippingAddress");
      return <div className='font-medium'>{item}</div>;
    },
  },
  {
    id: "action",
    accessorKey: "_id",
    header: "Actions",
    enableHiding: false,
  },
];
