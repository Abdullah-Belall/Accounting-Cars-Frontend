"use client";
import { useEffect, useState } from "react";
import OrderItemsTableRow from "../orders/order-items-row";
import MainTable from "./main-table";
import {
  CLIENT_COLLECTOR_REQ,
  GET_ORDER_ITEMS_REQ,
  MAKE_RETURNS_REQ,
} from "@/app/utils/requests/client-side.requests";
import { useRouter } from "next/navigation";
import NoData from "../common/no-data";
import { Button } from "@mui/material";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { useReturns } from "@/app/utils/contexts/returns-contexts";
import ReturnsPopUp from "../orders/returns-popup";
import { useBills } from "@/app/utils/contexts/bills-contexts";
import { getSlug, methodsArray, paidStatusArray } from "@/app/utils/base";

export default function OrderItemsTable({
  title,
  id,
}: {
  title: string;
  id: string;
  refetchOrders: any;
}) {
  const router = useRouter();
  const { setBills } = useBills();
  const [data, setData] = useState<any>([]);
  const { openPopup } = usePopup();
  const [openReturns, setOpenReturns] = useState(false);
  const { returns, setReturns, closeReturns } = useReturns();
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_ORDER_ITEMS_REQ, { id });
    if (response.done) {
      setData(response.data);
      return {
        data: response.data,
      };
    } else {
      router.replace("/log-in");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const onConfirmReturns = async () => {
    if (!returns?.data || returns?.data?.length === 0) {
      openPopup("snakeBarPopup", {
        message: "يجب تحديد الكمية المراد ارجاعها من كل صنف للمتابعة.",
      });
      return;
    }
    const response = await CLIENT_COLLECTOR_REQ(MAKE_RETURNS_REQ, {
      id: id,
      data: { returns: returns?.data },
    });
    if (!response.done) {
      openPopup("snakeBarPopup", {
        message: response.message,
      });
      return;
    }
    closeReturns();
    openPopup("snakeBarPopup", {
      message: "تم تنفيذ المرتجع بنجاح.",
      type: "success",
    });
    console.log(response);
    const data = response.data;
    console.log(data);
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
  };

  return (
    <>
      <MainTable
        title={title}
        headers={["الفاتورة", "سعر الوحدة", "الكمية", "اللون", "المقاس", "الصنف", "المنتج", "*"]}
      >
        {data?.order_items?.map((row: any, index: number) => (
          <OrderItemsTableRow
            key={index}
            index={index + 1}
            id={row.id}
            product={row?.sort?.product}
            name={row?.sort.name}
            size={row?.sort.size}
            color={row?.sort.color === "" || !row.color ? null : "لا يوجد"}
            qty={row.qty}
            unit_price={+row.unit_price}
          />
        ))}
      </MainTable>
      {data?.order_items?.length === 0 && <NoData />}
      {openReturns && (
        <div className="mt-5">
          <ReturnsPopUp index={title.replace(/\D/g, "")} id={data?.return?.id} />
        </div>
      )}
      <div className="!absolute !left-[18px] !top-[13px] flex gap-1">
        <Button
          onClick={() => {
            return returns?.isActive ? closeReturns() : setReturns({ isActive: true, data: [] });
          }}
          sx={{ fontFamily: "cairo" }}
          className="!bg-mdDark"
          variant="contained"
        >
          {returns?.isActive ? "الغاء" : "انشاء مرتجع"}
        </Button>
        {returns?.isActive && (
          <Button
            onClick={onConfirmReturns}
            sx={{ fontFamily: "cairo" }}
            className="!bg-mdDark"
            variant="contained"
          >
            تأكيد
          </Button>
        )}
        {data?.return?.return_count > 0 && (
          <Button
            onClick={() => setOpenReturns(!openReturns)}
            dir="rtl"
            sx={{ fontFamily: "cairo" }}
            className="!bg-mdDark"
            variant="contained"
          >
            {openReturns ? "اخفاء" : "عرض"} {data?.return?.return_count} مرتجعات
          </Button>
        )}
      </div>
    </>
  );
}
