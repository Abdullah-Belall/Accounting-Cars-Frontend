"use client";
import { formatDate } from "@/app/utils/base";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { CrmDatesInterface } from "@/app/utils/types/interfaces";
import { MdDeleteOutline } from "react-icons/md";

export default function CrmDatesTableRow({ data }: { data: CrmDatesInterface }) {
  const { id, created_at, index, note } = data;
  const { openPopup } = usePopup();
  return (
    <tr>
      <td className="px-4 py-2 text-center">{index}</td>
      <td className="px-4 py-2 text-center">{note}</td>
      <td className="px-4 py-2 text-center">{formatDate(created_at)}</td>
      <td className="px-4 py-2 text-center">
        <div dir="rtl" className="w-fit ml-auto flex items-center gap-2 mx-auto">
          <p
            onClick={() => openPopup("deleteCrmDate", { id, created_at })}
            className="w-fit text-xl ml-auto hover:text-red-700 cursor-pointer text-anotherDark"
          >
            <MdDeleteOutline />
          </p>
        </div>
      </td>
    </tr>
  );
}
