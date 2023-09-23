import { FC } from "react";
import { TapeProperties } from "@/types";
import { Table } from "@/app/components";

interface Props {
  data: TapeProperties[];
}

export const Home: FC<Props> = ({ data }) => {
  return (
    <div className="bg-[#E7F4F2] flex items-center flex-col pt-12 h-screen">
      <h1 className="text-6xl">Cassette Tapes</h1>
      <Table data={data} />
    </div>
  );
};
