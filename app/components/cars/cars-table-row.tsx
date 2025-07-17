import { carTypesArray, formatDate, getSlug } from "@/app/utils/base";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { CarsInterface } from "@/app/utils/types/interfaces";
import { Radio } from "@mui/material";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

export default function CarsTableRow({
  data,
  isOrder,
}: {
  data: CarsInterface;
  isOrder?: boolean;
}) {
  const { index, id, client, mark, type, plate, chassis, color, model, category, created_at } =
    data;
  const { openPopup, popupState } = usePopup();
  const HandleUi = () => {
    if (isOrder) {
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
            onChange={() => openPopup("makeOrderPopup", { car: { id, client } })}
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
    <tr>
      <td className="px-4 py-2 text-center">{isOrder ? <HandleUi /> : index + 1}</td>
      <td className="px-4 py-2 text-center">{client?.user_name}</td>
      <td className="px-4 py-2 text-center">
        {mark && mark !== "" ? (
          <p className="cursor-pointer font-semibold hover:no-underline underline w-fit mx-auto">
            <Link href={`/clients/${client?.id}/car/${id}?client=${client?.user_name}&car=${mark}`}>
              {mark}
            </Link>
          </p>
        ) : (
          "لا يوجد"
        )}
      </td>
      <td className="px-4 py-2 text-center">{plate && plate !== "" ? plate : "لا يوجد"}</td>
      <td className="px-4 py-2 text-center">{color && color !== "" ? color : "لا يوجد"}</td>
      <td className="px-4 py-2 text-center">{type ? getSlug(carTypesArray, type) : "لا يوجد"}</td>
      <td className="px-4 py-2 text-center">{category ?? "لا يوجد"}</td>
      <td className="px-4 py-2 text-center">{model ?? "لا يوجد"}</td>
      <td className="px-4 py-2 text-center">{chassis && chassis !== "" ? chassis : "لا يوجد"}</td>
      <td className="px-4 py-2 text-center">{formatDate(created_at)}</td>
      <td className="px-4 py-2 text-center">
        <div dir="rtl" className="w-fit ml-auto flex items-center gap-2 mx-auto">
          <p
            onClick={() =>
              openPopup("carForm", {
                mark,
                type,
                plate,
                chassis,
                color,
                model,
                category,
                id,
              })
            }
            className="w-fit text-xl hover:text-orange-600 cursor-pointer text-anotherDark"
          >
            <CiEdit />
          </p>
          <p
            onClick={() => openPopup("deleteAlertPopup", { id, mark })}
            className="w-fit text-xl ml-auto hover:text-red-700 cursor-pointer text-anotherDark"
          >
            <MdDeleteOutline />
          </p>
        </div>
      </td>
    </tr>
  );
}
