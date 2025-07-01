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
    <div className="px-mainxs w-full md:w-[752px]">
      <div className="relative rounded-md shadow-md bg-myLight p-mainxl">
        <OrderItemsTable
          title={`منتجات الطلب رقم ${index}`}
          id={id}
          refetchOrders={refetchOrders}
        />
      </div>
    </div>
  );
}
