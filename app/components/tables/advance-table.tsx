import { AdvanceInterface } from "@/app/utils/types/interfaces";
import MainTable from "./main-table";
import AdvanceTableRow from "../advances/advance-table-row";
import NoData from "../common/no-data";

export default function AdvanceTable({ title, data }: { title: string; data: AdvanceInterface[] }) {
  return (
    <>
      <MainTable
        title={title}
        headers={["*", "المبلغ", "ملاحظات", "التسديد", "التاريخ", "العمليات"]}
      >
        {data?.map((row, index) => (
          <AdvanceTableRow key={index} data={{ ...row, index: index + 1 }} />
        ))}
      </MainTable>
      {data?.length === 0 && <NoData />}
    </>
  );
}
