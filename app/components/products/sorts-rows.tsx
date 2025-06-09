"use client";

import { formatDate } from "@/app/utils/base";
import { ProductItemInterface } from "@/app/utils/types/interfaces";
import styles from "@/app/styles/product-qty.module.css";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { CiEdit } from "react-icons/ci";

interface ProductItemFetchedInterface extends ProductItemInterface {
  refetchOnEdit?: any;
}

export default function SortsTableRows({
  index,
  id,
  name,
  color,
  size,
  qty,
  unit_price,
  orders_count,
  note,
  created_at,
  refetchOnEdit,
}: ProductItemFetchedInterface) {
  const { openPopup } = usePopup();

  return (
    <>
      <tr>
        <td className="px-4 py-2 text-center">
          <div dir="rtl" className="w-fit ml-auto flex items-center gap-2 mx-auto">
            <p
              onClick={() =>
                openPopup("editSortPopup", {
                  sort_id: id,
                  name,
                  size,
                  color,
                  qty,
                  unit_price,
                  note,
                  refetchOnEdit,
                })
              }
              className="w-fit text-xl hover:text-red-600 cursor-pointer text-anotherDark"
            >
              <CiEdit />
            </p>
          </div>
        </td>
        <td className="px-4 py-2 text-center">{formatDate(created_at)}</td>
        <td className="px-4 py-2 text-center">{note ?? "لا يوجد"}</td>
        <td className="px-4 py-2 text-center">{orders_count}</td>
        <td className="px-4 py-2 text-center">
          {Number(Number(unit_price).toFixed(2)).toLocaleString()} ج.م
        </td>
        <td
          onClick={() =>
            openPopup("editQtyPopup", {
              id,
              currQty: qty,
              title: name,
              refetchOnEdit,
            })
          }
          className={`${styles.mioQty} px-4 py-2 text-center relative cursor-pointer`}
        >
          {qty}
        </td>
        <td className="px-4 py-2 text-center">{size}</td>
        <td className="px-4 py-2 text-center">{color ?? "لا يوجد"}</td>
        <td className="px-4 py-2 text-center">{name ?? "لا يوجد"}</td>
        <td className="px-4 py-2 text-center">{index}</td>
      </tr>
    </>
  );
}
