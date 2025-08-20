import { formatDate } from "@/app/utils/base";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { TenantChatIdInterface } from "@/app/utils/types/interfaces";
import { CiEdit } from "react-icons/ci";

export default function TenantsTelegramChatIdsTableRow({
  data,
  index,
}: {
  data: TenantChatIdInterface;
  index: number;
}) {
  const { id, chat_id, tenant_id, created_at } = data;
  const { openPopup } = usePopup();
  return (
    <tr>
      <td className="px-4 py-2 text-center">{index + 1}</td>
      <td className="px-4 py-2 text-center">{chat_id}</td>
      <td className="px-4 py-2 text-center">{formatDate(created_at)}</td>
      <td className="px-4 py-2 text-center">
        <div dir="rtl" className="w-fit ml-auto flex items-center gap-2 mx-auto">
          <p
            onClick={() =>
              openPopup("editTenantChatId", {
                id,
                chat_id,
                tenant_id,
              })
            }
            className="w-fit text-xl hover:text-orange-600 cursor-pointer text-anotherDark"
          >
            <CiEdit />
          </p>
          {/* <p
            onClick={onWantToDelete}
            className="w-fit text-xl ml-auto hover:text-red-700 cursor-pointer text-anotherDark"
          >
            <MdDeleteOutline />
          </p> */}
        </div>
      </td>
    </tr>
  );
}
