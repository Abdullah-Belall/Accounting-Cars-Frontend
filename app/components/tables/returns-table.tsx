"use client";
import { ReturnDataInterface } from "@/app/utils/types/interfaces";
import MainTable from "./main-table";
import NoData from "../common/no-data";
import ReturnsTableRows from "../orders/return-table-rows";

export default function ReturnsTable({
  data,
  title,
  isMainTable,
}: {
  data: ReturnDataInterface[];
  title: string;
  isMainTable: boolean;
}) {
  const calcTotalPrice = () => {
    let totalPrice = 0;
    for (const item of data) {
      totalPrice +=
        item?.returns_items?.reduce(
          (acc, curr) => acc + Number(curr.qty) * Number(curr.unit_price),
          0
        ) || 0;
    }
    return totalPrice;
  };
  return (
    <>
      <MainTable
        title={title}
        filter={[
          isMainTable,
          "returns",
          [
            { name: "return.short_id", slug: "رقم الفاتورة" },
            { name: "client.user_name", slug: "العميل" },
          ],
        ]}
        headers={[
          "التاريخ",
          "فاتورة المرتجع",
          "عمليات المرتجع",
          "رقم المبيعات",
          "العميل",
          "عناصر المرتجع",
          "*",
        ]}
      >
        {data?.map((row: any, index) => (
          <ReturnsTableRows
            key={index}
            id={row?.id}
            order={row?.order}
            totalPrice={calcTotalPrice()}
            returns_items_count={row?.returns_items_count}
            created_at={row?.created_at}
            updated_at={row?.updated_at}
            short_id={row.short_id}
          />
        ))}
      </MainTable>
      {data?.length === 0 && <NoData />}
    </>
  );
}
