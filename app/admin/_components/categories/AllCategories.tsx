"use client";

import React, { useState } from "react";
import TableSerach from "../TableSerach";
import { Button } from "@/components/ui/button";
import { Ellipsis, Plus, Trash2 } from "lucide-react";
import AddCategoryModal from "./AddCategoryModal";
import useAddCategoryStore from "@/store/addCategoryStore";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useCategories from "@/hooks/queries/useCategories";
import Image from "next/image";
import dayjs from "dayjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useDeleteAllCategorytore,
  useDeleteCategorytore,
  useEditCategorytore,
  useViewCategorytore,
} from "@/store/modalStore";
import { Category } from "@/types";
import ViewCategory from "./ViewCategory";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";
import DeleteAllCategory from "./DeleteAllCategory";
import { Pagination } from "@mui/material";
import NoDataTable from "../NoDataTable";

const AllCategories = () => {
  const addCategoryStore = useAddCategoryStore();
  const showCategory = useViewCategorytore();
  const editCategory = useEditCategorytore();
  const deleteCategory = useDeleteCategorytore();
  const deleteAllCategory = useDeleteAllCategorytore();
  const [selectViewCategory, setSelectViewCategory] = useState<Category | null>(
    null
  );
  const [selectEditCategory, setSelectEditCategory] = useState<Category | null>(
    null
  );
  const [selectDeleteCategory, setSelectDeleteCategory] =
    useState<Category | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const onSerachChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleShowCategory = (category: Category) => {
    setSelectViewCategory(category);
    showCategory.onOpen();
  };

  const handleEditCategory = (category: Category) => {
    setSelectEditCategory(category);
    editCategory.onOpen();
  };

  const handleDeleteCategory = (category: Category) => {
    setSelectDeleteCategory(category);
    deleteCategory.onOpen();
  };

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
      accessorKey: "image",
      header: "Category",
      cell: ({ row }: { row: any }) => {
        return (
          <Image
            src={row.getValue("image").url}
            alt={row.getValue("image").id}
            width={50}
            height={50}
            className="rounded object-contain"
          />
        );
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }: { row: any }) => row.getValue("name"),
    },

    {
      accessorKey: "createdAt",
      header: "Created On",
      cell: ({ row }: { row: any }) => (
        <div className="capitalize">
          {dayjs(row.getValue("createdAt")).format("DD-MM-YYYY")}
        </div>
      ),
    },
    {
      accessorKey: "updatedAt",
      header: "Last Update",
      cell: ({ row }: { row: any }) => (
        <div className="capitalize">
          {dayjs(row.getValue("updatedAt")).format("DD-MM-YYYY")}
        </div>
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }: { row: any }) => {
        const category = row.original;
        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Ellipsis />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleShowCategory(category)}>
                  Show
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleEditCategory(category)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => handleDeleteCategory(category)}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      },
    },
  ];

  const { categories } = useCategories();

  const table = useReactTable({
    data: categories || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setSearchTerm,
    state: {
      globalFilter: searchTerm,
    },
  });

  const getSelectedRows = () => {
    const selectedRows = table
      .getRowModel()
      .rows.filter((row) => row.getIsSelected());
    return selectedRows.map((row) => row.original);
  };

  const selectedRows = getSelectedRows();

  if (!table) return null;

  return (
    <>
      <div className="flex sm:flex-row flex-col-reverse md:items-center md:justify-between gap-4 mt-8">
        <div className="md:max-w-md w-full">
          <TableSerach value={searchTerm} onChange={onSerachChange} />
        </div>
        <div className="flex items-center gap-2">
          {selectedRows.length > 0 && (
            <Button onClick={deleteAllCategory.onOpen} variant="destructive">
              <Trash2 size={20} />
            </Button>
          )}
          <Button onClick={addCategoryStore.onOpen} type="button">
            <Plus className="w-4 h-4 mr-2" />
            Add new category
          </Button>
        </div>
      </div>

      <AddCategoryModal />

      <div className={`w-full relative overflow-x-auto mt-8 bg-white rounded-t-lg ${table.getRowModel().rows.length !== 0 ? "shadow" : ""}`}>
        <Table className="relative lg:w-full w-[1200px]">
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

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {table.getRowModel().rows.length === 0 && <NoDataTable />}
      <nav
        className="flex flex-col items-start justify-between p-4 space-y-3 lg:flex-row lg:items-center lg:space-y-0 bg-white shadow rounded-b-lg"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500">
          Showing
          <span className="font-semibold text-gray-900 mx-1">
            {table.getState().pagination.pageIndex + 1}
          </span>
          of
          <span className="font-semibold text-gray-900 mx-1">
            {table.getPageCount()}
          </span>
        </span>

        <Pagination
          count={table.getPageCount()}
          variant="outlined"
          shape="rounded"
          page={table.getState().pagination.pageIndex + 1}
          color="primary"
          onChange={(_, value: number) => {
            const page = value ? Number(value) - 1 : 0;
            table.setPageIndex(page);
          }}
       
        />
      </nav>

      {showCategory.open && (
        <ViewCategory category={selectViewCategory as Category} />
      )}

      {editCategory.open && (
        <EditCategory category={selectEditCategory as Category} />
      )}
      {deleteCategory.open && (
        <DeleteCategory category={selectDeleteCategory as Category} />
      )}
      {deleteAllCategory.open && selectedRows.length > 0 && (
        <DeleteAllCategory categories={selectedRows as Category[]} />
      )}
    </>
  );
};

export default AllCategories;
