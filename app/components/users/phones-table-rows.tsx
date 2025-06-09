"use client";
import { formatDate } from "@/app/utils/base";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { PhoneInterface } from "@/app/utils/types/interfaces";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

export default function PhonesTabelRow({
  data: { index, id, phone, note, created_at },
  type,
}: {
  data: PhoneInterface;
  type: "العميل" | "الموظف";
}) {
  const { openPopup } = usePopup();

  return (
    <>
      <tr>
        {type === "العميل" && (
          <>
            <td className="px-4 py-2 text-center">
              <div dir="rtl" className="w-fit ml-auto flex items-center gap-2 mx-auto">
                <p
                  onClick={() => openPopup("editPhonePopup", { phone, note, id })}
                  className="w-fit text-xl hover:text-red-600 cursor-pointer text-anotherDark"
                >
                  <CiEdit />
                </p>
                <p
                  onClick={() => openPopup("deleteAlertPopup", { id, index })}
                  className="w-fit text-xl ml-auto hover:text-orange-700 cursor-pointer text-anotherDark"
                >
                  <MdDeleteOutline />
                </p>
              </div>
            </td>
          </>
        )}
        <td className="px-4 py-2 text-center">{formatDate(created_at)}</td>
        <td className="px-4 py-2 text-center">{note ?? "لا يوجد"}</td>
        <td className="px-4 py-2 text-center">{phone}</td>
        <td className="px-4 py-2 text-center">{index}</td>
      </tr>
    </>
  );
}
