"use client";
import { CrmDatesInterface } from "@/app/utils/types/interfaces";
import MainTable from "./main-table";
import NoData from "../common/no-data";
import CrmDatesTableRow from "../crm/crm-dates-row";

export default function CrmDatesTable({
  data,
  title,
}: {
  data: CrmDatesInterface[];
  title: string;
}) {
  return (
    <>
      <MainTable
        isPopup={true}
        title={title}
        headers={["#", "الملاحظة", "تاريخ الانشاء", "العمليات"]}
      >
        {data?.map((row, i) => (
          <CrmDatesTableRow key={i} data={{ ...row, index: i + 1 }} />
        ))}
      </MainTable>
      {data?.length === 0 && <NoData />}
    </>
  );
}
