"use client";
import { formatDate } from "@/app/utils/base";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { CostsInterface } from "@/app/utils/types/interfaces";
import { useRouter } from "next/navigation";

export default function CostsTableRows({ short_id, sort, qty, price, created_at }: CostsInterface) {
  const router = useRouter();
  const { openPopup } = usePopup();
  return (
    <>
      <tr>
        <td className="px-4 py-2 text-center">{formatDate(created_at)}</td>
        <td className="px-4 py-2 text-center">
          {qty > 0 && "-"} {Number(price).toLocaleString()} ج.م
        </td>
        <td className="px-4 py-2 text-center">
          {Math.abs(Number(price) / Number(qty)).toLocaleString()} ج.م
        </td>
        <td className={`px-4 py-2 text-center`}>{qty}</td>
        <td className={`px-4 py-2 text-center max-w-[120px]`}>{sort?.size ?? "لا يوجد"}</td>
        <td className={`px-4 py-2 text-center max-w-[120px]`}>
          {!sort?.color || sort?.color === "" ? "لا يوجد" : sort.color}
        </td>
        <td className="px-4 py-2">
          <p
            onClick={() => {
              router.push(`/products`);
              openPopup("sortsPopup", { id: sort?.product?.id, name: sort?.product?.name });
            }}
            className="w-fit mx-auto hover:underline cursor-pointer"
          >
            {sort?.name ?? "لا يوجد"}
          </p>
        </td>
        <td className="px-4 py-2">
          <p
            onClick={() => {
              router.push(`/products`);
              openPopup("sortsPopup", { id: sort?.product?.id, name: sort?.product?.name });
            }}
            className="w-fit mx-auto hover:underline cursor-pointer"
          >
            {sort?.product?.name}
          </p>
        </td>
        <td className="px-4 py-2 text-center">{short_id.slice(4)}</td>
      </tr>
    </>
  );
}
