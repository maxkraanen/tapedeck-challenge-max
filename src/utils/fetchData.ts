import { Tape } from "@/types";

export const fetchData = async (): Promise<Tape[] | undefined> => {
  const API_KEY = process.env.API_KEY;
  const MAX_RETRIES = 3;

  if (!API_KEY) {
    throw new Error("Please make sure you supply a valid API key");
  }

  let attempts = 0;
  while (attempts < MAX_RETRIES) {
    try {
      const res = await fetch("https://tapedeck-api-fresk.vercel.app/api", {
        headers: {
          "x-api-key": API_KEY,
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch data on attempt ${attempts + 1}`);
      }

      return await res.json();
    } catch (error) {
      attempts++;
      if (attempts === MAX_RETRIES) {
        throw new Error("Failed to fetch data after multiple attempts");
      }
    }
  }
};
