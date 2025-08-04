"use client";
import { formatDate } from "@/app/utils/base";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { CrmInterface } from "@/app/utils/types/interfaces";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
export default function CrmTableRows({ data }: { data: CrmInterface }) {
  const { id, name, next_call_date, created_at, index } = data;
  const { openPopup } = usePopup();

  return (
    <tr>
      <td className="px-4 py-2 text-center">{index}</td>
      <td className="px-4 py-2">
        <p
          onClick={() => openPopup("crmDates", { id, name })}
          className="cursor-pointer font-semibold hover:no-underline underline cursor-pointer w-fit mx-auto"
        >
          {name}
        </p>
      </td>
      <td className="px-4 py-2 text-center">{formatDate(next_call_date)?.slice(0, 10)}</td>
      <td className="px-4 py-2 text-center">{formatDate(created_at)}</td>
      <td className="px-4 py-2 text-center">
        <div dir="rtl" className="w-fit ml-auto flex items-center gap-2 mx-auto">
          <p
            onClick={() => openPopup("editCrm", { id, name, next_call_date })}
            className="w-fit text-xl hover:text-orange-600 cursor-pointer text-anotherDark"
          >
            <CiEdit />
          </p>
          <p
            onClick={() => openPopup("deleteCrm", { id, name })}
            className="w-fit text-xl ml-auto hover:text-red-700 cursor-pointer text-anotherDark"
          >
            <MdDeleteOutline />
          </p>
        </div>
      </td>
    </tr>
  );
}
