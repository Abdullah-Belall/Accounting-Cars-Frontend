import { formatDate, notFoundSlug } from "@/app/utils/base";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { AdvanceInterface } from "@/app/utils/types/interfaces";
import { CiEdit } from "react-icons/ci";

export default function AdvanceTableRow({ data }: { data: AdvanceInterface }) {
  const { openPopup } = usePopup();
  const { id, index, amount, created_at, note, is_paid } = data;
  const statusColor = is_paid ? "bg-green-900 text-green-300" : "bg-yellow-900 text-yellow-300";
  return (
    <tr>
      <td className="px-4 py-2 text-center">{index}</td>
      <td className="px-4 py-2 text-center">{Number(amount).toLocaleString()}</td>
      <td className="px-4 py-2 text-center">{notFoundSlug(note)}</td>
      <td className="px-4 py-2 text-center">
        <button
          onClick={() =>
            openPopup("payAdvance", {
              id,
              amount,
              index,
            })
          }
          className={`${statusColor} cursor-pointer w-fit text-nowrap mx-auto px-2 py-1 rounded-[4px] text-center`}
        >
          {is_paid ? "مسددة" : "لم تسدد"}
        </button>
      </td>
      <td className="px-4 py-2 text-center">{formatDate(created_at)}</td>
      <td className="px-4 py-2 text-center">
        <div dir="rtl" className="w-fit ml-auto flex items-center gap-2 mx-auto">
          <p
            onClick={() =>
              openPopup("advanceForm", {
                amount,
                note,
                id,
              })
            }
            className="w-fit text-xl hover:text-orange-600 cursor-pointer text-anotherDark"
          >
            <CiEdit />
          </p>
        </div>
      </td>
    </tr>
  );
}
