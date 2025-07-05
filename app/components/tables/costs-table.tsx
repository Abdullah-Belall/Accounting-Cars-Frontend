"use client";
import { CostsInterface } from "@/app/utils/types/interfaces";
import MainTable from "./main-table";
import CostsTableRows from "../products/costs-table-rows";
import NoData from "../common/no-data";

export default function CostsTable({ data, title }: { data: CostsInterface[]; title: string }) {
  const columns = [
    { name: "cost.short_id", slug: "رقم الفاتورة" },
    { name: "product.name", slug: "اسم المنتج" },
    { name: "sort.name", slug: "اسم الصنف" },
    { name: "sort.color", slug: "لون الصنف" },
    { name: "sort.size", slug: "مقاس الصنف" },
  ];
  return (
    <>
      <MainTable
        title={title}
        headers={[
          "*",
          "اسم المنتج",
          "اسم الصنف",
          "اللون",
          "المقاس",
          "الكمية المدخلة",
          "تكلفة الوحدة",
          "الاجمالي",
          "التسديد",
          "التاريخ",
        ]}
        filter={title === "فواتير التكاليف" ? [true, "costs", columns] : undefined}
      >
        {data?.map((row, index) => (
          <CostsTableRows
            key={index}
            id={row.id}
            short_id={row.short_id}
            sort={row.sort}
            qty={row.qty}
            price={row.price}
            is_paid={row.is_paid}
            created_at={row.created_at}
          />
        ))}
      </MainTable>
      {data?.length === 0 && <NoData />}
    </>
  );
}
