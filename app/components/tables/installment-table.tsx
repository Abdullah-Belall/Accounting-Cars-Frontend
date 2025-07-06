"use client";
import NoData from "../common/no-data";
import InstallmentsTableRow from "../orders/installments-table-row";
import MainTable from "./main-table";
import { InstallmentInterface } from "@/app/utils/types/interfaces";
import styles from "@/app/styles/drop-down.module.css";

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
      <h1 className="mb-2 w-fit text-lg font-semibold text-myDark text-nowrap ml-auto">{title}</h1>
      <div className={styles.list + " max-h-[300px] overflow-y-scroll"}>
        <MainTable title={""} headers={["*", "القسط", "تاريخ التحصيل"]}>
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
    </div>
  );
}
