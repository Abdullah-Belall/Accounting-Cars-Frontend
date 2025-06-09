"use client";
import { formatDate, getSlug, methodsArray, paidStatusArray } from "@/app/utils/base";
import { useBills } from "@/app/utils/contexts/bills-contexts";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import {
  CLIENT_COLLECTOR_REQ,
  GET_ORDER_ITEMS_REQ,
} from "@/app/utils/requests/client-side.requests";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CiEdit } from "react-icons/ci";
import { IoIosPrint } from "react-icons/io";

export default function OrdersTableRow({
  earning,
  payment_method,
  payment_status,
  date,
  tableFor,
  id,
  index,
  tax,
  discount,
  client: { client_id, name },
  short_id,
}: {
  index: number;
  id: string;
  earning: number;
  payment_method: string;
  payment_status: string;
  date: Date;
  tableFor: "client" | "overview";
  client: {
    client_id: string;
    name: string;
  };
  tax: string;
  discount: number;
  short_id: string;
}) {
  const router = useRouter();
  const { setBills } = useBills();
  const formattedEarnig = earning.toLocaleString();
  let totalPriceAfter = earning;
  if (tax != "0") {
    totalPriceAfter = (totalPriceAfter * Number(tax)) / 100 + totalPriceAfter;
  }
  if (discount) {
    totalPriceAfter -= discount;
  }
  const { openPopup } = usePopup();
  const paymentMethodSlug = (method: string) => {
    return methodsArray.find((e) => e.value === method)?.label;
  };
  const paymentStatusSlug = (status: string) => {
    return paidStatusArray.find((e) => e.value === status)?.label;
  };
  const dataForPrint = async () => {
    const response: any = await CLIENT_COLLECTOR_REQ(GET_ORDER_ITEMS_REQ, { id });
    if (response.done) {
      const data = response.data;
      const sortsData = data?.order_items?.map((item: any, index: number) => ({
        color: item?.sort?.color,
        index: index + 1,
        id: item?.sort?.id,
        name: item?.sort?.name,
        size: item?.sort?.size,
        qty: item?.qty,
        unit_price: item?.unit_price,
        product: {
          name: item?.sort?.product?.name,
          id: item?.sort?.product?.id,
          material: item?.sort?.product?.material,
        },
      }));
      setBills({
        type: "order",
        bill_id: data?.short_id,
        client: {
          name: data?.client.user_name,
          id: data?.client?.id,
        },
        data: sortsData,
        totals: {
          totalPrice: (
            data?.total_price * (data?.tax && data?.tax !== "" ? Number(data?.tax) / 100 + 1 : 1) -
            (data?.discount === "" ? 0 : Number(data?.discount))
          ).toString(),
          tax: data?.tax + "%",
          discount: data?.discount,
          paid_status: getSlug(paidStatusArray, data?.payment.status),
          payment_method: getSlug(methodsArray, data?.payment?.payment_method),
          created_at: data?.created_at,
        },
      });
      router.push("/bill");
    }
  };
  return (
    <>
      <tr>
        <td className="px-4 py-2 text-center">
          <div dir="rtl" className="w-fit ml-auto flex items-center gap-2 mx-auto">
            <p
              onClick={dataForPrint}
              className="w-fit text-xl hover:text-myDark cursor-pointer text-anotherDark"
            >
              <IoIosPrint />
            </p>
            <p
              onClick={() =>
                openPopup("editOrderPopup", {
                  id,
                  tax: `${tax}%`,
                  discount,
                  earning,
                  payment_method,
                  payment_status,
                  index,
                })
              }
              className="w-fit text-xl hover:text-red-600 cursor-pointer text-anotherDark"
            >
              <CiEdit />
            </p>
          </div>
        </td>
        <td className="px-4 py-2 text-center">{formatDate(date)}</td>
        <td className="px-4 py-2 text-center">{paymentStatusSlug(payment_status)}</td>
        <td className="px-4 py-2 text-center">{paymentMethodSlug(payment_method)}</td>
        <td className="px-4 py-2 text-center">
          {totalPriceAfter > 0 ? totalPriceAfter.toLocaleString() : 0} ج.م
        </td>
        <td className="px-4 py-2 text-center">{discount} ج.م</td>
        <td className="px-4 py-2 text-center">{tax}%</td>
        <td className="px-4 py-2 text-center">{formattedEarnig} ج.م</td>
        <td className="px-4 py-2">
          <p
            onClick={() => openPopup("ordersPopup", { id, index: short_id.slice(4) })}
            className="cursor-pointer hover:underline w-fit mx-auto"
          >
            عرض الكل
          </p>
        </td>
        {tableFor === "overview" && (
          <td className="px-4 py-2 text-center cursor-pointer hover:underline">
            <Link href={`/clients/${client_id}`}>{name}</Link>
          </td>
        )}
        <td className="px-4 py-2 text-center">{short_id.slice(4)}</td>
      </tr>
    </>
  );
}
