"use client";
import { useEffect } from "react";
import {
  CLIENT_COLLECTOR_REQ,
  GET_ALL_STOCK_CHECKS_REQ,
} from "@/app/utils/requests/client-side.requests";
import { useRouter } from "next/navigation";
import { useSearch } from "@/app/utils/contexts/search-results-contexts";
import StockChecksTable from "../../tables/stock-checks-table";

export default function StockChecksPage() {
  const router = useRouter();
  const { fillSearch, getSearch } = useSearch();
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_ALL_STOCK_CHECKS_REQ);

    if (response.done) {
      fillSearch("stockChecks", {
        results: response.data?.stockChecks,
        total: response.data?.total,
      });
    } else {
      router.replace("/log-in");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const data = getSearch("stockChecks").results;
  return (
    <>
      <div className="px-mainxs relative">
        <StockChecksTable data={data} />
      </div>
    </>
  );
}
