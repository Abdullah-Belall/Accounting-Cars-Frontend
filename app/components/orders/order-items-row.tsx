"use client";

import { sameTextField } from "@/app/utils/base";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { ReturnsDataType, useReturns } from "@/app/utils/contexts/returns-contexts";
import { TextField } from "@mui/material";
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
}: {
  index: number;
  id: string;
  product: {
    id: string;
    name: string;
  };
  name: string;
  size: number;
  color: string | null;
  qty: number;
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
        <td className="px-4 py-2 text-center">{formattedEarnig} ج.م</td>
        <td className="px-4 py-2 text-center">{formattedUnitPrice} ج.م</td>
        <td className="px-4 py-2 text-center">{qty}</td>
        <td className="px-4 py-2 text-center">{color ?? "لا يوجد"}</td>
        <td className="px-4 py-2 text-center">{size}</td>
        <td className="px-4 py-2 text-center">{name}</td>
        <td className="px-4 py-2 text-center">
          <p
            onClick={() => {
              router.push(`/products`);
              openPopup("sortsPopup", { id: product.id, name: product.name });
            }}
            className="cursor-pointer hover:underline w-fit mx-auto"
          >
            {product.name}
          </p>
        </td>
        <td className="px-4 py-2 text-center max-w-[80px]">
          {returns?.isActive ? (
            <TextField
              id="Glu"
              dir="rtl"
              label="الكمية"
              variant="filled"
              sx={sameTextField}
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
      </tr>
    </>
  );
}
