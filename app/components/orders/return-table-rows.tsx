"use client";
import { formatDate } from "@/app/utils/base";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { ReturnDataInterface } from "@/app/utils/types/interfaces";

export default function ReturnsTableRows({
  id,
  returns_items_count,
  short_id,
  totalPrice,
  order,
  created_at,
}: ReturnDataInterface) {
  const { openPopup } = usePopup();
  console.log(totalPrice);
  return (
    <tr>
      <td className="px-4 py-2 text-center">{formatDate(created_at)}</td>
      <td className="px-4 py-2 text-center">
        -
        {Number(
          (
            Number(totalPrice) *
            (order?.tax && order?.tax !== "" && order?.tax !== "0"
              ? Number(order?.tax) / 100 + 1
              : 1)
          ).toFixed(2)
        ).toLocaleString()}
        ج.م
      </td>
      <td className="px-4 py-2 text-center">{returns_items_count}</td>
      <td className="px-4 py-2 text-center">{order?.short_id?.slice(4)}</td>
      <td className="px-4 py-2 text-center">{order?.client?.user_name}</td>
      <td
        onClick={() => openPopup("returnsItemsPopup", { returnId: id })}
        className="px-4 py-2 text-center hover:underline cursor-pointer"
      >
        عرض الكل
      </td>
      <td className="px-4 py-2 text-center">{short_id?.slice(4)}</td>
    </tr>
  );
}
