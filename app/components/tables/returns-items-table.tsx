import { ReturnDataInterface } from "@/app/utils/types/interfaces";
import NoData from "../common/no-data";
import MainTable from "./main-table";
import ReturnsItemsTableRows from "../orders/returns-items-table-rows";

export default function ReturnsItemsTable({ data }: { data: ReturnDataInterface }) {
  return (
    <>
      <MainTable
        title={`عناصر المرتجع رقم ${data?.short_id?.slice(4)}`}
        headers={[
          "التاريخ",
          "فاتورة المرتجع",
          "سعر الوحدة",
          "الكمية المرتجعة",
          "الكمية المباعة",
          "الخامة",
          "المقاس",
          "اللون",
          "الصنف",
          "المنتج",
          "رقم المبيعات",
          "العميل",
          "*",
        ]}
      >
        {data?.returns_items?.map((row: any, index: number) => (
          <ReturnsItemsTableRows
            key={index}
            index={index + 1}
            id={row?.id}
            qty={row?.qty}
            unit_price={row?.unit_price}
            reason={row?.reason}
            order_item={row.order_item}
            created_at={row?.created_at}
            updated_at={row?.updated_at}
            order={data?.order}
          />
        ))}
      </MainTable>
      {data?.returns_items?.length === 0 && <NoData />}
    </>
  );
}
