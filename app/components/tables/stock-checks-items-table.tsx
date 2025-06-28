"use client";
import { StockChecksItemsInterface } from "@/app/utils/types/interfaces";
import MainTable from "./main-table";
import NoData from "../common/no-data";
import StockChecksItemsTableRows from "../stock-checks/stock-checks-items-table-rows";

export default function StockChecksItemsTable({ data }: { data: StockChecksItemsInterface[] }) {
  return (
    <>
      <MainTable
        title={"الاصناف التابعة للجرد"}
        headers={[
          "الفرق",
          "الكمية الفعلية",
          "الكمية المسجلة",
          "المقاس",
          "الخامة",
          "اللون",
          "الصنف",
          "المنتج",
          "*",
        ]}
      >
        {data?.map((row, index) => (
          <StockChecksItemsTableRows
            key={index}
            id={row?.id}
            index={index + 1}
            created_at={row?.created_at}
            sort={row?.sort}
            recorded_quantity={row?.recorded_quantity}
            actual_quantity={row?.actual_quantity}
            difference={row?.difference}
          />
        ))}
      </MainTable>
      {data?.length === 0 && <NoData />}
    </>
  );
}
