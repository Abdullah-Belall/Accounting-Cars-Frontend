"use client";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { sameTextField } from "@/app/utils/base";
import {
  CLIENT_COLLECTOR_REQ,
  CREATE_EXPENSE_REQ,
  UPDATE_EXPENSE_REQ,
} from "@/app/utils/requests/client-side.requests";

export default function ExpenseForm({
  title,
  isForEdit,
  onDone,
}: {
  isForEdit?: { id: string; name: string; amount: string; note: string };
  onDone: any;
  title: string;
}) {
  const [data, setData] = useState<{
    name: null | string;
    amount: null | string | number;
    note?: null | string;
  }>({
    name: isForEdit ? isForEdit.name : null,
    amount: isForEdit ? isForEdit.amount : null,
    note: isForEdit ? isForEdit.note : null,
  });
  const [loading, setLoading] = useState(false);
  const { openPopup } = usePopup();
  const openSnakeBar = (message: string) => {
    openPopup("snakeBarPopup", { message });
  };
  const handleData = (keyName: keyof typeof data, value: string) => {
    setData({ ...data, [keyName]: value });
  };
  const validation = () => {
    const { name, amount } = data;
    if (!name || name === "") {
      openSnakeBar("يجب تحديد اسم للمتابعة.");
      return false;
    }
    if (!amount || amount === "") {
      openSnakeBar("يجب تحديد مصروف للمتابعة.");
      return false;
    }
    return true;
  };
  const handleDone = async () => {
    if (loading) return;
    if (!validation()) return;
    setLoading(true);
    const dataReady = { ...data };
    dataReady.amount = Number(dataReady.amount);
    const updateObj = {
      id: isForEdit?.id,
      data: dataReady,
    };
    const response = await CLIENT_COLLECTOR_REQ(
      isForEdit ? UPDATE_EXPENSE_REQ : CREATE_EXPENSE_REQ,
      isForEdit ? updateObj : dataReady
    );
    setLoading(false);
    if (response.done) {
      openPopup("snakeBarPopup", {
        message: isForEdit ? "تم تعديل المصروف بنجاح." : "تم انشاء مصروف جديد بنجاح.",
        type: "success",
      });
      onDone();
    } else {
      openSnakeBar(response.message);
    }
  };
  return (
    <div className="rounded-md shadow-md mx-mainxs w-full min-[400px]:w-[384px] bg-myHover p-mainxl">
      <h2 className="text-lg text-center font-semibold mb-4">{title}</h2>
      <div className="space-y-4 flex flex-col gap-[15px]">
        <TextField
          id="Glu"
          dir="rtl"
          label="اسم البند"
          type="text"
          variant="filled"
          className="w-full"
          sx={sameTextField}
          value={data.name ?? ""}
          onChange={(e) => handleData("name", e.target.value)}
        />
        <TextField
          id="Glu"
          dir="rtl"
          label="المصروف"
          type="text"
          variant="filled"
          className="w-full"
          sx={sameTextField}
          value={data.amount ?? ""}
          onChange={(e) => handleData("amount", e.target.value.replace(/[^0-9.]/g, ""))}
        />
        <TextField
          id="Glu"
          dir="rtl"
          label="ملاحظة"
          type="text"
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
          {isForEdit ? "تعديل" : "اضافة"}
        </Button>
      </div>
    </div>
  );
}
