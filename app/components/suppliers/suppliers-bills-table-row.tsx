"use client";
import { formatDate } from "@/app/utils/base";
import { SuppliersBillsInterface } from "@/app/utils/types/interfaces";

export default function SuppliersBillsTableRow({
  data: { index, amount, note, created_at },
}: {
  data: SuppliersBillsInterface;
}) {
  return (
    <>
      <tr>
        <td className="px-4 py-2 text-center">{index}</td>
        <td className="px-4 py-2 text-center">{amount}</td>
        <td className="px-4 py-2 text-center">{note ?? "لا يوجد"}</td>
        <td className="px-4 py-2 text-center">{formatDate(created_at)}</td>
      </tr>
    </>
  );
}
