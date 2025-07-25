"use client";
import { TbCircleXFilled } from "react-icons/tb";
import OrderItemsTable from "../tables/order-items-table";
import { shortIdGenerator } from "@/app/utils/base";

export default function OrderItemsPopUp({
  id,
  index,
  refetchOrders,
  onClose,
}: {
  id: string;
  index: number;
  refetchOrders: () => void;
  onClose: () => void;
}) {
  return (
    <div className="px-mainxs w-full md:w-[752px]">
      <div className="relative rounded-md shadow-md bg-myLight p-mainxl">
        <button
          onClick={onClose}
          className="flex justify-center items-center w-[25px] h-[25px] bg-background rounded-[50%] z-[5] cursor-pointer absolute right-[-10px] top-[-10px] "
        >
          <TbCircleXFilled className="min-w-[30px] min-h-[30px]" />
        </button>
        <OrderItemsTable
          title={`منتجات الفاتورة رقم ${shortIdGenerator(index)}`}
          id={id}
          refetchOrders={refetchOrders}
        />
      </div>
    </div>
  );
}
