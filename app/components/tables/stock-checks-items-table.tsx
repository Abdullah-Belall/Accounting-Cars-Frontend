"use client";
import { StockChecksItemsInterface } from "@/app/utils/types/interfaces";
import MainTable from "./main-table";
import NoData from "../common/no-data";
import StockChecksItemsTableRows from "../stock-checks/stock-checks-items-table-rows";
import { useParams } from "next/navigation";

export default function StockChecksItemsTable({ data }: { data: StockChecksItemsInterface[] }) {
  const params = useParams();
  const headers = [
    "#",
    "المنتج",
    "الصنف",
    "اللون",
    "الخامة",
    "المقاس",
    "الكمية المسجلة",
    "الكمية الفعلية",
    "الفرق",
  ];
  console.log(params);
  if (params?.type === "equipments") {
    headers.splice(1, 5, "المعدة");
  }
  return (
    <>
      <MainTable title={"العناصر التابعة للجرد"} headers={headers}>
        {data?.map((row, index) => (
          <StockChecksItemsTableRows
            key={index}
            id={row?.id}
            index={index + 1}
            created_at={row?.created_at}
            sort={row?.sort}
            equipment={row?.equipment}
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
