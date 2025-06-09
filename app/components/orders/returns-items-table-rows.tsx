"use client";
import { formatDate } from "@/app/utils/base";
import { ReturnsItemsInterface } from "@/app/utils/types/interfaces";

interface CusReturnsItemsInterface extends ReturnsItemsInterface {
  order?: {
    id: string;
    short_id: string;
    client: {
      id: string;
      user_name: string;
    };
  };
}

export default function ReturnsItemsTableRows({
  index,
  qty,
  unit_price,
  created_at,
  order_item,
  order,
}: CusReturnsItemsInterface) {
  // const totalLose =
  //   qty *
  //   (Number(unit_price) *
  //     (order?.tax && order.tax !== "0" && order?.tax !== "" ? Number(order?.tax) / 100 + 1 : 1));
  const colorl =
    order_item?.sort?.color && order_item?.sort?.color !== "" ? order_item?.sort?.color : "لا يوجد";
  return (
    <tr>
      <td className="px-4 py-2 text-center">{formatDate(created_at)}</td>
      <td className="px-4 py-2 text-center">
        -{Number((Number(qty) * Number(unit_price)).toFixed(2)).toLocaleString()} ج.م
      </td>
      <td className="px-4 py-2 text-center">{Number(unit_price).toLocaleString()} ج.م</td>
      <td className="px-4 py-2 text-center">{qty}</td>
      <td className="px-4 py-2 text-center">{order_item?.qty}</td>
      <td className="px-4 py-2 text-center">{order_item?.sort?.product?.material}</td>
      <td className="px-4 py-2 text-center">{order_item?.sort?.size}</td>
      <td className="px-4 py-2 text-center">{colorl}</td>
      <td className="px-4 py-2 text-center">{order_item?.sort?.name}</td>
      <td className="px-4 py-2 text-center">{order_item?.sort?.product?.name}</td>
      <td className="px-4 py-2 text-center">{order?.short_id?.slice(4)}</td>
      <td className="px-4 py-2 text-center">{order?.client?.user_name}</td>
      <td className="px-4 py-2 text-center">{index}</td>
    </tr>
  );
}
