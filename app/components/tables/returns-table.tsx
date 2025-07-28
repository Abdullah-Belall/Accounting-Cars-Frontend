"use client";
import { ReturnDataInterface } from "@/app/utils/types/interfaces";
import MainTable from "./main-table";
import NoData from "../common/no-data";
import ReturnsTableRows from "../orders/return-table-rows";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import BlackLayer from "../common/black-layer";
import ReturnsItemsPopup from "../orders/returns-items-popup";

export default function ReturnsTable({
  data,
  title,
  isMainTable,
}: {
  data: ReturnDataInterface[];
  title: string;
  isMainTable: boolean;
}) {
  const { popupState, closePopup } = usePopup();
  const calcTotalPrice = (
    returns_items: {
      id: string;
      qty: number;
      unit_price: number;
    }[]
  ) => {
    return returns_items?.reduce(
      (acc, curr) => acc + Number(curr.qty) * Number(curr.unit_price),
      0
    );
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
          "#",
          "عناصر المرتجع",
          "العميل",
          "السيارة",
          "رقم المبيعات",
          "عمليات المرتجع",
          "فاتورة المرتجع بالضريبة",
          "التاريخ",
        ]}
      >
        {data?.map((row: any, index) => {
          return (
            <ReturnsTableRows
              key={index}
              id={row?.id}
              order={row?.order}
              totalPrice={calcTotalPrice(row?.returns_items)}
              returns_items_count={row?.returns_items_count}
              created_at={row?.created_at}
              updated_at={row?.updated_at}
              short_id={row?.short_id}
            />
          );
        })}
      </MainTable>
      {data?.length === 0 && <NoData />}
      {popupState?.returnsItemsPopup.isOpen && (
        <>
          <BlackLayer onClick={() => closePopup("returnsItemsPopup")}>
            <ReturnsItemsPopup returnId={popupState.returnsItemsPopup.data?.returnId} />
          </BlackLayer>
        </>
      )}
    </>
  );
}
