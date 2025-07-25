"use client";
import { EquipmentInterface } from "@/app/utils/types/interfaces";
import MainTable from "./main-table";
import NoData from "../common/no-data";
import EquipmentsTableRow from "../equipments/equipments-table-row";

export default function EquipmentsTable({
  data,
  title,
  stockChecks,
}: {
  data: EquipmentInterface[];
  title: string;
  stockChecks?: boolean;
}) {
  const headers = ["*", "الاسم", "الكمية", "سعر الوحدة", "الاجمالي", "التاريخ"];
  if (stockChecks) {
    headers.splice(3, 3);
  }
  return (
    <>
      <MainTable title={title} headers={headers} filter={[true, "equipments", []]}>
        {data?.map((row, index) => (
          <EquipmentsTableRow
            key={index}
            data={{ ...row, index: index + 1 }}
            stockChecks={stockChecks}
          />
        ))}
      </MainTable>
      {data?.length === 0 && <NoData />}
    </>
  );
}
