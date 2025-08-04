"use client";
import BlackLayer from "@/app/components/common/black-layer";
import CrmDatesPopUp from "@/app/components/crm/crm-dates-popup";
import CrmForm from "@/app/components/forms & alerts/add-crm";
import DeleteAlert from "@/app/components/forms & alerts/delete-alert";
import CrmTable from "@/app/components/tables/crm-table";
import OrdersTable from "@/app/components/tables/orders-table";
import { getSlug, methodsArray, paidStatusArray } from "@/app/utils/base";
import { useBills } from "@/app/utils/contexts/bills-contexts";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import {
  CLIENT_COLLECTOR_REQ,
  CREATE_CAR_CRM_REQ,
  DELETE_CAR_CRM_REQ,
  GET_CAR_CRMS_REQ,
  GET_CAR_ORDERS_REQ,
  ORDERS_COLLECTOR_REQ,
  UPDATE_CAR_CRM_REQ,
} from "@/app/utils/requests/client-side.requests";
import { CrmInterface, OrderInterface } from "@/app/utils/types/interfaces";
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
  const [crm, setCrm] = useState<CrmInterface[]>([]);
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
  const fetchCrm = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_CAR_CRMS_REQ, { carId });
    if (response.done) {
      setCrm(response.data.crm);
    } else {
      router.replace(`/log-in`);
    }
  };
  useEffect(() => {
    closePopup("billCollector");
    fetchData();
    fetchCrm();
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
    <div className="mx-mainxs pb-mainxs flex flex-col gap-4">
      <div className="flex flex-col gap-1 text-[20px] items-center">
        <h1 className="font-bold w-fit">
          <span className="font-normal text-md">العميل:</span> {searchParams.get("client")}
        </h1>
        <h1 className="font-bold w-fit">
          <span className="font-normal text-md">السيارة:</span> {searchParams.get("car")}
        </h1>
      </div>
      <div className="relative">
        <Button
          onClick={() => openPopup("addCrm")}
          sx={{ fontFamily: "cairo" }}
          className="!bg-mdDark !absolute !left-0 !top-0 z-2"
          variant="contained"
        >
          اضافة تنبيه
        </Button>
        <CrmTable data={crm} title="التنبيهات" />
        {popupState.addCrm.isOpen && (
          <BlackLayer onClick={() => closePopup("addCrm")}>
            <CrmForm
              onDone={async (body) => {
                const response = await CLIENT_COLLECTOR_REQ(CREATE_CAR_CRM_REQ, {
                  body,
                  carId,
                });
                if (response.done) {
                  fetchCrm();
                  closePopup("addCrm");
                  openPopup("snakeBarPopup", {
                    message: "تم اضافة التنبيه بنجاح",
                    type: "success",
                  });
                } else {
                  openPopup("snakeBarPopup", { message: response.message });
                }
              }}
              title="اضافة تنبيه"
            />
          </BlackLayer>
        )}
        {popupState.editCrm.isOpen && (
          <BlackLayer onClick={() => closePopup("editCrm")}>
            <CrmForm
              onDone={async (body) => {
                const response = await CLIENT_COLLECTOR_REQ(UPDATE_CAR_CRM_REQ, {
                  body,
                  crmId: popupState.editCrm.data?.id,
                  carId,
                });
                if (response.done) {
                  fetchCrm();
                  closePopup("editCrm");
                  openPopup("snakeBarPopup", {
                    message: "تم تعديل التنبيه بنجاح",
                    type: "success",
                  });
                } else {
                  openPopup("snakeBarPopup", { message: response.message });
                }
              }}
              title={`تعديل ${popupState.editCrm.data?.name}`}
              isForEdit={{
                name: popupState.editCrm.data?.name,
                next_call_date: popupState.editCrm.data?.next_call_date,
              }}
            />
          </BlackLayer>
        )}
        {popupState.deleteCrm.isOpen && (
          <BlackLayer onClick={() => closePopup("deleteCrm")}>
            <DeleteAlert
              name={popupState.deleteCrm.data?.name}
              action="حذف"
              warning="عند حذف هذا التنبيه سيتم حذف جميع التواريخ المرتبطة به ولا يمكن التراجع عن هذا الإجراء."
              onConfirm={async () => {
                const response = await CLIENT_COLLECTOR_REQ(DELETE_CAR_CRM_REQ, {
                  crmId: popupState.deleteCrm.data?.id,
                });
                if (response.done) {
                  fetchCrm();
                  closePopup("deleteCrm");
                  openPopup("snakeBarPopup", {
                    message: "تم حذف التنبيه بنجاح.",
                    type: "success",
                  });
                } else {
                  openPopup("snakeBarPopup", { message: response.message });
                }
              }}
            />
          </BlackLayer>
        )}
        {popupState.crmDates.isOpen && (
          <BlackLayer onClick={() => closePopup("crmDates")}>
            <CrmDatesPopUp />
          </BlackLayer>
        )}
      </div>
      <div className="relative">
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
          title={`فواتير المبيعات `}
          data={data as OrderInterface[]}
          refetch={fetchData}
          isForSelect
        />
      </div>
    </div>
  );
}
