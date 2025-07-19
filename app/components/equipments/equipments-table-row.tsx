import { formatDate } from "@/app/utils/base";
import { useStockChecks } from "@/app/utils/contexts/stock-checks-contexts";
import { EquipmentInterface } from "@/app/utils/types/interfaces";

export default function EquipmentsTableRow({
  data,
  stockChecks,
}: {
  data: EquipmentInterface;
  stockChecks?: boolean;
}) {
  const { index, id, name, qty, unit_price, created_at } = data;
  const { deleteBySortId, add, findOne } = useStockChecks();
  const onChange = (actual_qty: string) => {
    deleteBySortId(id);
    if (actual_qty !== "") {
      add({
        sort_id: id,
        qty: +actual_qty,
      });
    }
  };
  return (
    <tr>
      {stockChecks ? (
        <td className="px-4 py-2 text-center max-w-[69px]">
          <input
            placeholder="الكمية"
            className="rounded-md placeholder:text-[12px] outline-0 border border-myDark max-w-[45px] h-[35] mr-2 text-center"
            value={findOne(id)?.qty ?? ""}
            onChange={(e) => onChange(e.target.value)}
          />
        </td>
      ) : (
        <td className="px-4 py-2 text-center">{index}</td>
      )}
      <td className="px-4 py-2 text-center">{name}</td>
      <td className="px-4 py-2 text-center">{qty}</td>
      {!stockChecks && (
        <>
          <td className="px-4 py-2 text-center">{Number(unit_price).toLocaleString()} ج.م</td>
          <td className="px-4 py-2 text-center">
            - {(Number(unit_price) * Number(qty)).toLocaleString()} ج.م
          </td>
          <td className="px-4 py-2 text-center">{formatDate(created_at)}</td>
        </>
      )}
    </tr>
  );
}
