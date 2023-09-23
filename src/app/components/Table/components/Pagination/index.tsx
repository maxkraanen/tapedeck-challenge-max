import React from "react";
import { Table } from "@tanstack/react-table";
import { PaginationButton } from "./components";

interface Props {
  table: Table<any>;
}

export const Pagination: React.FC<Props> = ({ table }) => {
  return (
    <div className="text-3xl flex items-center flex-col mt-10 mb-14">
      <div className="flex mb-8">
        <PaginationButton
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </PaginationButton>
        <PaginationButton
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </PaginationButton>
        <PaginationButton
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </PaginationButton>
        <PaginationButton
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </PaginationButton>
      </div>
      <div>
        <span className="flex text-2xl">
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
      </div>
    </div>
  );
};
