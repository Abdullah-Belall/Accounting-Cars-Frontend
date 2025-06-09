"use client";
import OrderItemsTable from "../tables/order-items-table";

export default function OrderItemsPopUp({
  id,
  index,
  refetchOrders,
}: {
  id: string;
  index: number;
  refetchOrders: any;
}) {
  return (
    <div className="relative rounded-md shadow-md min-w-[520px] bg-myLight p-mainxl">
      <OrderItemsTable title={`منتجات الطلب رقم ${index}`} id={id} refetchOrders={refetchOrders} />
    </div>
  );
}
