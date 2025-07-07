"use client";
import { SuppliersBillsInterface } from "@/app/utils/types/interfaces";
import MainTable from "./main-table";
import NoData from "../common/no-data";
import SuppliersBillsTableRow from "../suppliers/suppliers-bills-table-row";
import { usePopup } from "@/app/utils/contexts/popup-contexts";

export default function SuppliersBillsTable({
  data,
}: {
  data: SuppliersBillsInterface[];
  refetch: () => void;
}) {
  const { popupState } = usePopup();
  const delvData = popupState.suppliersBills.data;
  return (
    <>
      <section>
        <MainTable
          title={`فاتورة تكاليف ${delvData.short_id}`}
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
