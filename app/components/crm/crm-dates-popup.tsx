"use client";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import CrmDatesTable from "../tables/crm-dates-table";
import { Button, TextField } from "@mui/material";
import MyLoading from "../common/loading";
import { useEffect, useState } from "react";
import {
  CLIENT_COLLECTOR_REQ,
  CREATE_CRM_DATE_REQ,
  DELETE_CRM_DATE_REQ,
  GET_CRM_DATES_REQ,
} from "@/app/utils/requests/client-side.requests";
import { useRouter } from "next/navigation";
import { CrmDatesInterface } from "@/app/utils/types/interfaces";
import { formatDate } from "@/app/utils/base";
import DeleteAlert from "../forms & alerts/delete-alert";
import BlackLayer from "../common/black-layer";

export default function CrmDatesPopUp() {
  const { openPopup, popupState, closePopup } = usePopup();
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [crmDates, setCrmDates] = useState<CrmDatesInterface[]>([]);

  const fetchCrmDates = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_CRM_DATES_REQ, {
      crmId: popupState.crmDates.data?.id,
    });
    if (response.done) {
      setCrmDates(response.data?.crm_dates);
    } else {
      router.replace(`/log-in`);
    }
  };

  useEffect(() => {
    fetchCrmDates();
  }, []);

  const addCrmDate = async () => {
    setLoading(true);
    const response = await CLIENT_COLLECTOR_REQ(CREATE_CRM_DATE_REQ, {
      crmId: popupState.crmDates.data?.id,
      body: { note },
    });
    if (response.done) {
      fetchCrmDates();
      setNote("");
    } else {
      openPopup("snakeBarPopup", { message: response.message });
    }
    setLoading(false);
  };
  return (
    <>
      <div className="px-mainxs w-full md:w-[752px]">
        <div className="relative rounded-md shadow-md bg-myLight p-mainxl flex flex-col gap-[10px]">
          <CrmDatesTable
            data={crmDates}
            title={`التواريخ المرتبطة بـ ${popupState.crmDates.data?.name}`}
          />
          <div className="flex gap-2 mt-[20px] mx-auto w-full sm:max-w-[50%]">
            <TextField
              id="Glu"
              dir="rtl"
              label="ملاحظات"
              variant="filled"
              onChange={(e) => setNote(e.target.value)}
              value={note}
              className="w-full"
            />
            <Button
              onClick={addCrmDate}
              sx={{ fontFamily: "cairo" }}
              className="!bg-mdDark text-nowrap"
              variant="contained"
            >
              {loading ? <MyLoading /> : "اضافة تاريخ"}
            </Button>
          </div>
        </div>
      </div>
      {popupState.deleteCrmDate.isOpen && (
        <BlackLayer onClick={() => closePopup("deleteCrmDate")}>
          <DeleteAlert
            action="حذف"
            name={`تاريخ التنبيه ${formatDate(popupState.deleteCrmDate.data?.created_at)}`}
            onConfirm={async () => {
              const response = await CLIENT_COLLECTOR_REQ(DELETE_CRM_DATE_REQ, {
                crmDateId: popupState.deleteCrmDate.data?.id,
              });
              if (response.done) {
                fetchCrmDates();
                openPopup("snakeBarPopup", { message: "تم حذف التاريخ بنجاح.", type: "success" });
                closePopup("deleteCrmDate");
              } else {
                openPopup("snakeBarPopup", { message: response.message });
              }
            }}
          />
        </BlackLayer>
      )}
    </>
  );
}
