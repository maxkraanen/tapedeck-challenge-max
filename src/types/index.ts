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

export type TapeEntry = {
  [key: string]: TapeProperties[];
};
