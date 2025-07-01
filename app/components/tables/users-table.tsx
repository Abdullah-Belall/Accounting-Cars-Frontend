import { ClientInterface } from "@/app/utils/types/interfaces";
import UsersTableRows from "../users/users-table-rows";
import MainTable from "./main-table";
import NoData from "../common/no-data";
import { getSlug, rolesArray } from "@/app/utils/base";

export default function UsersTable({
  type,
  forOrder,
  data,
}: {
  type: "worker" | "client";
  forOrder?: boolean;
  data: ClientInterface[];
}) {
  const headers = [
    "*",
    "الاسم",
    "الرقم الضريبي",
    "عدد الطلبات المكتملة",
    "عدد جهات الاتصال",
    "تاريخ الاضافة",
  ];

  if (type === "worker") {
    headers.splice(2, 2);
    headers.splice(2, 0, "الدور");
  }
  console.log(data);
  let columns = [
    { name: "client.user_name", slug: "الأسم" },
    { name: "client.tax_num", slug: "الرقم الضريبي" },
  ];
  if (type === "worker") {
    columns = [];
  }
  return (
    <div className="px-mainxs">
      <MainTable
        filter={[!forOrder, `${type}s`, columns]}
        title={type === "client" ? "كل العملاء" : "كل الموظفين"}
        headers={headers}
      >
        {data?.map((row, index) => (
          <UsersTableRows
            key={row.id}
            isForOrder={forOrder}
            index={index + 1}
            id={row.id}
            name={row.user_name}
            tax_num={row?.tax_num}
            completed_orders={row.orders_count as number}
            date={row.created_at}
            addresses_count={row.addresses_count as number}
            phone_count={row.contacts_count as number}
            type={type}
            role={getSlug(rolesArray, row?.role as string)}
          />
        ))}
      </MainTable>
      {data?.length === 0 && <NoData />}
    </div>
  );
}
