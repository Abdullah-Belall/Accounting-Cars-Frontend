"use client";
import { formatDate } from "@/app/utils/base";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { AbsenceInterface } from "@/app/utils/types/interfaces";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

export default function AbsenceTableRow({ data }: { data: AbsenceInterface }) {
  const { id, index, reason, created_at } = data;
  const { openPopup } = usePopup();

  return (
    <tr>
      <td className="px-4 py-2 text-center">{index}</td>
      <td className="px-4 py-2 text-center">{reason}</td>
      <td className="px-4 py-2 text-center">{formatDate(created_at)}</td>
      <td className="px-4 py-2 text-center">
        <div dir="rtl" className="w-fit ml-auto flex items-center gap-2 mx-auto">
          <p
            onClick={() => openPopup("absenceForm", { index, reason, id })}
            className="w-fit text-xl hover:text-orange-600 cursor-pointer text-anotherDark"
          >
            <CiEdit />
          </p>
          <p
            onClick={() => openPopup("deleteAlertPopup", { index, id })}
            className="w-fit text-xl ml-auto hover:text-red-700 cursor-pointer text-anotherDark"
          >
            <MdDeleteOutline />
          </p>
        </div>
      </td>
    </tr>
  );
}
