"use client";
import NoData from "../common/no-data";
import InstallmentsTableRow from "../orders/installments-table-row";
import MainTable from "./main-table";
import { InstallmentInterface } from "@/app/utils/types/interfaces";

export default function InstalmentTable({
  title,
  data,
}: {
  title: string;
  data: InstallmentInterface[];
  refetch: () => void;
}) {
  return (
    <div>
      <MainTable title={title} headers={["#", "القسط", "تاريخ التحصيل"]} isPopup={true}>
        {data?.map((row, index) => (
          <InstallmentsTableRow
            key={index}
            index={index + 1}
            id={row.id}
            amount={row.amount}
            created_at={row.created_at}
            updated_at={row.updated_at}
          />
        ))}
      </MainTable>
      {data?.length === 0 && <NoData />}
    </div>
  );
}
