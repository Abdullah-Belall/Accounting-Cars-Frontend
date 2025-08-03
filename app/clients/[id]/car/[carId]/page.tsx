"use client";
import OrdersTable from "@/app/components/tables/orders-table";
import { getSlug, methodsArray, paidStatusArray } from "@/app/utils/base";
import { useBills } from "@/app/utils/contexts/bills-contexts";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import {
  CLIENT_COLLECTOR_REQ,
  GET_CAR_ORDERS_REQ,
  ORDERS_COLLECTOR_REQ,
} from "@/app/utils/requests/client-side.requests";
import { OrderInterface } from "@/app/utils/types/interfaces";
import { Button } from "@mui/material";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CarsOrders() {
  const param = useParams();
  const searchParams = useSearchParams();
  const carId = param?.carId;
  const { setBills } = useBills();
  const { openPopup, popupState, closePopup } = usePopup();
  const [data, setData] = useState<OrderInterface[]>();
  const router = useRouter();
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_CAR_ORDERS_REQ, { id: carId });
    if (response.done) {
      setData(response.data.orders);
    } else {
      router.replace(`/log-in`);
      closePopup("billCollector");
    }
  };
  useEffect(() => {
    closePopup("billCollector");
    fetchData();
  }, []);
  const handleDone = async () => {
    const data = popupState.billCollector.data?.checked;
    if (!data || data?.length < 2) {
      openPopup("snakeBarPopup", { message: "يجب تحديد فاتورتين او اكثر للمتابعة." });
      return;
    }
    const response = await CLIENT_COLLECTOR_REQ(ORDERS_COLLECTOR_REQ, {
      data: { ids: JSON.stringify(data) },
    });
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
          paid_status: getSlug(paidStatusArray, data?.payment.status),
          down_payment: data?.payment?.down_payment,
          payment_method: getSlug(methodsArray, data?.payment?.payment_method),
          created_at: data?.created_at,
          client_depts: data?.client_depts,
        },
      });
      const billPath = window.localStorage.getItem("bill_path");
      router.push((billPath && billPath !== "null" ? billPath : "/bill") + "?collector=true");
    } else {
      openPopup("snakeBarPopup", { message: response.message });
    }
  };
  return (
    <div className="relative mx-mainxs">
      <div className="flex gap-1 !absolute !left-0 !top-0 z-2">
        {popupState.billCollector.isOpen && (
          <Button
            onClick={handleDone}
            sx={{ fontFamily: "cairo" }}
            className="!bg-mdDark"
            variant="contained"
          >
            تأكيد
          </Button>
        )}
        <Button
          onClick={() =>
            popupState.billCollector.isOpen
              ? closePopup("billCollector")
              : openPopup("billCollector")
          }
          sx={{ fontFamily: "cairo" }}
          className="!bg-mdDark"
          variant="contained"
        >
          {popupState.billCollector.isOpen ? "الغاء" : "تجميع فاتورة"}
        </Button>
      </div>
      <OrdersTable
        title={`فواتير ${searchParams.get("client")} لسيارة ${searchParams.get("car")}`}
        data={data as OrderInterface[]}
        refetch={fetchData}
        isForSelect
      />
    </div>
  );
}
