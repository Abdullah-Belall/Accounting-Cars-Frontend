"use client";
import { useEffect } from "react";
import {
  CLIENT_COLLECTOR_REQ,
  GET_ALL_RETURNS_REQ,
} from "@/app/utils/requests/client-side.requests";
import { useRouter } from "next/navigation";
import ReturnsTable from "@/app/components/tables/returns-table";
import { useSearch } from "@/app/utils/contexts/search-results-contexts";

export default function ReturnsPage() {
  const router = useRouter();
  const { fillSearch, getSearch } = useSearch();
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_ALL_RETURNS_REQ);
    console.log(response);
    if (response.done) {
      fillSearch("returns", { results: response.data?.returns_items, total: response.data?.total });
    } else {
      router.replace("/log-in");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="px-mainxs relative">
        <ReturnsTable
          isMainTable={true}
          title={"فواتير المرتجعات"}
          data={getSearch("returns").results}
        />
      </div>
    </>
  );
}
