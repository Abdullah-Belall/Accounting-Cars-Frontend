import { formatDate, getSlug, notFoundSlug, deductionStatusArr } from "@/app/utils/base";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { DeductionInterface } from "@/app/utils/types/interfaces";
import { CiEdit } from "react-icons/ci";

export default function DeductionTableRow({ data }: { data: DeductionInterface }) {
  const { id, index, amount, note, status, created_at } = data;
  const { openPopup } = usePopup();
  const statusColor =
    status === "pending"
      ? "bg-yellow-900 text-yellow-300"
      : status === "applied"
      ? "bg-green-900 text-green-300"
      : "bg-red-900 text-red-300";

  return (
    <tr>
      <td className="px-4 py-2 text-center">{index + 1}</td>
      <td className="px-4 py-2 text-center">{Number(amount).toLocaleString()}</td>
      <td className="px-4 py-2 text-center">{notFoundSlug(note)}</td>
      <td className="px-4 py-2 text-center">
        <button
          onClick={() => openPopup("editDeductionStatus", { index: index + 1, id, status })}
          className={`${statusColor} cursor-pointer w-fit text-nowrap mx-auto px-2 py-1 rounded-[4px] text-center`}
        >
          {getSlug(deductionStatusArr, status)}
        </button>
      </td>
      <td className="px-4 py-2 text-center">{formatDate(created_at)}</td>
      <td className="px-4 py-2 text-center">
        <div dir="rtl" className="w-fit ml-auto flex items-center gap-2 mx-auto">
          <p
            onClick={() => openPopup("editDeduction", { index: index + 1, id, amount, note })}
            className="w-fit text-xl hover:text-orange-600 cursor-pointer text-anotherDark"
          >
            <CiEdit />
          </p>
        </div>
      </td>
    </tr>
  );
}
