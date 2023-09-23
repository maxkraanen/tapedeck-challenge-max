"use client";

import React from "react";

import {
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  FilterFn,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";

import { TapeProperties } from "@/types";
import { DebouncedInput } from "./components";
import { Pagination } from "./components/Pagination";
import Image from "next/image";

const filter: FilterFn<any> = (row, columnId, value, addMeta) => {
  return String(row.getValue(columnId))
    .toLowerCase()
    .includes(String(value).toLowerCase());
};

interface Props {
  data: TapeProperties[];
}

export const Table: React.FC<Props> = ({ data }) => {
  console.log("data", data);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");

  const columns = React.useMemo<ColumnDef<TapeProperties, any>[]>(
    () => [
      {
        accessorKey: "thumb",
        header: () => {},
        cell: ({ row }) => (
          <Image
            src={row.getValue("thumb")}
            alt={`${row.getValue("playingTime")} ${row.getValue("brand")}`}
            width={100}
            height={64}
            className="mr-8 mb-4"
          />
        ),
      },
      {
        accessorKey: "brand",
        header: () => <div className="w-32 flex h-10">Brand</div>,
      },
      {
        accessorKey: "type",
        header: () => <div className="w-32 flex h-10">Type</div>,
      },
      {
        accessorKey: "playingTime",
        header: () => <div className="w-40 flex h-10">Playing time</div>,
      },
      {
        accessorKey: "color",
        header: () => <div className="w-32 flex h-10">Color</div>,
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      simple: filter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: filter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
  });

  return (
    <div className="p-10">
      <div className="flex justify-center pb-14">
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          placeholder="Search for type, time, color or brand..."
        />
      </div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination table={table} />
    </div>
  );
};
