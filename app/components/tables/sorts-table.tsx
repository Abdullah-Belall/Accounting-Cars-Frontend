"use client";
import { useEffect, useState } from "react";
import SortsTableRows from "../products/sorts-rows";
import MainTable from "./main-table";
import {
  CLIENT_COLLECTOR_REQ,
  GET_PRODUCT_SORTS_REQ,
} from "@/app/utils/requests/client-side.requests";
import { ProductItemInterface } from "@/app/utils/types/interfaces";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import NoData from "../common/no-data";

export default function SortsTable({ title, id }: { id: string; title: string }) {
  const [data, setData] = useState<ProductItemInterface[] | []>([]);
  const { openPopup } = usePopup();
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_PRODUCT_SORTS_REQ, { id });
    if (response.done) {
      setData(response.data.sorts);
    } else {
      // router.replace("/log-in");
    }
  };
  useEffect(() => {
    fetchData();
    openPopup("addSortPopup", { refetchOnAdded: fetchData });
  }, []);
  return (
    <>
      <MainTable
        title={`اصناف منتج ${title}`}
        headers={[
          "العمليات",
          "التاريخ",
          "ملاحظات",
          "عدد الطلبات",
          "السعر",
          "الكمية",
          "المقاس",
          "اللون",
          "الأسم",
          "*",
        ]}
      >
        {data.map((row, index) => (
          <SortsTableRows
            key={row.id}
            index={index + 1}
            id={row.id}
            name={row.name}
            color={row.color === "" || !row.color ? null : row.color}
            size={row.size}
            qty={row.qty}
            unit_price={row.unit_price}
            note={row.note === "" ? null : row.note}
            orders_count={row.orders_count}
            created_at={row.created_at}
            refetchOnEdit={fetchData}
          />
        ))}
      </MainTable>
      {data.length === 0 && <NoData />}
    </>
  );
}
