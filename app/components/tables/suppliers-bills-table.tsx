"use client";
import { SuppliersBillsInterface } from "@/app/utils/types/interfaces";
import MainTable from "./main-table";
import NoData from "../common/no-data";
import SuppliersBillsTableRow from "../suppliers/suppliers-bills-table-row";

export default function SuppliersBillsTable({
  data,
}: {
  data: SuppliersBillsInterface[];
  refetch: () => void;
}) {
  return (
    <>
      <section className="relative">
        <MainTable title={""} headers={["*", "المبلغ", "ملاحظات", "تاريخ الاضافة"]}>
          {data?.map((row, index) => <SuppliersBillsTableRow key={index} data={row} />)}
        </MainTable>
        {(!data || data?.length === 0) && <NoData />}
      </section>
    </>
  );
}
