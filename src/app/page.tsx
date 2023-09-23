import { FlattenedTapes, Tape, TapeProperties } from "@/types";
import { Home } from "@/views";

async function getData(): Promise<Tape[]> {
  const API_KEY = process.env.API_KEY;

  if (!API_KEY) {
    throw new Error("Please make sure you supply a valid API key");
  }

  const res = await fetch("https://tapedeck-api-fresk.vercel.app/api", {
    headers: {
      "x-api-key": API_KEY,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const data = await getData();

  const flattenTapeInfo = (tape: Tape[string]): TapeProperties => {
    return tape.reduce(
      (acc, obj) => ({ ...acc, ...obj }),
      {} as any
    ) as TapeProperties;
  };

  const flattenedData: FlattenedTapes = data.reduce((acc, entry) => {
    const key = Object.keys(entry)[0];
    acc[key] = flattenTapeInfo(entry[key]);
    return acc;
  }, {} as FlattenedTapes);

  return <Home data={flattenedData} />;
}
