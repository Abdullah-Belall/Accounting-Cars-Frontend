"use client";
import { SuppliersBillsInterface } from "@/app/utils/types/interfaces";
import MainTable from "./main-table";
import NoData from "../common/no-data";
import SuppliersBillsTableRow from "../suppliers/suppliers-bills-table-row";

export default function SuppliersBillsTable({
  data,
  title,
}: {
  data: SuppliersBillsInterface[];
  refetch: () => void;
  title: string;
}) {
  return (
    <>
      <section>
        <MainTable
          title={title}
          headers={["*", "المبلغ", "ملاحظات", "تاريخ الاضافة"]}
          isPopup={true}
        >
          {data?.map((row, index) => (
            <SuppliersBillsTableRow key={index} data={{ ...row, index }} />
          ))}
        </MainTable>
        {(!data || data?.length === 0) && <NoData />}
      </section>
    </>
  );
}
