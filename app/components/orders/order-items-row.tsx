"use client";

import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { ReturnsDataType, useReturns } from "@/app/utils/contexts/returns-contexts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderItemsTableRow({
  index,
  id,
  product,
  name,
  size,
  color,
  qty,
  unit_price,
  total_cost_price,
}: {
  index: number;
  id: string;
  product: {
    id: string;
    name: string;
  };
  name: string;
  size: string;
  color: string | null;
  qty: number;
  total_cost_price: number;
  unit_price: number;
}) {
  const router = useRouter();
  const formattedEarnig = (unit_price * qty).toLocaleString();
  const formattedUnitPrice = unit_price.toLocaleString();
  const { openPopup } = usePopup();
  const { returns, setReturns } = useReturns();
  const [val, setVal] = useState("");
  useEffect(() => {
    if (returns?.isActive) {
      if (val !== "") {
        const filterd = (returns?.data?.filter((e) => e.item_id !== id) as ReturnsDataType[]) || [];
        setReturns({ isActive: true, data: [...filterd, { item_id: id, qty: Number(val) }] });
      } else {
        const filterd = (returns?.data?.filter((e) => e.item_id !== id) as ReturnsDataType[]) || [];
        setReturns({ isActive: true, data: filterd });
      }
    }
  }, [val]);
  return (
    <>
      <tr>
        <td className="text-center">
          {returns?.isActive && product?.name ? (
            <input
              placeholder="الكمية"
              className="rounded-md placeholder:text-[10px] outline-0 border border-myDark max-w-[40px] h-[30] mr-2 text-center"
              value={val}
              onChange={(e) =>
                +e.target.value > +qty
                  ? setVal(qty.toString())
                  : setVal(e.target.value.replace(/[^0-9.]/g, ""))
              }
              disabled={qty == 0}
            />
          ) : (
            index
          )}
        </td>
        <td className="px-4 py-2 text-center">
          {product?.name ? (
            <p
              onClick={() => {
                router.push(`/products`);
                openPopup("sortsPopup", { id: product?.id, name: product?.name });
              }}
              className="cursor-pointer font-semibold underline hover:no-underline w-fit mx-auto"
            >
              {product?.name}
            </p>
          ) : (
            "لا يوجد"
          )}
        </td>
        <td className="px-4 py-2 text-center">{name && name !== "" ? name : "لا يوجد"}</td>
        <td className="px-4 py-2 text-center">{size && size !== "" ? size : "لا يوجد"}</td>
        <td className="px-4 py-2 text-center">{color && color !== "" ? color : "لا يوجد"}</td>
        <td className="px-4 py-2 text-center">{qty}</td>
        <td className="px-4 py-2 text-center">{formattedUnitPrice}</td>
        <td className="px-4 py-2 text-center">{formattedEarnig}</td>
        <td className="px-4 py-2 text-center">{Number(total_cost_price || 0).toLocaleString()}</td>
      </tr>
    </>
  );
}
