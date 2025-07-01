"use client";
import {
  CLIENT_COLLECTOR_REQ,
  GET_ONE_RETURNS_REQ,
} from "@/app/utils/requests/client-side.requests";
import { useEffect, useState } from "react";
import ReturnsItemsTable from "../tables/returns-items-table";
import { ReturnDataInterface } from "@/app/utils/types/interfaces";

export default function ReturnsItemsPopup({ returnId }: { returnId: string }) {
  const [data, setData] = useState<undefined | ReturnDataInterface>();
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_ONE_RETURNS_REQ, { id: returnId });
    console.log(response);
    if (response.done) {
      setData(response.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-full lg:w-[1024px] px-mainxs">
      <div className="relative rounded-md shadow-md bg-myLight p-mainxl">
        <ReturnsItemsTable data={data as ReturnDataInterface} />
      </div>
    </div>
  );
}
