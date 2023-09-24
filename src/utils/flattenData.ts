// the data returned from the API is not easy to use for the table
// so it's mapped to have an array of tape objects

import { Tape, TapeProperties } from "@/types";

const flattenTapeInfo = (tape: Tape[string]): TapeProperties => {
  // Merge all objects inside the tape array.
  return Object.assign({}, ...tape) as TapeProperties;
};

export function flattenData(data?: Tape[]): TapeProperties[] | undefined {
  if (!data) return undefined;

  // Map through each entry in the data,
  // get the key of the entry, and flatten its associated tape object.
  return data.map((entry) => {
    const key = Object.keys(entry)[0];
    return flattenTapeInfo(entry[key]);
  });
}
