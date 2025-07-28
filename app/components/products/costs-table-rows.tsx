"use client";
import { formatDate, shortIdGenerator } from "@/app/utils/base";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { CostsInterface } from "@/app/utils/types/interfaces";
import { Checkbox } from "@mui/material";
import { useRouter } from "next/navigation";

export default function CostsTableRows({
  short_id,
  id,
  sort,
  qty,
  price,
  created_at,
  is_paid,
}: CostsInterface) {
  const router = useRouter();
  const { openPopup, popupState } = usePopup();
  const statusColor = is_paid ? "bg-green-900 text-green-300" : "bg-yellow-900 text-yellow-300";
  const delv: any[] = popupState.costsCollector.data?.checked;
  const CheckboxViewar = () => {
    const currentDelv = Array.isArray(delv) ? delv : [];
    const isChecked = currentDelv.findIndex((e) => e?.id === id) !== -1;
    return (
      <Checkbox
        checked={isChecked}
        onChange={() => {
          if (isChecked) {
            openPopup("costsCollector", { checked: currentDelv.filter((e) => e?.id !== id) });
          } else {
            console.log("add");
            openPopup("costsCollector", {
              checked: [
                ...currentDelv,
                {
                  id,
                  qty,
                  unit_price: Number(price) / Number(qty),
                  is_paid,
                  short_id,
                  sort,
                },
              ],
            });
          }
        }}
        sx={{
          "&.Mui-checked": {
            color: "var(--mdDark)",
          },
        }}
      />
    );
  };
  return (
    <>
      <tr>
        <td className="px-4 py-2 text-center">
          <CheckboxViewar />
        </td>
        <td className="px-4 py-2 text-center">{shortIdGenerator(short_id)}</td>
        <td className="px-4 py-2">
          <p
            onClick={() => {
              router.push(`/products`);
              openPopup("sortsPopup", { id: sort?.product?.id, name: sort?.product?.name });
            }}
            className="w-fit mx-auto font-semibold hover:no-underline underline cursor-pointer"
          >
            {sort?.product?.name}
          </p>
        </td>
        <td className="px-4 py-2">
          <p
            onClick={() => {
              router.push(`/products`);
              openPopup("sortsPopup", { id: sort?.product?.id, name: sort?.product?.name });
            }}
            className="w-fit mx-auto font-semibold hover:no-underline underline cursor-pointer"
          >
            {sort?.name && sort?.name !== "" ? sort?.name : "لا يوجد"}
          </p>
        </td>
        <td className={`px-4 py-2 text-center max-w-[120px]`}>
          {sort?.color && sort?.color !== "" ? sort?.color : "لا يوجد"}
        </td>
        <td className={`px-4 py-2 text-center max-w-[120px]`}>
          {sort?.size && sort?.size !== "" ? sort?.size : "لا يوجد"}
        </td>
        <td className={`px-4 py-2 text-center`}>{qty}</td>
        <td className="px-4 py-2 text-center">
          {Math.abs(Number(price) / Number(qty)).toLocaleString()}
        </td>
        <td className="px-4 py-2 text-center">
          {qty > 0 && "-"} {Number(price).toLocaleString()}
        </td>
        <td className="px-4 py-2 text-center">
          <button
            onClick={() => openPopup("suppliersBills", { id, short_id: short_id })}
            className={`${statusColor} cursor-pointer w-fit text-nowrap mx-auto px-2 py-1 rounded-[4px] text-center`}
          >
            {is_paid ? "مسددة" : "لم تسدد"}
          </button>
        </td>
        <td className="px-4 py-2 text-center">{formatDate(created_at)}</td>
      </tr>
    </>
  );
}
