"use client";
import {
  formatDate,
  getSlug,
  methodsArray,
  paidStatusArray,
  shortIdGenerator,
} from "@/app/utils/base";
import { useBills } from "@/app/utils/contexts/bills-contexts";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import {
  CLIENT_COLLECTOR_REQ,
  GET_ORDER_ITEMS_REQ,
} from "@/app/utils/requests/client-side.requests";
import { CarsInterface } from "@/app/utils/types/interfaces";
import { Checkbox } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CiEdit } from "react-icons/ci";
import { IoIosPrint } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";

export default function OrdersTableRow({
  earning,
  payment_method,
  payment_status,
  date,
  id,
  tax,
  discount,
  client: { client_id, name },
  additional_fees,
  short_id,
  installment_type,
  down_payment,
  installment,
  next_payment_date,
  car,
  isForSelect,
  client_balance,
  total_cost_price,
}: {
  index: number;
  id: string;
  earning: number;
  payment_method: string;
  payment_status: string;
  date: Date;
  client: {
    client_id: string;
    name: string;
  };
  tax: string;
  discount: number;
  additional_fees?: number;
  short_id: number;
  installment_type?: string;
  down_payment?: number;
  client_balance?: number;
  installment?: number;
  next_payment_date?: Date;
  car: CarsInterface;
  isForSelect?: boolean;
  total_cost_price: number;
}) {
  const router = useRouter();
  const { setBills } = useBills();
  const formattedEarnig = earning.toLocaleString();
  const totalPriceAfter = earning;
  const { openPopup, popupState } = usePopup();
  const paymentMethodSlug = (method: string) => {
    return methodsArray.find((e) => e.value === method)?.label;
  };
  const paymentStatusSlug = (status: string) => {
    return paidStatusArray.find((e) => e.value === status)?.label;
  };
  const dataForPrint = async () => {
    const response: any = await CLIENT_COLLECTOR_REQ(GET_ORDER_ITEMS_REQ, { id });
    console.log(response);
    if (response.done) {
      const data = response.data;
      const sortsData = data?.order_items?.map((item: any, index: number) => ({
        color: item?.sort?.color,
        index: index + 1,
        id: item?.sort?.id,
        name: item?.sort?.name ?? item?.additional_band,
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
        car: data?.car,
        data: sortsData,
        totals: {
          totalPrice: data?.total_price_after,
          tax: data?.tax + "%",
          additional_fees: data?.additional_fees,
          client_balance: data?.car?.client?.balance,
          take_from_client_balance: data?.payment?.client_balance,
          discount: data?.discount,
          down_payment: data?.payment?.down_payment,
          paid_status: getSlug(paidStatusArray, data?.payment.status),
          payment_method: getSlug(methodsArray, data?.payment?.payment_method),
          created_at: data?.created_at,
          client_depts: data?.client_depts,
        },
      });
      const billPath = window.localStorage.getItem("bill_path");
      router.push(billPath ?? "/bill");
    }
  };
  const statusColor =
    payment_status === "paid"
      ? "bg-green-900 text-green-300"
      : payment_status === "installments"
      ? "bg-yellow-900 text-yellow-300"
      : "bg-red-900 text-red-300";

  const delv: any[] = popupState.billCollector.data?.checked;
  const checkbox = () => {
    const currentDelv = Array.isArray(delv) ? delv : [];
    const isChecked = currentDelv.findIndex((e) => e === id) !== -1;
    return (
      <Checkbox
        checked={isChecked}
        onChange={() => {
          if (isChecked) {
            openPopup("billCollector", { checked: currentDelv.filter((e) => e !== id) });
          } else {
            console.log("add");
            openPopup("billCollector", { checked: [...currentDelv, id] });
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
          {isForSelect && popupState.billCollector.isOpen ? checkbox() : shortIdGenerator(short_id)}
        </td>
        <td className="px-4 py-2">
          <p className="cursor-pointer font-semibold hover:no-underline underline w-fit mx-auto">
            <Link href={`/clients/${client_id}`}>{name}</Link>
          </p>
        </td>
        <td className="px-4 py-2 text-center">
          {car?.mark && car?.mark !== "" ? (
            <p className="cursor-pointer font-semibold hover:no-underline underline w-fit mx-auto">
              <Link href={`/clients/${client_id}/car/${car?.id}?client=${name}&car=${car?.mark}`}>
                {car?.mark}
              </Link>
            </p>
          ) : (
            "لا يوجد"
          )}
        </td>
        <td className="px-4 py-2">
          <p
            onClick={() => openPopup("ordersPopup", { id, index: short_id })}
            className="cursor-pointer text-nowrap font-semibold hover:no-underline underline w-fit mx-auto"
          >
            عرض الكل
          </p>
        </td>
        <td className="px-4 py-2 text-center">{discount}</td>
        <td className="px-4 py-2 text-center">{formattedEarnig}</td>
        <td className="px-4 py-2 text-center">{client_balance ?? 0}</td>
        <td className="px-4 py-2 text-center">{Number(total_cost_price || 0).toLocaleString()}</td>
        <td className="px-4 py-2 text-center">{paymentMethodSlug(payment_method)}</td>
        <td className="px-4 py-2 text-center">
          <button
            onClick={() =>
              payment_status === "installments"
                ? openPopup("installmentsPopup", {
                    id,
                    short_id: short_id,
                    installment,
                    installment_type,
                    down_payment,
                    next_payment_date,
                    totalPriceAfter,
                  })
                : null
            }
            className={`${statusColor} ${
              payment_status === "installments" && "cursor-pointer"
            } w-fit text-nowrap mx-auto px-2 py-1 rounded-[4px] text-center`}
          >
            {paymentStatusSlug(payment_status)}
          </button>
        </td>
        <td className="px-4 py-2 text-center">{formatDate(date)}</td>
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
                  additional_fees,
                  earning,
                  payment_method,
                  payment_status,
                  index: short_id,
                  installment_type,
                  down_payment,
                  installment,
                  client_balance,
                })
              }
              className="w-fit text-xl hover:text-orange-600 cursor-pointer text-anotherDark"
            >
              <CiEdit />
            </p>
            <p
              onClick={() => openPopup("deleteAlertPopup", { short_id, id })}
              className="w-fit text-xl ml-auto hover:text-red-700 cursor-pointer text-anotherDark"
            >
              <MdDeleteOutline />
            </p>
          </div>
        </td>
      </tr>
    </>
  );
}
