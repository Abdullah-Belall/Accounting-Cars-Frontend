"use client";

import { formatDate, sameTextField } from "@/app/utils/base";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { SortInterface } from "@/app/utils/types/interfaces";
import { TextField } from "@mui/material";
import Link from "next/link";

export default function AllSortsTableRows({
  id,
  product,
  name,
  color,
  size,
  qty,
  unit_price,
  created_at,
}: SortInterface) {
  const { openPopup, popupState, closeOrderPopup } = usePopup();
  const handleInputs = (value: string) => {
    if (value !== "") {
      const updatedSorts: { product_id: string; qty: number; unit_price: string }[] =
        popupState.makeOrderPopup.data.product_sorts.filter(
          (e: { product_id: string; qty: number }) => e.product_id !== id
        );
      updatedSorts.push({ product_id: id, qty: +value, unit_price });
      openPopup("makeOrderPopup", { product_sorts: updatedSorts });
    } else if (value === "" && popupState.makeOrderPopup.data.product_sorts.length > 1) {
      const updatedSorts: { product_id: string; qty: number }[] =
        popupState.makeOrderPopup.data.product_sorts.filter(
          (e: { product_id: string; qty: number }) => e.product_id !== id
        );
      openPopup("makeOrderPopup", { product_sorts: updatedSorts });
    } else {
      closeOrderPopup("makeOrderPopup");
    }
  };
  const inputValue = popupState.makeOrderPopup.data.product_sorts.find(
    (e: { product_id: string; qty: number }) => e.product_id === id
  );
  //! remove product name if it takes to
  return (
    <>
      <tr>
        <td className="px-4 py-2 text-center">{formatDate(created_at)}</td>
        <td className="px-4 py-2 text-center">
          <Link className="hover:underline" href={`/categories/${product?.category?.id}`}>
            {product?.category?.name}
          </Link>
        </td>
        <td className="px-4 py-2 text-center">
          {Number(Number(unit_price).toFixed(2)).toLocaleString()} ج.م
        </td>
        <td className="px-4 py-2 text-center">{qty}</td>
        <td className="px-4 py-2 text-center">{size}</td>
        <td className="px-4 py-2 text-center">{product?.material}</td>
        <td className="px-4 py-2 text-center">{color ?? "لا يوجد"}</td>
        <td className="px-4 py-2 text-center">{name}</td>
        <td className="px-4 py-2 text-center">{product?.name}</td>
        <td className="px-4 py-2 text-center max-w-[69px]">
          <TextField
            id="Glu"
            dir="rtl"
            label="الكمية"
            variant="filled"
            sx={sameTextField}
            value={inputValue?.qty ?? ""}
            onChange={(e) =>
              +e.target.value > +qty
                ? handleInputs(qty.toString())
                : handleInputs(e.target.value.replace(/[^0-9.]/g, ""))
            }
            disabled={qty == 0}
          />
        </td>
      </tr>
    </>
  );
}
