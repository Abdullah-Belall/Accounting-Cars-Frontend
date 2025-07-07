"use client";
import {
  CLIENT_COLLECTOR_REQ,
  GET_ONE_RETURNS_REQ,
} from "@/app/utils/requests/client-side.requests";
import { useEffect, useState } from "react";
import ReturnsItemsTable from "../tables/returns-items-table";
import { ReturnDataInterface } from "@/app/utils/types/interfaces";
import { TbCircleXFilled } from "react-icons/tb";
import { usePopup } from "@/app/utils/contexts/popup-contexts";

export default function ReturnsItemsPopup({ returnId }: { returnId: string }) {
  const [data, setData] = useState<undefined | ReturnDataInterface>();
  const { closePopup } = usePopup();

  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_ONE_RETURNS_REQ, { id: returnId });

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
        <button
          onClick={() => closePopup("returnsItemsPopup")}
          className="flex justify-center items-center w-[25px] h-[25px] bg-background rounded-[50%] z-[5] cursor-pointer absolute right-[-10px] top-[-10px] "
        >
          <TbCircleXFilled className="min-w-[30px] min-h-[30px]" />
        </button>
        <ReturnsItemsTable data={data as ReturnDataInterface} />
      </div>
    </div>
  );
}
