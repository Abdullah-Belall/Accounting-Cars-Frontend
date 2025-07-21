"use client";
import {
  CLIENT_COLLECTOR_REQ,
  GET_ADVANCE_PAY_BILLS_REQ,
  PAY_WORKER_ADVANCE_REQ,
} from "@/app/utils/requests/client-side.requests";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { useEffect, useState } from "react";
import { SuppliersBillsInterface } from "@/app/utils/types/interfaces";
import { Button, TextField } from "@mui/material";
import { sameTextField } from "@/app/utils/base";
import SuppliersBillsTable from "../tables/suppliers-bills-table";
import { TbCircleXFilled } from "react-icons/tb";

export default function AdvanceBillsPopUp() {
  const { openPopup, popupState, closePopup } = usePopup();
  const delvData = popupState.payAdvance.data;
  const [data, setData] = useState<SuppliersBillsInterface[]>([]);
  const [formData, setFormData] = useState({
    amount: "",
    note: "",
  });
  const [loading, setLoading] = useState(false);

  const handleFormData = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_ADVANCE_PAY_BILLS_REQ, { id: delvData?.id });
    if (response.done) {
      setData(response?.data?.pay_bills);
    } else {
      openPopup("snakeBarPopup", { message: response.message });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const pay = async () => {
    if (formData.amount == "0" || formData.amount == "") return;
    if (loading) return;
    setLoading(true);
    const response = await CLIENT_COLLECTOR_REQ(PAY_WORKER_ADVANCE_REQ, {
      id: delvData?.id,
      data: { amount: Number(formData.amount), note: formData.note ?? null },
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
  const due = delvData?.amount - paid;
  if (Number(formData.amount) > due) {
    handleFormData("amount", due.toString());
  }
  return (
    <div className="px-mainxs w-full md:w-[752px]">
      <div className="relative rounded-md shadow-md bg-myLight p-mainxl flex flex-col gap-[10px]">
        <button
          onClick={() => closePopup("payAdvance")}
          className="flex justify-center items-center w-[25px] h-[25px] bg-background rounded-[50%] z-[5] cursor-pointer absolute right-[-10px] top-[-10px] "
        >
          <TbCircleXFilled className="min-w-[30px] min-h-[30px]" />
        </button>
        <SuppliersBillsTable
          data={data}
          refetch={fetchData}
          title={`فواتير تسديد لسلفة رقم ${delvData?.index}`}
        />
        <div className="w-full flex flex-col items-center mt-4 gap-2">
          <div className="flex gap-1 w-full">
            <TextField
              id="Glu"
              dir="rtl"
              label="السلفة"
              variant="filled"
              sx={sameTextField}
              value={delvData?.amount ? Number(delvData?.amount)?.toLocaleString() + " ج.م" : ""}
              className="w-full"
              disabled
            />
            <TextField
              id="Glu"
              dir="rtl"
              label="المسدد حتي الأن"
              variant="filled"
              sx={sameTextField}
              value={paid + " ج.م"}
              className="w-full"
              disabled
            />
            <TextField
              id="Glu"
              dir="rtl"
              label="الغير مسدد"
              variant="filled"
              sx={sameTextField}
              value={due + " ج.م"}
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
              value={formData.note}
              onChange={(e) => handleFormData("note", e.target.value)}
              variant="filled"
            />
            <div className="flex gap-2 items-stretch  w-full">
              <TextField
                id="Glu"
                dir="rtl"
                label="المبلغ"
                variant="filled"
                sx={sameTextField}
                onChange={(e) => handleFormData("amount", e.target.value.replace(/[^0-9.]/g, ""))}
                value={formData.amount}
                className="w-full"
              />
              <Button
                onClick={pay}
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
