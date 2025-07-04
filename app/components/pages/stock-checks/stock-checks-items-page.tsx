"use client";
import { useEffect } from "react";
import {
  CLIENT_COLLECTOR_REQ,
  GET_STOCK_CHECKS_ITEMS_REQ,
} from "@/app/utils/requests/client-side.requests";
import { useRouter } from "next/navigation";
import { useSearch } from "@/app/utils/contexts/search-results-contexts";
import StockChecksItemsTable from "../../tables/stock-checks-items-table";

export default function StockChecksPage({ id }: { id: string }) {
  const router = useRouter();
  const { fillSearch, getSearch } = useSearch();
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_STOCK_CHECKS_ITEMS_REQ, { id });

    if (response.done) {
      fillSearch("stockChecksItems", {
        results: response.data?.items,
        total: response.data?.items.length,
      });
    } else {
      router.replace("/log-in");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const data = getSearch("stockChecksItems").results;
  return (
    <>
      <div className="px-mainxs relative">
        <StockChecksItemsTable data={data} />
      </div>
    </>
  );
}
