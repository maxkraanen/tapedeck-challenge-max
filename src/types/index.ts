// not all tapes have all properties, to err on the side of caution
// I decided to make all properties optional, also because it's a third party API
export type TapeProperties = {
  page?: string;
  img?: string;
  thumb?: string;
  playingTime?: string;
  type?: string;
  color?: string;
  brand?: string;
};

export type Tape = {
  [key: string]: Array<
    | { page?: string }
    | { img?: string }
    | { thumb?: string }
    | { playingTime?: string }
    | { type?: string }
    | { color?: string }
    | { brand?: string }
  >;
};

export type TapeEntry = {
  [key: string]: TapeProperties[];
};
