"use client";
import NoData from "../common/no-data";
import AllSortsTableRows from "../products/all-sorts-rows";
import MainTable from "./main-table";
import { SortInterface } from "@/app/utils/types/interfaces";

export default function AllSortsTable({ data }: { data: SortInterface[] }) {
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
        filter={[true, "sorts", columns]}
        title={`انشاء فاتورة`}
        headers={[
          "التاريخ",
          "الفئة",
          "السعر",
          "الكمية",
          "المقاس",
          "الخامة",
          "اللون",
          "اسم الصنف",
          "اسم المنتج",
          "*",
        ]}
      >
        {data?.map((row) => (
          <AllSortsTableRows
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
