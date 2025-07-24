"use client";
import { formatDate } from "@/app/utils/base";
import { InstallmentInterface } from "@/app/utils/types/interfaces";

export default function InstallmentsTableRow({ index, amount, created_at }: InstallmentInterface) {
  return (
    <>
      <tr>
        <td className="px-4 py-2 text-center">{index}</td>
        <td className="px-4 py-2 text-center">{amount}</td>
        <td className="px-4 py-2 text-center">{formatDate(created_at)}</td>
      </tr>
    </>
  );
}
