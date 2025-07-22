"use client";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { sameTextField } from "../../utils/base";

export default function AddAdvanceForm({
  onDone,
  isForEdit,
  title,
}: {
  onDone: (data: any) => void;
  isForEdit?: { amount: number; note: string | null; id: string };
  title: string;
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    amount: isForEdit?.amount ?? "",
    note: isForEdit?.note ?? "",
  });
  const { openPopup } = usePopup();
  const openSnakeBar = (message: string) => {
    openPopup("snakeBarPopup", { message });
  };
  const handleData = (key: keyof typeof data, value: string) => {
    setData({ ...data, [key]: value });
  };
  const vaildation = () => {
    const { amount } = data;
    if (Number(amount) < 1) {
      openSnakeBar("يجب ادخال مبلغ للمتابعة.");
      return false;
    }
    return true;
  };
  const handleDone = async () => {
    if (loading) return;
    if (!vaildation()) return;
    setLoading(true);
    onDone({ data: { ...data, amount: Number(data.amount) }, id: isForEdit?.id });
    setLoading(false);
  };
  return (
    <div className="mx-mainxs rounded-md shadow-md w-full min-[400px]:w-[384px] bg-myLight p-mainxl">
      <h2 className="text-lg text-center font-semibold mb-4">{title}</h2>
      <div className="space-y-4 flex flex-col gap-[15px]">
        <TextField
          id="Glu"
          dir="rtl"
          label="المبلغ"
          variant="filled"
          className="w-full"
          sx={sameTextField}
          value={data.amount}
          onChange={(e) => handleData("amount", e.target.value.replace(/[^0-9.]/g, ""))}
        />
        <TextField
          id="Glu"
          dir="rtl"
          label="ملاحظات"
          variant="filled"
          className="w-full"
          sx={sameTextField}
          value={data.note ?? ""}
          onChange={(e) => handleData("note", e.target.value)}
        />
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
