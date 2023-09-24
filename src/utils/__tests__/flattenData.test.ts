import { flattenData } from "../flattenData";
import { TapeProperties } from "@/types";

describe("flattenData", () => {
  it("should flatten the data correctly", () => {
    const mockData = [
      {
        sampleKey: [
          { page: "somePage" },
          { img: "someImage" },
          { brand: "someBrand" },
        ],
      },
      {
        sampleKey: [
          { page: "somePage2" },
          { img: "someImage2" },
          { brand: "someBrand2" },
        ],
      },
    ];

    const expectedResult: TapeProperties[] = [
      {
        page: "somePage",
        img: "someImage",
        brand: "someBrand",
      },
      {
        page: "somePage2",
        img: "someImage2",
        brand: "someBrand2",
      },
    ];

    expect(flattenData(mockData)).toEqual(expectedResult);
  });

  it("should return undefined when no data is provided", () => {
    expect(flattenData()).toBeUndefined();
  });
});
