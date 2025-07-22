"use client";
import { formatDate } from "@/app/utils/base";
import { useWorkerSalary } from "@/app/utils/contexts/paying-salaries-context";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { useUser } from "@/app/utils/contexts/UserContext";
import { Checkbox, Radio } from "@mui/material";
import Link from "next/link";

export default function UsersTableRows({
  index,
  id,
  name,
  tax_num,
  cars_count,
  date,
  phone_count,
  type,
  role,
  isForOrder,
  salary,
  paySalaries,
}: {
  index: number;
  id: string;
  name: string;
  tax_num: string;
  cars_count: number;
  phone_count: number;
  addresses_count: number;
  date: Date;
  type: "worker" | "client";
  role: "موظف" | "مالك" | "مراقب";
  isForOrder?: boolean;
  salary?: number;
  paySalaries?: boolean;
}) {
  const { popupState, openPopup } = usePopup();
  const { user } = useUser();
  const { findOne, add, deleteByWorkerId } = useWorkerSalary();
  const HandleUi = () => {
    if (isForOrder) {
      if (popupState.makeOrderPopup.data.car?.id === id) {
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
    } else {
      if (!salary) {
        return (
          <Checkbox
            disabled
            className="!opacity-[.5]"
            sx={{
              "&.Mui-checked": {
                color: "var(--mdDark)",
              },
            }}
          />
        );
      } else if (findOne(name)) {
        return (
          <Checkbox
            checked
            onChange={() => {
              deleteByWorkerId(name);
            }}
            sx={{
              "&.Mui-checked": {
                color: "var(--mdDark)",
              },
            }}
          />
        );
      } else {
        return (
          <Checkbox
            onChange={() => {
              add({ worker_id: name, salary });
            }}
            sx={{
              "&.Mui-checked": {
                color: "var(--mdDark)",
              },
            }}
          />
        );
      }
    }
  };
  return (
    <>
      <tr>
        <td className="px-4 py-2 text-center">
          {isForOrder || paySalaries ? <HandleUi /> : index}
        </td>
        <td className="px-4 py-2 text-center">
          <Link
            className="w-fit font-semibold hover:no-underline underline cursor-pointer"
            href={user?.id === id ? `/profile` : `/${type}s/${id}`}
          >
            {name}
          </Link>
        </td>
        {type === "client" && (
          <td className="px-4 py-2 text-center">
            {!tax_num || tax_num === "" ? "لا يوجد" : tax_num}
          </td>
        )}
        {type === "client" && <td className="px-4 py-2 text-center">{cars_count}</td>}
        {type === "worker" && <td className="px-4 py-2 text-center">{role}</td>}
        {type === "worker" && (
          <td className="px-4 py-2 text-center">{salary ? `ج.م ${salary}` : "غير محدد"}</td>
        )}
        <td className="px-4 py-2 text-center">{phone_count}</td>
        <td className="px-4 py-2 text-center">{formatDate(date)}</td>
      </tr>
    </>
  );
}
