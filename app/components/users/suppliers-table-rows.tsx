"use client";
import { formatDate } from "@/app/utils/base";
import { SuppliersInterface } from "@/app/utils/types/interfaces";
import Link from "next/link";

export default function SuppliersTableRows({
  index,
  id,
  user_name,
  unpaid_total,
  created_at,
}: SuppliersInterface) {
  return (
    <>
      <tr>
        <td className="px-4 py-2 text-center">{index + 1}</td>
        <td className="px-4 py-2 text-center">
          <Link
            className="w-fit font-semibold hover:no-underline underline cursor-pointer"
            href={`/suppliers/${id}`}
          >
            {user_name}
          </Link>
        </td>
        <td className="px-4 py-2 text-center">
          {Number(Number(unpaid_total).toFixed(2)).toLocaleString()}
        </td>
        <td className="px-4 py-2 text-center">{formatDate(created_at)}</td>
      </tr>
    </>
  );
}
