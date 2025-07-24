"use client";
import {
  CLIENT_COLLECTOR_REQ,
  GET_ONE_COST_REQ,
  GET_SUPPLIERS_BILLS_REQ,
  PAY_SUPPLIERS_REQ,
} from "@/app/utils/requests/client-side.requests";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { useEffect, useState } from "react";
import { SuppliersBillsInterface } from "@/app/utils/types/interfaces";
import { Button, TextField } from "@mui/material";
import { sameTextField, shortIdGenerator } from "@/app/utils/base";
import SuppliersBillsTable from "../tables/suppliers-bills-table";
import { TbCircleXFilled } from "react-icons/tb";

export default function SuppliersBillsPopUp() {
  const { openPopup, popupState, closePopup } = usePopup();
  const delvData = popupState.suppliersBills.data;
  const [data, setData] = useState<SuppliersBillsInterface[]>([]);
  const [cost, setCost] = useState<any>();
  const [installment, setInstallment] = useState(delvData?.installment ?? "");
  const [note, setNote] = useState(delvData?.installment ?? "");
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_SUPPLIERS_BILLS_REQ, { cost_id: delvData?.id });
    if (response.done) {
      setData(response?.data?.bills);
    } else {
      openPopup("snakeBarPopup", { message: response.message });
    }
    const costResponse = await CLIENT_COLLECTOR_REQ(GET_ONE_COST_REQ, { id: delvData?.id });
    if (costResponse.done) {
      setCost(costResponse?.data);
    } else {
      openPopup("snakeBarPopup", { message: costResponse.message });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const paySupplier = async () => {
    if (installment == "0" || installment == "") return;
    if (loading) return;
    setLoading(true);
    const response = await CLIENT_COLLECTOR_REQ(PAY_SUPPLIERS_REQ, {
      cost_id: delvData?.id,
      installment: Number(installment),
      note: note ?? null,
    });
    if (response.done) {
      openPopup("snakeBarPopup", { message: "تم التسديد بنجاح.", type: "success" });
      fetchData();
    } else {
      openPopup("snakeBarPopup", { message: response.message });
    }
    setLoading(false);
  };
  const paid = data.reduce((acc, curr) => curr.amount + acc, 0);
  const due = cost?.price - paid;
  if (installment > due) {
    setInstallment(due);
  }
  return (
    <div className="px-mainxs w-full md:w-[752px]">
      <div className="relative rounded-md shadow-md bg-myLight p-mainxl flex flex-col gap-[10px]">
        <button
          onClick={() => closePopup("suppliersBills")}
          className="flex justify-center items-center w-[25px] h-[25px] bg-background rounded-[50%] z-[5] cursor-pointer absolute right-[-10px] top-[-10px] "
        >
          <TbCircleXFilled className="min-w-[30px] min-h-[30px]" />
        </button>
        <SuppliersBillsTable
          data={data}
          refetch={fetchData}
          title={`فاتورة تكاليف ${shortIdGenerator(delvData?.short_id)}`}
        />
        <div className="w-full flex flex-col items-center mt-4 gap-2">
          <div className="flex gap-1 w-full">
            <TextField
              id="Glu"
              dir="rtl"
              label="الفاتورة"
              variant="filled"
              sx={sameTextField}
              value={cost?.price ? cost?.price : ""}
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
          </div>
          <div className="flex flex-col gap-2 w-full min-[400px]:w-[50%]">
            <TextField
              id="filled-multiline-static"
              label="ملاحظات"
              multiline
              rows={2}
              sx={sameTextField}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              variant="filled"
            />
            <div className="flex gap-2 items-stretch  w-full">
              <TextField
                id="Glu"
                dir="rtl"
                label="المبلغ"
                variant="filled"
                sx={sameTextField}
                onChange={(e) => setInstallment(e.target.value.replace(/[^0-9.]/g, ""))}
                value={installment}
                className="w-full"
              />
              <Button
                onClick={paySupplier}
                sx={{ fontFamily: "cairo" }}
                className="!bg-mdDark text-nowrap"
                variant="contained"
              >
                تسديد
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
