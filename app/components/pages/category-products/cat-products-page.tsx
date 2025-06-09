"use client";
import ProductsTable from "@/app/components/tables/products-table";
import {
  CLIENT_COLLECTOR_REQ,
  GET_CATEGORIES_PRODUCTS_REQ,
} from "@/app/utils/requests/client-side.requests";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CategoryProductsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [data, setData] = useState([]);
  const [catName, setCatName] = useState([]);
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_CATEGORIES_PRODUCTS_REQ, { id });
    console.log(response);
    if (response.done) {
      setData(response.data.products);
      setCatName(response.data.name);
    } else {
      router.replace("/log-in");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="px-mainxs">
      <ProductsTable
        isForCategory={true}
        data={data}
        title={`المنتجات التابعة لفئة ${catName}`}
        refetch={fetchData}
      />
    </div>
  );
}
