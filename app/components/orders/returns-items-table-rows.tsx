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
  const sortName =
    order_item?.sort?.name && order_item?.sort?.name !== "" ? order_item?.sort?.name : "لا يوجد";
  const sortColor =
    order_item?.sort?.color && order_item?.sort?.color !== "" ? order_item?.sort?.color : "لا يوجد";
  const sortSize =
    order_item?.sort?.size && order_item?.sort?.size !== "" ? order_item?.sort?.size : "لا يوجد";
  const proMaterial =
    order_item?.sort?.product?.material && order_item?.sort?.product?.material !== ""
      ? order_item?.sort?.product?.material
      : "لا يوجد";
  return (
    <tr>
      <td className="px-4 py-2 text-center">{index}</td>
      <td className="px-4 py-2 text-center">{order?.short_id}</td>
      <td className="px-4 py-2 text-center">{order_item?.sort?.product?.name}</td>
      <td className="px-4 py-2 text-center">{sortName}</td>
      <td className="px-4 py-2 text-center">{sortColor}</td>
      <td className="px-4 py-2 text-center">{sortSize}</td>
      <td className="px-4 py-2 text-center">{proMaterial}</td>
      <td className="px-4 py-2 text-center">{order_item?.qty}</td>
      <td className="px-4 py-2 text-center">{qty}</td>
      <td className="px-4 py-2 text-center">{Number(unit_price).toLocaleString()}</td>
      <td className="px-4 py-2 text-center text-nowrap">
        {Number((Number(qty) * Number(unit_price)).toFixed(2)).toLocaleString()} -
      </td>
      <td className="px-4 py-2 text-center">{formatDate(created_at)}</td>
    </tr>
  );
}
