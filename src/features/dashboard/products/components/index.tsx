// components/ProductTable.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Edit,
  SearchIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { ProductTableSkeleton } from "../../shared/Skeleton";
import CategoryFilter from "./CategoryFilter";
import StatusBox from "./StatusBox";
import { ProductListingTableType } from "../types";
import { useFiltereProductStore } from "../store/use-filtering";
import { useAllProductsForTable } from "../hooks/products";

const columns: ColumnDef<ProductListingTableType>[] = [
  {
    accessorKey: "mainImgUrl",
    header: "Image",
    cell: ({ row }) => (
      <Image
        src={row.original.mainImgUrl}
        height={50}
        width={50}
        className="rounded-md"
        alt="ProductImg"
      />
    ),
  },

  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "subCategory",
    header: "Sub-Category",
  },
  {
    accessorKey: "totalStock",
    header: "Stock",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => (
      <div className="inline-block">
        <StatusBox stock={info.row.original.totalStock} />
      </div>
    ),
  },
  {
    accessorKey: "finalPrice",
    header: "Price",
    cell: (info) => (
      <div>
        {info.row.original.finalPrice}{" "}
        <span className="text-xs text-gray-400">Taka</span>
      </div>
    ),
  },
  {
    header: "Actions",
    cell: (info) => (
      <div className="flex items-center gap-4">
        <MdDeleteOutline className="text-2xl text-red-600" />
        <Link href={`/dashboard/products/edit/${info.row.original.slug}`}>
          <Edit className="size-5 text-blue-600" />
        </Link>
      </div>
    ),
  },
];

const ProductTable = () => {
  // hooks
  const { selectedCategory, selectedSubCategory } = useFiltereProductStore();
  // states
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState<number>(5);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: limit,
  });

  // queries
  const { data, isLoading } = useAllProductsForTable({
    pageIndex: pagination.pageIndex,
    pageSize: limit,
    search,
    sorting,
    categoryInfo: {
      category: selectedCategory,
      sub_category: selectedSubCategory,
    },
  });

  // table hook
  const table = useReactTable({
    data: data?.allProducts || [],
    columns,
    pageCount: Math.ceil((data?.totalCount || 0) / pagination.pageSize),
    state: {
      sorting,
      pagination,
    },
    manualPagination: true,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
  });

  useEffect(() => {
    table.setPageIndex(0);
  }, [search, table]);

  return (
    <div className="w-full rounded-lg border p-4 shadow-lg">
      <h1 className="sr-only">Search Input</h1>
      <div className="mb-4 flex items-center justify-between">
        <div className="relative">
          <Input
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[260px] p-5 pl-8 shadow-md"
          />
          <SearchIcon className="absolute left-2 top-3 size-5 text-slate-500" />
        </div>
        <CategoryFilter />
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  <button
                    onClick={header.column.getToggleSortingHandler()}
                    className="flex items-center gap-1"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {header.column.getIsSorted() === "asc"
                      ? " 🔼"
                      : header.column.getIsSorted() === "desc"
                        ? " 🔽"
                        : ""}
                  </button>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                <ProductTableSkeleton count={limit} />
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No data found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center justify-center gap-2">
          <Select
            onValueChange={(e) => Number(setLimit(Number(e)))}
            defaultValue={limit.toString()}
          >
            <SelectTrigger className="w-[70px] bg-white py-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {[5, 10, 15, 20, 30].map((item) => (
                  <SelectItem className="" key={item} value={item.toString()}>
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <h1 className="text-sm opacity-55">
            Page {pagination.pageIndex + 1} of {table.getPageCount()}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setPagination({ ...pagination, pageIndex: 0 })}
            disabled={pagination.pageIndex === 0}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                pageIndex: Math.max(0, prev.pageIndex - 1),
              }))
            }
            disabled={pagination.pageIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                pageIndex: Math.min(
                  table.getPageCount() - 1,
                  prev.pageIndex + 1,
                ),
              }))
            }
            disabled={pagination.pageIndex >= table.getPageCount() - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              setPagination({
                ...pagination,
                pageIndex: table.getPageCount() - 1,
              })
            }
            disabled={pagination.pageIndex >= table.getPageCount() - 1}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
