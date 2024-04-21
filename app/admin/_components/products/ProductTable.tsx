"use client";

import React, { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CiExport } from "react-icons/ci";
import TableSerach from "../TableSerach";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { Pagination } from "@mui/material";

const columns: ColumnDef<unknown, any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }: { row: any }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }: { row: any }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }: { row: any }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "sales.day",
    header: "Sales/Day",
    cell: ({ row }: { row: any }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "sales.month",
    header: "Sales/Month",
    cell: ({ row }: { row: any }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }: { row: any }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "sales.totalSales",
    header: "Sales",
    cell: ({ row }: { row: any }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "revenue",
    header: "Revenue",
    cell: ({ row }: { row: any }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created On",
    cell: ({ row }: { row: any }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Last Update",
    cell: ({ row }: { row: any }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }: { row: any }) => <div className="capitalize">1</div>,
  },
];

const ProductTable = () => {
  const router = useRouter();
  const table = useReactTable({
    data: [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [action, setAction] = useState("");
  const [page, setPage] = useState(1);

  const onSerachChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (val: string) => {
    setCategory(val);
  };

  const handlePriceChange = (val: string) => {
    setPrice(val);
  };

  const handleActionChange = (val: string) => {
    if (val === "reset") {
      setSearchTerm("");
      setCategory("");
      setPrice("");
      setAction("");
    }
    setAction(val);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  return (
    <div className="bg-white border-b border-r border-l shadow rounded-lg mt-8">
      <div className="flex flex-col flex-wrap px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4 border-b border-b-gray-300">
        <div className="flex items-center flex-1 space-x-4">
          <h5>
            <span className="text-gray-500">All Products:</span>
            <span className="dark:text-white">123456</span>
          </h5>
          <h5>
            <span className="text-gray-500">Total sales:</span>
            <span className="dark:text-white">$88.4k</span>
          </h5>
        </div>
        <div className="flex flex-col flex-shrink-0 space-y-3  md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
          <Button
            onClick={() => router.push("/admin/products/add-product")}
            type="button"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add new product
          </Button>
          <button
            type="button"
            className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-400 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Update stocks 1/250
          </button>
          <button
            type="button"
            className="flex items-center justify-center flex-shrink-0 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-400 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <CiExport className="w-5 h-5 mr-2 text-black" />
            Export
          </button>
        </div>
      </div>
      <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4 border-b border-b-gray-300">
        <div className="md:max-w-md w-full">
          <TableSerach value={searchTerm} onChange={onSerachChange} />
        </div>
        <div className="flex gap-3 sm:flex-row flex-col">
          <Select
            onValueChange={(val) => handleCategoryChange(val)}
            value={category}
          >
            <SelectTrigger className="md:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(val) => handlePriceChange(val)} value={price}>
            <SelectTrigger className="md:w-[180px]">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(val) => handleActionChange(val)}
            value={action}
          >
            <SelectTrigger className="md:w-[180px]">
              <SelectValue placeholder="Action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Mass Edit</SelectItem>
              <SelectItem value="dark">Delete All</SelectItem>
              <SelectItem value="reset">Reset</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="w-full relative overflow-x-auto">
        {/* <Table className="relative lg:w-full w-[1200px]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
        </Table> */}
      </div>
      <nav
        className="flex flex-col items-start justify-between p-4 space-y-3 lg:flex-row lg:items-center lg:space-y-0"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500">
          Showing
          <span className="font-semibold text-gray-900 mx-1">1-10</span>
          of
          <span className="font-semibold text-gray-900 mx-1">1000</span>
        </span>

        <Pagination
          count={10}
          variant="outlined"
          shape="rounded"
          page={page}
          color="primary"
          onChange={handlePageChange}
        />
      </nav>
    </div>
  );
};

export default ProductTable;
