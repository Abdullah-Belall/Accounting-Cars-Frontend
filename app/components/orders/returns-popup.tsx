"use client";
import { useEffect, useState } from "react";
import ReturnsTable from "../tables/returns-table";
import {
  CLIENT_COLLECTOR_REQ,
  GET_ORDER_RETURNS_REQ,
} from "@/app/utils/requests/client-side.requests";

export default function ReturnsPopUp({ index, id }: { index: number | string; id: string }) {
  const [data, setData] = useState<any>();
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_ORDER_RETURNS_REQ, { id });
    console.log(response);
    if (response.done) {
      setData(response.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(data);
  return (
    <ReturnsTable
      isMainTable={false}
      title={`مرتجعات الطلب رقم ${index}`}
      data={data?.returns_items}
    />
  );
}
