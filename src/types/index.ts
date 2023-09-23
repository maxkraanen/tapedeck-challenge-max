export type Tape = {
  [key: string]: [
    { page: string },
    { img: string },
    { thumb: string },
    { playingTime: string },
    { type: string },
    { color: string },
    { brand: string }
  ];
};

export type TapeProperties = {
  page: string;
  img: string;
  thumb: string;
  playingTime: string;
  type: string;
  color: string;
  brand: string;
};

// Type for each entry in the data array
export type TapeEntry = {
  [key: string]: TapeProperties[];
};

// Type for the final flattened structure
export type FlattenedTapes = {
  [key: string]: TapeProperties;
};
