"use client";
import {
  CLIENT_COLLECTOR_REQ,
  GET_ORDER_INSTALLMENTS_REQ,
  PAY_INSTALLMENT_REQ,
} from "@/app/utils/requests/client-side.requests";
import InstalmentTable from "../tables/installment-table";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { useEffect, useState } from "react";
import { InstallmentInterface } from "@/app/utils/types/interfaces";
import { Button, TextField } from "@mui/material";
import {
  formatDate,
  getSlug,
  periodsArray,
  sameTextField,
  shortIdGenerator,
} from "@/app/utils/base";
import { TbCircleXFilled } from "react-icons/tb";
import MyLoading from "../common/loading";

export default function InstallmentsPopUp() {
  const { openPopup, popupState, closePopup } = usePopup();
  const delvData = popupState.installmentsPopup.data;
  const [data, setData] = useState<InstallmentInterface[]>([]);
  const [installment, setInstallment] = useState(delvData?.installment ?? "");
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_ORDER_INSTALLMENTS_REQ, { id: delvData?.id });
    if (response.done) {
      setData(response?.data?.installments);
    } else {
      openPopup("snakeBarPopup", { message: response.message });
    }
  };
  useEffect(() => {
    fetchData();
  }, [delvData]);
  const payInstallment = async () => {
    if (installment == "0") return;
    if (loading) return;
    setLoading(true);
    const response = await CLIENT_COLLECTOR_REQ(PAY_INSTALLMENT_REQ, {
      id: delvData?.id,
      data: { installment: Number(installment) },
    });
    if (response.done) {
      openPopup("snakeBarPopup", { message: "تم تسديد القسط بنجاح.", type: "success" });
      fetchData();
    } else {
      openPopup("snakeBarPopup", { message: response.message });
    }
    setLoading(false);
  };
  const paid =
    Number(delvData.down_payment || 0) +
    (data.reduce((acc, curr) => Number(curr.amount) + acc, 0) || 0);
  const due = Number(delvData.totalPriceAfter || 0) - paid;
  if (Number(installment) > due) {
    setInstallment(due);
  }
  return (
    <div className="px-mainxs w-full md:w-[752px]">
      <div className="relative rounded-md shadow-md bg-myLight p-mainxl flex flex-col gap-[10px]">
        <button
          onClick={() => closePopup("installmentsPopup")}
          className="flex justify-center items-center w-[25px] h-[25px] bg-background rounded-[50%] z-[5] cursor-pointer absolute right-[-10px] top-[-10px] "
        >
          <TbCircleXFilled className="min-w-[30px] min-h-[30px]" />
        </button>
        <InstalmentTable
          title={`اقساط فاتورة ${shortIdGenerator(delvData?.short_id)}`}
          data={data}
          refetch={fetchData}
        />
        <div className="w-full flex flex-col items-center mt-4 gap-2">
          <div className="flex flex-col gap-1 w-full">
            <div className="flex gap-1">
              <TextField
                id="Glu"
                dir="rtl"
                label="الفاتورة"
                variant="filled"
                sx={sameTextField}
                value={delvData.totalPriceAfter}
                className="w-full"
                disabled
              />
              <TextField
                id="Glu"
                dir="rtl"
                label="المسدد حتي الأن"
                variant="filled"
                sx={sameTextField}
                value={paid}
                className="w-full"
                disabled
              />
              <TextField
                id="Glu"
                dir="rtl"
                label="الغير مسدد"
                variant="filled"
                sx={sameTextField}
                value={due}
                className="w-full"
                disabled
              />
              {/* <TextField
                id="Glu"
                dir="rtl"
                label="الاقساط المتبقية"
                variant="filled"
                sx={sameTextField}
                value={due && installment ? Math.ceil(due / installment) : "0"}
                className="w-full"
                disabled
              /> */}
            </div>
            <div className="flex gap-1">
              <TextField
                id="Glu"
                dir="rtl"
                label="نوع القسط"
                variant="filled"
                sx={sameTextField}
                value={getSlug(periodsArray, delvData.installment_type)}
                className="w-full"
                disabled
              />
              <TextField
                id="Glu"
                dir="rtl"
                label="المقدم"
                variant="filled"
                sx={sameTextField}
                value={delvData.down_payment}
                className="w-full"
                disabled
              />
              <TextField
                id="Glu"
                dir="rtl"
                label="تاريخ التحصيل القادم"
                variant="filled"
                sx={sameTextField}
                value={
                  installment == "0"
                    ? "مسدد بالكامل"
                    : delvData.next_payment_date
                    ? formatDate(delvData.next_payment_date).split(" ")[0]
                    : "غير محدد"
                }
                className="w-full"
                disabled
              />
            </div>
          </div>
          <div className="flex gap-2 items-stretch w-full min-[400px]:w-[50%]">
            <TextField
              id="Glu"
              dir="rtl"
              label="القسط"
              variant="filled"
              sx={sameTextField}
              onChange={(e) => setInstallment(e.target.value.replace(/[^0-9.]/g, ""))}
              value={installment}
              className="w-full"
            />
            <Button
              onClick={payInstallment}
              sx={{ fontFamily: "cairo" }}
              className="!bg-mdDark text-nowrap"
              variant="contained"
            >
              {loading ? <MyLoading /> : "دفع القسط"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
