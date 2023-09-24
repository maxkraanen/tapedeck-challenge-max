import { fetchData } from "../fetchData";
import { tapes as mockedTapes } from "@/__mocks__/tapesData";

// Mocking fetch
global.fetch = jest.fn();

describe("fetchData", () => {
  beforeAll(() => {
    process.env.API_KEY = "mock-api-key";
  });

  afterAll(() => {
    delete process.env.API_KEY;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches data successfully", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockedTapes),
    });

    const result = await fetchData();

    expect(result).toEqual(mockedTapes);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("fetch fails once but succeeds on retry", async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: false })
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockedTapes),
      });

    const result = await fetchData();

    expect(result).toEqual(mockedTapes);
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it("fetch fails continuously and reaches max retries", async () => {
    (fetch as jest.Mock).mockResolvedValue({ ok: false });

    const result = await expect(fetchData()).rejects.toThrow(
      "Failed to fetch data after multiple attempts"
    );
    expect(fetch).toHaveBeenCalledTimes(3);
    expect(result).toEqual(undefined);
  });
});
