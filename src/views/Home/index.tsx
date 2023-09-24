import { FC } from "react";
import Link from "next/link";
import { TapeProperties } from "@/types";
import { Table } from "@/components";

interface Props {
  data?: TapeProperties[];
}

export const Home: FC<Props> = ({ data }) => {
  return (
    <div className="bg-[#E7F4F2] flex items-center flex-col pt-12 min-h-screen h-full">
      <h1 className="text-6xl">Cassette Tapes</h1>
      {data ? (
        <Table data={data} />
      ) : (
        // If something went wrong with fetching the data we show the error state.
        <div className="py-20 text-4xl text-center">
          <p>
            Something went wrong when we were getting all casettes, please try
            again
          </p>
          <Link
            href="/"
            className="px-10 py-2 pt-8 mt-8 text-xl border-2 border-black rounded-lg"
          >
            HOME
          </Link>
        </div>
      )}
    </div>
  );
};
