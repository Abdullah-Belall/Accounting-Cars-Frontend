"use client";
import { formatDate } from "@/app/utils/base";
import { StockChecksInterface } from "@/app/utils/types/interfaces";
import { useRouter } from "next/navigation";

export default function StockChecksTableRows({
  index,
  id,
  type,
  note,
  created_at,
}: StockChecksInterface) {
  const router = useRouter();
  return (
    <>
      <tr>
        <td className="px-4 py-2 text-center">{index}</td>
        <td className="px-4 py-2 text-center">
          {type === "equipments" ? "جرد معدات" : "جرد اصناف"}
        </td>
        <td className="px-4 py-2 text-center">
          <p
            onClick={() => router.push(`stock-checks/${id}/${type}`)}
            className="w-fit mx-auto font-semibold hover:no-underline underline cursor-pointer"
          >
            عرض العناصر
          </p>
        </td>
        <td className="px-4 py-2 text-center">{note ?? "لا يوجد"}</td>
        <td className="px-4 py-2 text-center">{formatDate(created_at)}</td>
      </tr>
    </>
  );
}
