"use client";
import { StockChecksInterface } from "@/app/utils/types/interfaces";
import MainTable from "./main-table";
import NoData from "../common/no-data";
import StockChecksTableRows from "../stock-checks/stock-checks-table-rows";

export default function StockChecksTable({ data }: { data: StockChecksInterface[] }) {
  return (
    <>
      <MainTable title={"كل الجرود"} headers={["*", "النوع", "العناصر", "ملاحظة", "التاريخ"]}>
        {data?.map((row, index) => (
          <StockChecksTableRows
            key={index}
            id={row.id}
            note={row.note}
            type={row.type}
            index={index + 1}
            created_at={row.created_at}
          />
        ))}
      </MainTable>
      {data?.length === 0 && <NoData />}
    </>
  );
}
