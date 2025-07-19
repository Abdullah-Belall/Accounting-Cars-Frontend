"use client";
import { notFoundSlug } from "@/app/utils/base";
import { StockChecksItemsInterface } from "@/app/utils/types/interfaces";
import { useParams } from "next/navigation";

export default function StockChecksItemsTableRows({
  index,
  sort,
  equipment,
  recorded_quantity,
  actual_quantity,
  difference,
}: StockChecksItemsInterface) {
  const params = useParams();
  return (
    <>
      <tr>
        <td className="px-4 py-2 text-center">{index}</td>
        {params?.type === "equipments" ? (
          <td className="px-4 py-2 text-center">{equipment?.name}</td>
        ) : (
          <>
            <td className="px-4 py-2 text-center">{notFoundSlug(sort?.product?.name)}</td>
            <td className="px-4 py-2 text-center">{notFoundSlug(sort?.name)}</td>
            <td className="px-4 py-2 text-center">{notFoundSlug(sort?.color)}</td>
            <td className="px-4 py-2 text-center">{notFoundSlug(sort?.product?.material)}</td>
            <td className="px-4 py-2 text-center">{notFoundSlug(sort?.size)}</td>
          </>
        )}
        <td className="px-4 py-2 text-center">{recorded_quantity}</td>
        <td className="px-4 py-2 text-center">{actual_quantity}</td>
        <td className="px-4 py-2 text-center">{difference}</td>
      </tr>
    </>
  );
}
