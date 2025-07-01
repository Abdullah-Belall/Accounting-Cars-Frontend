"use client";
import NoData from "../common/no-data";
import StockSortsTableRows from "../stock-checks/sorts-checks-table-rows";
import MainTable from "./main-table";
import { SortInterface } from "@/app/utils/types/interfaces";

export default function SortsStockChecksTable({ data }: { data: SortInterface[] }) {
  return (
    <>
      <MainTable
        title={`انشاء جرد`}
        headers={["*", "اسم المنتج", "اسم الصنف", "اللون", "الخامة", "المقاس", "الكمية", "الفئة"]}
      >
        {data?.map((row) => (
          <StockSortsTableRows
            key={row.id}
            id={row.id}
            name={row.name}
            color={row.color === "" || !row.color ? null : row.color}
            size={row.size}
            qty={row.qty}
            unit_price={row.unit_price}
            note={row.note}
            created_at={row.created_at}
            product={row.product}
          />
        ))}
      </MainTable>
      {data?.length === 0 && <NoData />}
    </>
  );
}
