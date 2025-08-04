"use client";
import { CrmInterface } from "@/app/utils/types/interfaces";
import MainTable from "./main-table";
import NoData from "../common/no-data";
import CrmTableRows from "../crm/crm-table-row";

export default function CrmTable({ data, title }: { data: CrmInterface[]; title: string }) {
  return (
    <>
      <MainTable
        title={title}
        headers={["#", "التنبيه", "التنبيه التالي", "تاريخ الانشاء", "العمليات"]}
      >
        {data?.map((row, i) => (
          <CrmTableRows key={i} data={{ ...row, index: i + 1 }} />
        ))}
      </MainTable>
      {data?.length === 0 && <NoData />}
    </>
  );
}
