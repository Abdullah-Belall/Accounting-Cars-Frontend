"use client";
import { formatDate } from "@/app/utils/base";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { ExpensesInterface } from "@/app/utils/types/interfaces";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

export default function ExpensesTableRows({
  index,
  id,
  name,
  amount,
  note,
  created_at,
  forEdit,
}: ExpensesInterface) {
  const { openPopup } = usePopup();
  const onWantToDelete = () => {
    openPopup("deleteAlertPopup", { id, name });
  };
  return (
    <>
      <tr>
        <td className="px-4 py-2 text-center">
          <div dir="rtl" className="w-fit ml-auto flex items-center gap-2 mx-auto">
            <p
              onClick={() =>
                forEdit({
                  title: "تعديل مصروف",
                  isForEdit: { id, name, amount, note },
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
        <td className="px-4 py-2 text-center">{formatDate(created_at)}</td>
        <td className="px-4 py-2 text-center">{note ?? "لا يوجد"}</td>
        <td className="px-4 py-2 text-center">- {Number(amount).toLocaleString()} ج.م</td>
        <td className="px-4 py-2">
          <p className="w-fit mx-auto hover:underline cursor-pointer">{name}</p>
        </td>
        <td className="px-4 py-2 text-center">{index}</td>
      </tr>
    </>
  );
}
