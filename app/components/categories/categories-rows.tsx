"use client";
import { formatDate } from "@/app/utils/base";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

export default function CategoriesTableRow({
  index,
  title,
  desc,
  product_count,
  date,
  id,
}: {
  index: number;
  title: string;
  desc: string;
  product_count: number;
  date: Date;
  id: string;
}) {
  const { openPopup } = usePopup();
  const openSnakeBar = (message: string) => {
    openPopup("snakeBarPopup", { message });
  };
  const onWantToDelete = () => {
    if (product_count !== 0) {
      openSnakeBar("لا يمكن حذف فئة تحتوي علي منتجات.");
      return;
    }
    openPopup("deleteAlertPopup", { id, title });
  };
  return (
    <>
      <tr>
        <td className="px-4 py-2 text-center">
          <div dir="rtl" className="w-fit ml-auto flex items-center gap-2 mx-auto">
            <p
              onClick={() =>
                openPopup("editCategoryPopup", {
                  id,
                  title,
                  desc: desc === "لا يوجد" ? null : desc,
                })
              }
              className="w-fit text-xl hover:text-red-600 cursor-pointer text-anotherDark"
            >
              <CiEdit />
            </p>
            <p
              onClick={onWantToDelete}
              className="w-fit text-xl ml-auto hover:text-orange-700 cursor-pointer text-anotherDark"
            >
              <MdDeleteOutline />
            </p>
          </div>
        </td>
        <td className="px-4 py-2 text-center">{formatDate(date)}</td>
        <td className="px-4 py-2 text-center">{product_count}</td>
        <td className="px-4 py-2 text-center">{desc}</td>
        <td className="px-4 py-2">
          <p className="cursor-pointer hover:underline w-fit mx-auto">
            <Link href={`/categories/${id}`}>{title}</Link>
          </p>
        </td>
        <td className="px-4 py-2 text-center">{index}</td>
      </tr>
    </>
  );
}
