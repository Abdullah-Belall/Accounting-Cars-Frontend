"use client";
import { sameTextField } from "@/app/utils/base";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

export default function EditQtyPopup({ OnConfirm }: { OnConfirm: any; title: string }) {
  const [loading, setLoading] = useState(false);
  const { popupState, openPopup } = usePopup();
  const openSnakeBar = (message: string) => {
    openPopup("snakeBarPopup", { message });
  };
  const [data, setData] = useState({
    oldQty: popupState.editQtyPopup.data?.currQty,
    newQty: "",
    costPrice: "",
  });

  const handleData = (key: keyof typeof data, value: string) => {
    setData({ ...data, [key]: value });
  };
  const validation = () => {
    if (data.newQty === "" || data.newQty == "0") {
      openSnakeBar("يجب ادخال كمية صالحة للمتابعة.");
      return false;
    }
    if (Number(data.newQty) < 0 && Number(data.oldQty) + Number(data.newQty) < 0) {
      openSnakeBar("لا يمكن ان تكون الكمية الاجمالية رقم سالب.");
      return false;
    }
    if (data.costPrice == "" || Number(data.costPrice) <= 0) {
      openSnakeBar("يجب ادخال تكلفة صالحة للمتابعة.");
      return false;
    }
    return true;
  };
  const handleDone = async () => {
    if (loading) return;
    if (!validation()) return;
    await OnConfirm({
      qty: Number(total),
      costPrice: Number(data.costPrice) * Math.abs(Number(data.newQty)),
    });
    setLoading(false);
  };
  const total = (Number(data?.oldQty) ?? 0) + (Number(data.newQty) ?? 0);
  return (
    <div className="rounded-md shadow-md min-w-[320px] bg-myLight p-mainxl">
      <h2 className="text-lg text-center font-semibold mb-4">
        تعديل كمية صنف {popupState.editQtyPopup.data?.title}
      </h2>

      <div className="space-y-4 flex flex-col gap-[15px]">
        <TextField
          id="Glu"
          dir="rtl"
          label="الكمية الاجمالية"
          variant="filled"
          className="w-full"
          sx={sameTextField}
          value={total}
          onChange={(e) => handleData("oldQty", e.target.value)}
          disabled
        />
        <div dir="rtl" className="flex gap-2">
          <TextField
            id="Glu"
            dir="rtl"
            label="الكمية الجديدة"
            variant="filled"
            className="w-full"
            sx={sameTextField}
            value={data.newQty ?? ""}
            onChange={(e) => {
              const value = e.target.value;
              if (/^-?\d*\.?\d*$/.test(value)) {
                handleData("newQty", value);
              }
            }}
          />
          <TextField
            id="Glu"
            dir="rtl"
            label="التكلفة للوحدة"
            variant="filled"
            className="w-full"
            sx={sameTextField}
            value={data.costPrice ?? ""}
            onChange={(e) => handleData("costPrice", e.target.value.replace(/[^0-9.]/g, ""))}
          />
        </div>

        <Button
          onClick={handleDone}
          sx={{ fontFamily: "cairo" }}
          className="!bg-mdDark"
          variant="contained"
        >
          تأكيد
        </Button>
      </div>
    </div>
  );
}
