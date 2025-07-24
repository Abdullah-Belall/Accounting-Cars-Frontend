"use client";

import { SortInterface } from "@/app/utils/types/interfaces";

interface CusSortInterface extends SortInterface {
  index: number;
}

export default function OrderPrintRows({
  index,
  product,
  name,
  color,
  size,
  qty,
  unit_price,
}: CusSortInterface) {
  return (
    <>
      <tr>
        <td className="px-4 py-2 text-center max-w-[69px]">{index}</td>
        <td className="px-4 py-2 text-center">{product?.name}</td>
        <td className="px-4 py-2 text-center">{name && name !== "" ? name : "لا يوجد"}</td>
        <td className="px-4 py-2 text-center">{color && color !== "" ? color : "لا يوجد"}</td>
        <td className="px-4 py-2 text-center">{size && size !== "" ? size : "لا يوجد"}</td>
        <td className="px-4 py-2 text-center">
          {product?.material && product?.material !== "" ? product?.material : "لا يوجد"}
        </td>
        <td className="px-4 py-2 text-center">{qty}</td>
        <td className="px-4 py-2 text-center">
          {Number(Number(unit_price).toFixed(2)).toLocaleString()}
        </td>
        <td className="px-4 py-2 text-center">{(+unit_price * qty).toLocaleString()}</td>
      </tr>
    </>
  );
}
