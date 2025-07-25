"use client";
import { ExpensesInterface } from "@/app/utils/types/interfaces";
import MainTable from "./main-table";
import NoData from "../common/no-data";
import ExpensesTableRows from "../expenses/expenses-table-row";

export default function ExpensesTable({
  data,
  forEdit,
  forDailyReport = true,
}: {
  forEdit?: (data: any) => void;
  data: ExpensesInterface[];
  forDailyReport?: boolean;
}) {
  return (
    <>
      <MainTable
        title="فواتير المصاريف"
        headers={["*", "اسم البند", "المصروف", "ملاحظة", "التاريخ", "العمليات"]}
        filter={[forDailyReport, "expenses", []]}
      >
        {data?.map((row, index) => (
          <ExpensesTableRows
            key={index}
            id={row.id}
            name={row.name}
            amount={row.amount}
            note={row.note}
            index={index + 1}
            created_at={row.created_at}
            forEdit={forEdit}
          />
        ))}
      </MainTable>
      {data?.length === 0 && <NoData />}
    </>
  );
}
