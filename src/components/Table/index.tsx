"use client";

import React from "react";

import {
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  FilterFn,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";

import { TapeProperties } from "@/types";
import { DebouncedInput, Pagination, TableHeader } from "./components";
import Image from "next/image";

const filter: FilterFn<any> = (row, columnId, value) => {
  return String(row.getValue(columnId))
    .toLowerCase()
    .includes(String(value).toLowerCase());
};

interface Props {
  data: TapeProperties[];
}

export const Table: React.FC<Props> = ({ data }) => {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");

  const columns = React.useMemo<ColumnDef<TapeProperties, any>[]>(
    () => [
      {
        header: () => {},
        accessorKey: "thumb",
        cell: ({ row }) => (
          <Image
            src={row.getValue("thumb")}
            alt={`${row.getValue("playingTime")} ${row.getValue("brand")}`}
            width={100}
            height={64}
            className="mb-4 mr-8"
          />
        ),
      },
      {
        accessorKey: "brand",
        header: () => <TableHeader>Brand</TableHeader>,
      },
      {
        accessorKey: "type",
        header: () => <TableHeader>Type</TableHeader>,
      },
      {
        accessorKey: "playingTime",
        header: () => <TableHeader>Playing time</TableHeader>,
      },
      {
        accessorKey: "color",
        header: () => <TableHeader>Color</TableHeader>,
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
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Check if there are no rows after filtering
  const isFilteredEmpty = table.getRowModel().rows.length === 0;

  return (
    <div className="p-10">
      <div className="flex justify-center pb-14">
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          placeholder="Search for type, time, color or brand..."
        />
      </div>
      {/* If there are no filter results we show the empty state */}
      {isFilteredEmpty ? (
        <div className="py-20 text-4xl text-center">
          <p>No results!</p>
          <button
            onClick={() => setGlobalFilter("")}
            type="button"
            className="px-10 py-2 mt-8 text-xl border-2 border-black rounded-lg"
          >
            RESET
          </button>
        </div>
      ) : (
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
                <tr key={row.id} data-testid="tableRow">
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
      )}
      <Pagination table={table} />
    </div>
  );
};
