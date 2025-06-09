"use client";
import { formatDate } from "@/app/utils/base";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { ProductInterface } from "@/app/utils/types/interfaces";
import Link from "next/link";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";

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
  const [openDesc, setOpenDesc] = useState(false);
  return (
    <>
      <tr>
        <td className="px-4 py-2 text-center">
          <div dir="rtl" className="w-fit ml-auto flex items-center gap-2 mx-auto">
            <p
              onClick={() =>
                openPopup("editProductPopup", { id, title: name, desc, material, note })
              }
              className="w-fit text-xl hover:text-red-600 cursor-pointer text-anotherDark"
            >
              <CiEdit />
            </p>
          </div>
        </td>
        <td className="px-4 py-2 text-center">{formatDate(created_at)}</td>
        <td className="px-4 py-2 text-center">{note ?? "لا يوجد"}</td>
        <td className="px-4 py-2 text-center">{sorts_count}</td>
        <td className="px-4 py-2 text-center">{material}</td>
        <td className={`px-4 py-2 text-center relative`}>{qty}</td>
        {category?.id && (
          <td className="px-4 py-2 text-center hover:underline">
            <Link href={`/categories/${category.id}`}>{category.name}</Link>
          </td>
        )}
        <td
          dir="rtl"
          onClick={() => setOpenDesc(!openDesc)}
          className={`cursor-pointer px-4 py-2 text-center max-w-[120px] ${
            !openDesc && "truncate"
          }`}
        >
          {desc ?? "لا يوجد"}
        </td>
        <td className="px-4 py-2">
          <p
            onClick={() => openPopup("sortsPopup", { name, id })}
            className="cursor-pointer hover:underline w-fit mx-auto"
          >
            {name}
          </p>
        </td>
        <td className="px-4 py-2 text-center">{index}</td>
      </tr>
    </>
  );
}
