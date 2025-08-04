"use client";
import { formatDate } from "@/app/utils/base";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { ProductInterface } from "@/app/utils/types/interfaces";
import Link from "next/link";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

export default function ProductsTableRows({
  id,
  index,
  name,
  desc,
  category,
  qty,
  material,
  sorts_count,
  note,
  created_at,
}: ProductInterface) {
  const { openPopup } = usePopup();
  const openSnakeBar = (message: string) => {
    openPopup("snakeBarPopup", { message });
  };
  const [openDesc, setOpenDesc] = useState(false);
  const onWantToDelete = () => {
    if (sorts_count !== 0) {
      openSnakeBar("لا يمكن حذف منتج يحتوي علي اصناف.");
      return;
    }
    openPopup("deleteAlertPopup", { id, name });
  };
  return (
    <tr>
      <td className="px-4 py-2 text-center">{index}</td>
      <td className="px-4 py-2">
        <p
          onClick={() => openPopup("sortsPopup", { name, id })}
          className="cursor-pointer font-semibold hover:no-underline underline cursor-pointer w-fit mx-auto"
        >
          {name}
        </p>
      </td>
      <td
        dir="rtl"
        onClick={() => setOpenDesc(!openDesc)}
        className={`cursor-pointer px-4 py-2 text-center max-w-[120px] ${!openDesc && "truncate"}`}
      >
        {desc ?? "لا يوجد"}
      </td>
      <td className={`px-4 py-2 text-center relative`}>{qty}</td>
      <td className="px-4 py-2 text-center">{material}</td>
      <td className="px-4 py-2 text-center">{sorts_count}</td>
      {category?.id && (
        <td className="px-4 py-2 text-center font-semibold hover:no-underline underline cursor-pointer">
          <Link href={`/categories/${category.id}`}>{category.name}</Link>
        </td>
      )}
      <td className="px-4 py-2 text-center">{note ?? "لا يوجد"}</td>
      <td className="px-4 py-2 text-center">{formatDate(created_at)}</td>
      <td className="px-4 py-2 text-center">
        <div dir="rtl" className="w-fit ml-auto flex items-center gap-2 mx-auto">
          <p
            onClick={() => openPopup("editProductPopup", { id, title: name, desc, material, note })}
            className="w-fit text-xl hover:text-orange-600 cursor-pointer text-anotherDark"
          >
            <CiEdit />
          </p>
          <p
            onClick={onWantToDelete}
            className="w-fit text-xl ml-auto hover:text-red-700 cursor-pointer text-anotherDark"
          >
            <MdDeleteOutline />
          </p>
        </div>
      </td>
    </tr>
  );
}
