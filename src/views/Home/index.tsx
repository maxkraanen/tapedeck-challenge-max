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
        <div className="text-center py-20 text-4xl">
          <p>
            Something went wrong when we were getting all casettes, please try
            again
          </p>
          <Link
            href="/"
            className="border-2 rounded-lg text-xl px-10 py-2 mt-8 border-black pt-8"
          >
            HOME
          </Link>
        </div>
      )}
    </div>
  );
};
