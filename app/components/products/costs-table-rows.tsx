"use client";
import { formatDate } from "@/app/utils/base";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { CostsInterface } from "@/app/utils/types/interfaces";
import { useRouter } from "next/navigation";

export default function CostsTableRows({
  short_id,
  id,
  sort,
  qty,
  price,
  created_at,
  is_paid,
}: CostsInterface) {
  const router = useRouter();
  const { openPopup } = usePopup();
  const statusColor = is_paid ? "bg-green-900 text-green-300" : "bg-yellow-900 text-yellow-300";

  return (
    <>
      <tr>
        <td className="px-4 py-2 text-center">{short_id}</td>
        <td className="px-4 py-2">
          <p
            onClick={() => {
              router.push(`/products`);
              openPopup("sortsPopup", { id: sort?.product?.id, name: sort?.product?.name });
            }}
            className="w-fit mx-auto font-semibold hover:no-underline underline cursor-pointer"
          >
            {sort?.product?.name}
          </p>
        </td>
        <td className="px-4 py-2">
          <p
            onClick={() => {
              router.push(`/products`);
              openPopup("sortsPopup", { id: sort?.product?.id, name: sort?.product?.name });
            }}
            className="w-fit mx-auto font-semibold hover:no-underline underline cursor-pointer"
          >
            {sort?.name && sort?.name !== "" ? sort?.name : "لا يوجد"}
          </p>
        </td>
        <td className={`px-4 py-2 text-center max-w-[120px]`}>
          {sort?.color && sort?.color !== "" ? sort?.color : "لا يوجد"}
        </td>
        <td className={`px-4 py-2 text-center max-w-[120px]`}>
          {sort?.size && sort?.size !== "" ? sort?.size : "لا يوجد"}
        </td>
        <td className={`px-4 py-2 text-center`}>{qty}</td>
        <td className="px-4 py-2 text-center">
          {Math.abs(Number(price) / Number(qty)).toLocaleString()} ج.م
        </td>
        <td className="px-4 py-2 text-center">
          {qty > 0 && "-"} {Number(price).toLocaleString()} ج.م
        </td>
        <td className="px-4 py-2 text-center">
          <button
            onClick={() => openPopup("suppliersBills", { id, short_id: short_id })}
            className={`${statusColor} cursor-pointer w-fit text-nowrap mx-auto px-2 py-1 rounded-[4px] text-center`}
          >
            {is_paid ? "مسددة" : "لم تسدد"}
          </button>
        </td>
        <td className="px-4 py-2 text-center">{formatDate(created_at)}</td>
      </tr>
    </>
  );
}
