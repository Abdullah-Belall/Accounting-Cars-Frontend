import { DeductionInterface } from "@/app/utils/types/interfaces";
import MainTable from "./main-table";
import NoData from "../common/no-data";
import DeductionTableRow from "../deduction/deduction-table.row";

export default function DeductionTable({
  title,
  data,
}: {
  title: string;
  data: DeductionInterface[];
}) {
  return (
    <>
      <MainTable
        title={title}
        headers={["#", "المبلغ", "ملاحظات", "الحالة", "التاريخ", "العمليات"]}
      >
        {data?.map((row, index) => (
          <DeductionTableRow key={index} data={{ ...row, index }} />
        ))}
      </MainTable>
      {data?.length === 0 && <NoData />}
    </>
  );
}
