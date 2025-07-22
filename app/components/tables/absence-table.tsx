import { AbsenceInterface } from "@/app/utils/types/interfaces";
import MainTable from "./main-table";
import NoData from "../common/no-data";
import AbsenceTableRow from "../absence/absence-table-row";

export default function AbsenceTable({ title, data }: { title: string; data: AbsenceInterface[] }) {
  return (
    <>
      <MainTable title={title} headers={["*", "سبب الغياب", "التاريخ", "العمليات"]}>
        {data?.map((row, index) => (
          <AbsenceTableRow key={index} data={{ ...row, index: index + 1 }} />
        ))}
      </MainTable>
      {data?.length === 0 && <NoData />}
    </>
  );
}
