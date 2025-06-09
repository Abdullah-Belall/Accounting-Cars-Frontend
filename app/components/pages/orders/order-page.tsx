"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CLIENT_COLLECTOR_REQ,
  GET_ALL_ORDERS_REQ,
} from "@/app/utils/requests/client-side.requests";
import OrdersTable from "@/app/components/tables/orders-table";
import { useSearch } from "@/app/utils/contexts/search-results-contexts";

export default function OrdersPage() {
  const router = useRouter();
  const { fillSearch, getSearch } = useSearch();
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_ALL_ORDERS_REQ);
    console.log(response);
    if (response.done) {
      fillSearch("orders", { results: response.data.orders, total: response.data.total });
    } else {
      router.replace("/log-in");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="px-mainxs">
      <OrdersTable
        data={getSearch("orders").results}
        tableFor="overview"
        title="فواتير المبيعات"
        refetch={fetchData}
      />
    </div>
  );
}
