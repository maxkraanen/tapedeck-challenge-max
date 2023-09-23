import { fetchData } from "@/utils";
import { Tape, TapeProperties } from "@/types";
import { Home } from "@/views";

export default async function Page() {
  const data = await fetchData();

  const flattenTapeInfo = (tape: Tape[string]): TapeProperties => {
    return tape.reduce(
      (acc, obj) => ({ ...acc, ...obj }),
      {} as any
    ) as TapeProperties;
  };

  const flattenedData: TapeProperties[] | undefined = data?.map((entry) => {
    const key = Object.keys(entry)[0];
    return flattenTapeInfo(entry[key]);
  });

  return <Home data={flattenedData} />;
}
