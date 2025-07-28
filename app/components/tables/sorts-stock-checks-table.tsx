"use client";
import NoData from "../common/no-data";
import StockSortsTableRows from "../stock-checks/sorts-checks-table-rows";
import MainTable from "./main-table";
import { SortInterface } from "@/app/utils/types/interfaces";

export default function SortsStockChecksTable({ data }: { data: SortInterface[] }) {
  const columns = [
    { name: "product.name", slug: "المنتج" },
    { name: "sort.name", slug: "الصنف" },
    { name: "sort.color", slug: "اللون" },
    { name: "sort.size", slug: "المقاس" },
    { name: "product.material", slug: "الخامة" },
    { name: "category.name", slug: "الفئة" },
  ];
  return (
    <>
      <MainTable
        title={`كل الاصناف`}
        headers={["#", "اسم المنتج", "اسم الصنف", "اللون", "الخامة", "المقاس", "الكمية", "الفئة"]}
        filter={[true, "sorts", columns]}
      >
        {data?.map((row) => (
          <StockSortsTableRows
            key={row.id}
            id={row.id}
            name={row.name}
            color={row.color}
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
