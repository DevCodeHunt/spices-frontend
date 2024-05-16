"use client";

import React, { useMemo, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Ellipsis, Plus, RefreshCcw, Trash2 } from "lucide-react";
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
import { Pagination, Rating } from "@mui/material";
import useCategories from "@/hooks/queries/useCategories";
import { Category, Product } from "@/types";
import useAdmin from "@/hooks/queries/useAdmin";
import NoDataTable from "../NoDataTable";
import dayjs from "dayjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import {
  useDeleteAllProducttore,
  useDeleteProducttore,
} from "@/store/modalStore";
import DeleteProduct from "./DeleteProduct";
import DeleteAllProduct from "./DeleteAllProduct";

const ProductTable = () => {
  const router = useRouter();
  const { categories } = useCategories();
  const { productsQuery } = useAdmin();
  const deleteProduct = useDeleteProducttore();
  const deleteAllProduct = useDeleteAllProducttore();
  const [globalFilter, setGlobalFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [action, setAction] = useState("");
  const [selectDeleteProduct, setSelectDeleteProduct] =
    useState<Product | null>(null);

  const onSerachChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (val: string) => {
    setCategory(val);
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

  const handleDeleteProduct = (product: Product) => {
    setSelectDeleteProduct(product);
    deleteProduct.onOpen();
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
      accessorKey: "name",
      header: "Product",
      cell: ({ row }: { row: any }) => {
        const src = row.original.image.url;
        const name = row.original.name;
        const alt = `product-${row.original.image.id}`;

        return (
          <div className="flex gap-3 items-center">
            <Image
              src={src}
              alt={alt}
              width={70}
              height={70}
              className="rounded"
            />
            <span className="break-all font-medium">{name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }: { row: any }) => row.getValue("price"),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }: { row: any }) => (
        <div className="bg-blue-300 text-blue-700  p-1 text-sm px-4 font-medium text-center rounded capitalize">
          {row.getValue("category")}
        </div>
      ),
      meta: {
        filterVariant: "select",
      },
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }: { row: any }) => row.getValue("stock"),
    },
    {
      accessorKey: "salesPerDay",
      header: "Sales/Day",
      cell: ({ row }: { row: any }) => row.getValue("salesPerDay"),
    },
    {
      accessorKey: "salesPerMonth",
      header: "Sales/Month",
      cell: ({ row }: { row: any }) => row.getValue("salesPerMonth"),
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }: { row: any }) => (
        <div className="flex items-center mt-2.5 mb-5">
          <Rating
            defaultValue={row.getValue("rating").count}
            precision={0.5}
            readOnly
            size="medium"
          />
          <span className="ms-3">{row.getValue("rating").average}</span>
        </div>
      ),
    },
    {
      accessorKey: "totalSales",
      header: "Sales",
      cell: ({ row }: { row: any }) => row.getValue("totalSales"),
    },
    {
      accessorKey: "revenue",
      header: "Revenue",
      cell: ({ row }: { row: any }) => row.getValue("revenue"),
    },
    {
      accessorKey: "createdAt",
      header: "Created On",
      cell: ({ row }: { row: any }) =>
        dayjs(row.getValue("createdAt")).format("DD-MM-YYYY"),
    },
    {
      accessorKey: "updatedAt",
      header: "Last Update",
      cell: ({ row }: { row: any }) =>
        dayjs(row.getValue("updatedAt")).format("DD-MM-YYYY"),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }: { row: any }) => {
        const productId = row.original._id;
        const product = row.original;
        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="text-center mx-auto">
                <Ellipsis />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => {}}>Show</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    router.push(`/admin/products/edit-product/${productId}`)
                  }
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => handleDeleteProduct(product)}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      },
    },
  ];

  const table = useReactTable({
    data: productsQuery.data?.products || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    state: {
      globalFilter: globalFilter,
    },
  });

  const getSelectedRows = () => {
    const selectedRows = table
      .getRowModel()
      .rows.filter((row) => row.getIsSelected());
    return selectedRows.map((row) => row.original);
  };

  const selectedRows = getSelectedRows();

  // Global Filtering Table with search, category, price
  const products = useMemo(() => {
    const products = table
      .getRowModel()
      .rows.filter((row) => row.original)
      .map((row) => row.original);
    return products;
  }, [table]);

  const parsePriceRange = (priceRange: string) => {
    if (priceRange === "All") {
      return [0, Infinity]; // Return range covering all possible prices
    }
    const [min, max] = priceRange
      .split("-")
      .map((str) => parseInt(str.replace("₹", ""), 10));
    return [min, max];
  };

  const handlePriceChange = (val: string) => {
    setGlobalFilter(val);
    const filteredProducts = products.filter((product: any) => {
      const productPrice = product.price;
      const [min, max] = parsePriceRange(val);

      return productPrice >= min && productPrice <= max;
    });

    table.setOptions((currentOptions) => ({
      ...currentOptions,
      data: filteredProducts,
    }));
    
  };

  if (!table) {
    return null;
  }

  return (
    <>
      <div className="bg-white border-b border-r border-l shadow rounded-lg mt-8">
        <div className="flex flex-col flex-wrap px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4 border-b border-b-gray-300">
          <div className="flex items-center flex-1 flex-wrap gap-4">
            <h5>
              <span className="text-gray-500">All Products:</span>
              <span className="dark:text-white">
                {productsQuery.data?.totalProducts}
              </span>
            </h5>
            <h5>
              <span className="text-gray-500">Total sales:</span>
              <span className="dark:text-white">
                {productsQuery.data?.totalSales}
              </span>
            </h5>
          </div>
          <div className="flex flex-col flex-shrink-0 space-y-3  md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
            {selectedRows.length > 0 && (
              <Button onClick={deleteAllProduct.onOpen} variant="destructive">
                <Trash2 size={20} />
              </Button>
            )}
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
                {categories &&
                  categories.map((category: Category, index: number) => (
                    <SelectItem key={index} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Select
              onValueChange={(val) => handlePriceChange(val)}
              value={price}
            >
              <SelectTrigger className="md:w-[180px]">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                {["All", "₹1-50", "₹50-100", "₹100-150", "₹150+"].map(
                  (price: string, index: number) => (
                    <SelectItem key={index} value={price}>
                      {price}
                    </SelectItem>
                  )
                )}
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
                <SelectItem value="Action" onClick={deleteAllProduct.onOpen}>
                  Delete All
                </SelectItem>
                <SelectItem value="reset">Reset</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="w-full relative overflow-x-auto">
          <Table className="relative min-[1700px]:w-full w-[1500px]">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="whitespace-nowrap text-center"
                      >
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
                    <TableCell
                      key={cell.id}
                      className="whitespace-nowrap text-center"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
      </div>

      {deleteProduct.open && (
        <DeleteProduct product={selectDeleteProduct as Product} />
      )}
      {deleteAllProduct.open && (
        <DeleteAllProduct products={selectedRows as Product[]} />
      )}
    </>
  );
};

export default ProductTable;
