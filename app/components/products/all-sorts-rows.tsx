"use client";

import { formatDate } from "@/app/utils/base";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { SortInterface } from "@/app/utils/types/interfaces";

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
  return (
    <>
      <tr>
        <td className="px-4 py-2 text-center max-w-[69px]">
          <input
            placeholder="الكمية"
            className={`${
              qty == 0 && "opacity-[.4]"
            } rounded-md placeholder:text-[12px] outline-0 border border-myDark max-w-[45px] h-[35] mr-2 text-center`}
            value={inputValue?.qty ?? ""}
            onChange={(e) =>
              +e.target.value > +qty
                ? handleInputs(qty.toString())
                : handleInputs(e.target.value.replace(/[^0-9.]/g, ""))
            }
            disabled={qty == 0}
          />
        </td>
        <td className="px-4 py-2 text-center">{product?.name}</td>
        <td className="px-4 py-2 text-center">{name && name !== "" ? name : "لا يوجد"}</td>
        <td className="px-4 py-2 text-center">{color && color !== "" ? color : "لا يوجد"}</td>
        <td className="px-4 py-2 text-center">
          {product?.material && product?.material !== "" ? product?.material : "لا يوجد"}
        </td>
        <td className="px-4 py-2 text-center">{size && size !== "" ? size : "لا يوجد"}</td>
        <td className="px-4 py-2 text-center">{qty}</td>
        <td className="px-4 py-2 text-center">
          {Number(Number(unit_price).toFixed(2)).toLocaleString()} ج.م
        </td>

        <td className="px-4 py-2 text-center">{formatDate(created_at)}</td>
      </tr>
    </>
  );
}
