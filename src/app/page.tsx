import { fetchData, flattenData } from "@/utils";
import { Home } from "@/views";

export default async function Page() {
  const data = await fetchData();
  const flattenedData = flattenData(data);

  return <Home data={flattenedData} />;
}
