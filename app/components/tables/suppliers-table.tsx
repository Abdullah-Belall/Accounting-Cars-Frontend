import { SuppliersInterface } from "@/app/utils/types/interfaces";
import MainTable from "./main-table";
import NoData from "../common/no-data";
import SuppliersTableRows from "../users/suppliers-table-rows";

export default function SuppliersTable({ data }: { data: SuppliersInterface[] }) {
  const headers = ["*", "الاسم", "الديون", "التاريخ"];

  return (
    <div className="px-mainxs">
      <MainTable title={"كل الموردين"} headers={headers}>
        {data?.map((row, index) => (
          <SuppliersTableRows
            key={row.id}
            index={index}
            id={row.id}
            user_name={row.user_name}
            created_at={row.created_at}
            unpaid_total={row.unpaid_total}
          />
        ))}
      </MainTable>
      {data?.length === 0 && <NoData />}
    </div>
  );
}
