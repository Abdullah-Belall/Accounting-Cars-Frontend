"use client";
import { useStockChecks } from "@/app/utils/contexts/stock-checks-contexts";
import { SortInterface } from "@/app/utils/types/interfaces";
import Link from "next/link";

export default function StockSortsTableRows({
  id,
  product,
  name,
  color,
  size,
  qty,
}: SortInterface) {
  const { deleteBySortId, add, findOne } = useStockChecks();
  const onChange = (actual_qty: string) => {
    deleteBySortId(id);
    if (actual_qty !== "") {
      add({
        sort_id: id,
        qty: +actual_qty,
      });
    }
  };
  return (
    <>
      <tr>
        <td className="px-4 py-2 text-center">
          <Link className="hover:underline" href={`/categories/${product?.category?.id}`}>
            {product?.category?.name}
          </Link>
        </td>
        <td className="px-4 py-2 text-center">{qty}</td>
        <td className="px-4 py-2 text-center">{size}</td>
        <td className="px-4 py-2 text-center">{product?.material}</td>
        <td className="px-4 py-2 text-center">{color ?? "لا يوجد"}</td>
        <td className="px-4 py-2 text-center">{name}</td>
        <td className="px-4 py-2 text-center">{product?.name}</td>
        <td className="px-4 py-2 text-center max-w-[69px]">
          <input
            placeholder="الكمية"
            className="rounded-md placeholder:text-[12px] outline-0 border border-myDark max-w-[45px] h-[35] mr-2 text-center"
            value={findOne(id)?.qty ?? ""}
            onChange={(e) => onChange(e.target.value)}
          />
        </td>
      </tr>
    </>
  );
}
