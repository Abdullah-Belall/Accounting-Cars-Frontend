"use client";
import { formatDate, shortIdGenerator } from "@/app/utils/base";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { ReturnDataInterface } from "@/app/utils/types/interfaces";
import Link from "next/link";

export default function ReturnsTableRows({
  id,
  returns_items_count,
  short_id,
  totalPrice,
  order,
  created_at,
}: ReturnDataInterface) {
  const { openPopup } = usePopup();
  return (
    <tr>
      <td className="px-4 py-2 text-center">{shortIdGenerator(short_id)}</td>
      <td className="px-4 py-2">
        <p
          onClick={() => openPopup("returnsItemsPopup", { returnId: id })}
          className="w-fit mx-auto font-semibold hover:no-underline underline cursor-pointer"
        >
          عرض الكل
        </p>
      </td>
      <td className="px-4 py-2 text-center font-semibold hover:no-underline underline cursor-pointer">
        <Link
          href={`/clients/${order?.car?.client?.id}`}
          className="w-fit mx-auto font-semibold hover:no-underline underline cursor-pointer"
        >
          {order?.car?.client?.user_name}
        </Link>
      </td>
      <td className="px-4 py-2 text-center">
        {order?.car?.mark && order?.car?.mark !== "" ? (
          <p className="cursor-pointer font-semibold hover:no-underline underline w-fit mx-auto">
            <Link
              href={`/clients/${order?.car?.client?.id}/car/${order?.car?.id}?client=${name}&car=${order?.car?.mark}`}
            >
              {order?.car?.mark}
            </Link>
          </p>
        ) : (
          "لا يوجد"
        )}
      </td>
      <td className="px-4 py-2 text-center">{shortIdGenerator(Number(order?.short_id))}</td>
      <td className="px-4 py-2 text-center">{returns_items_count}</td>
      <td className="px-4 py-2 text-center">
        {" "}
        {Number(
          (
            Number(totalPrice) *
            (order?.tax && order?.tax !== "" && order?.tax !== "0"
              ? Number(order?.tax) / 100 + 1
              : 1)
          ).toFixed(2)
        ).toLocaleString()}{" "}
      </td>
      <td className="px-4 py-2 text-center">{formatDate(created_at)}</td>
    </tr>
  );
}
