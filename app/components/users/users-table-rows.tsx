"use client";
import { formatDate } from "@/app/utils/base";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { Radio } from "@mui/material";
import Link from "next/link";

export default function UsersTableRows({
  index,
  id,
  name,
  tax_num,
  completed_orders,
  date,
  phone_count,
  type,
  role,
  isForOrder,
}: {
  index: number;
  id: string;
  name: string;
  tax_num: string;
  completed_orders: number;
  phone_count: number;
  addresses_count: number;
  date: Date;
  type: "worker" | "client";
  role: "موظف" | "مالك" | "مراقب";
  isForOrder?: boolean;
}) {
  const { popupState, openPopup } = usePopup();
  const HandleUi = () => {
    if (popupState.makeOrderPopup.data.client?.id === id) {
      return (
        <Radio
          checked
          sx={{
            "&.Mui-checked": {
              color: "var(--mdDark)",
            },
          }}
        />
      );
    } else {
      return (
        <Radio
          onChange={() => openPopup("makeOrderPopup", { client: { id, name } })}
          sx={{
            "&.Mui-checked": {
              color: "var(--mdDark)",
            },
          }}
        />
      );
    }
  };
  return (
    <>
      <tr>
        <td className="px-4 py-2 text-center">{formatDate(date)}</td>
        {/* {type === "client" && <td className="px-4 py-2 text-center">{addresses_count}</td>} */}
        {type === "worker" && <td className="px-4 py-2 text-center">{role}</td>}
        <td className="px-4 py-2 text-center">{phone_count}</td>
        {type === "client" && <td className="px-4 py-2 text-center">{completed_orders}</td>}
        {type === "client" && (
          <td className="px-4 py-2 text-center">
            {!tax_num || tax_num === "" ? "لا يوجد" : tax_num}
          </td>
        )}
        <td className="px-4 py-2 text-center">
          <Link className="w-fit hover:underline" href={`/${type}s/${id}`}>
            {name}
          </Link>
        </td>
        <td className="px-4 py-2 text-center">{isForOrder ? <HandleUi /> : index}</td>
      </tr>
    </>
  );
}
