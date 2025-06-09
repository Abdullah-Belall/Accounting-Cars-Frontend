"use client";
import { useEffect } from "react";
import { CLIENT_COLLECTOR_REQ, GET_ALL_COSTS_REQ } from "@/app/utils/requests/client-side.requests";
import { useRouter } from "next/navigation";
import CostsTable from "@/app/components/tables/costs-table";
import { useSearch } from "@/app/utils/contexts/search-results-contexts";

export default function CostsPage() {
  const router = useRouter();
  const { fillSearch, getSearch } = useSearch();
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_ALL_COSTS_REQ);
    console.log(response);
    if (response.done) {
      fillSearch("costs", { results: response.data?.costs, total: response.data?.total });
    } else {
      router.replace("/log-in");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const data = getSearch("costs").results;
  return (
    <>
      <div className="px-mainxs relative">
        <CostsTable data={data} />
      </div>
    </>
  );
}
