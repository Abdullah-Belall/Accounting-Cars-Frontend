"use client";
import { StockChecksItemsInterface } from "@/app/utils/types/interfaces";

export default function StockChecksItemsTableRows({
  index,
  sort,
  recorded_quantity,
  actual_quantity,
  difference,
}: StockChecksItemsInterface) {
  return (
    <>
      <tr>
        <td className="px-4 py-2 text-center">{difference}</td>
        <td className="px-4 py-2 text-center">{actual_quantity}</td>
        <td className="px-4 py-2 text-center">{recorded_quantity}</td>
        <td className="px-4 py-2 text-center">{sort?.size}</td>
        <td className="px-4 py-2 text-center">{sort?.product?.material}</td>
        <td className="px-4 py-2 text-center">
          {sort?.color && sort?.color !== "" ? sort?.color : "لا يوجد"}
        </td>
        <td className="px-4 py-2 text-center">{sort?.name}</td>
        <td className="px-4 py-2 text-center">{sort?.product?.name}</td>
        <td className="px-4 py-2 text-center">{index}</td>
      </tr>
    </>
  );
}
