"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CLIENT_COLLECTOR_REQ,
  GET_ALL_PRODUCTS_REQ,
} from "@/app/utils/requests/client-side.requests";
import { useSearch } from "@/app/utils/contexts/search-results-contexts";
import ProductsTable from "../../tables/products-table";

export default function ProductsPage() {
  const router = useRouter();
  const { fillSearch, getSearch } = useSearch();
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_ALL_PRODUCTS_REQ);
    if (response.done) {
      fillSearch("products", {
        results: response.data.products,
        total: response.data.products?.length,
      });
    } else {
      router.replace("/log-in");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const data = getSearch("products");
  return (
    <>
      <div className="px-mainxs">
        <ProductsTable
          isForCategory={false}
          title={"كل المنتجات"}
          data={data.results}
          cat={"الفئة"}
          refetch={fetchData}
        />
      </div>
    </>
  );
}
