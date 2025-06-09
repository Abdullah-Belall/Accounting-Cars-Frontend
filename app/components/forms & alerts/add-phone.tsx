"use client";
import { sameTextField } from "@/app/utils/base";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import {
  ADD_CLIENT_CONTACT_REQ,
  ADD_WORKER_CONTACT_REQ,
  CLIENT_COLLECTOR_REQ,
  UPDATE_CONTACT_REQ,
} from "@/app/utils/requests/client-side.requests";
import { TextField, Button } from "@mui/material";
import { useState } from "react";

export default function AddPhoneForm({
  user_id,
  onDone,
  isForEdit,
  type,
}: {
  user_id: string;
  onDone: any;
  isForEdit?: { phone: string; note: string; id: string };
  type: "client" | "worker";
}) {
  const [data, setData] = useState<{
    phone: null | string;
    note: null | string;
  }>(
    isForEdit
      ? {
          ...isForEdit,
          phone: isForEdit.phone.slice(1),
        }
      : {
          phone: null,
          note: null,
        }
  );
  const { openPopup } = usePopup();
  const [loading, setLoading] = useState(false);
  const openSnakeBar = (message: string) => {
    openPopup("snakeBarPopup", { message });
  };
  const handleData = (key: keyof typeof data, value: string) => {
    setData({ ...data, [key]: value });
  };
  const validation = () => {
    const { phone } = data;
    if (!phone) {
      openSnakeBar("يجب ادخال رقم هاتف للمتابعة.");
      return false;
    }
    const length = (phone as string).length;
    if (length < 11 || length > 13 || phone?.slice(0, 3) !== "201") {
      openSnakeBar("رقم الهاتف غير صالح.");
      return false;
    }
    return true;
  };

  const handleDone = async () => {
    if (!validation()) return;
    if (loading) return;
    setLoading(true);
    console.log({
      ...data,
      phone: "+" + data.phone,
    });
    const response = isForEdit
      ? await CLIENT_COLLECTOR_REQ(UPDATE_CONTACT_REQ, {
          data: {
            ...data,
            phone: "+" + data.phone,
          },
          type: "client",
          id: isForEdit?.id,
        })
      : type === "client"
      ? await CLIENT_COLLECTOR_REQ(ADD_CLIENT_CONTACT_REQ, {
          ...data,
          phone: "+" + data.phone,
          user_id,
        })
      : await CLIENT_COLLECTOR_REQ(ADD_WORKER_CONTACT_REQ, {
          data: { ...data, phone: "+" + data.phone },
          id: user_id,
        });
    setLoading(false);
    console.log(response);
    if (response.done) {
      onDone();
    } else {
      openSnakeBar(response.message);
    }
  };
  return (
    <div className="rounded-md shadow-md min-w-[320px] bg-myLight p-mainxl">
      <h2 className="text-lg text-center font-semibold mb-4">
        {isForEdit ? "تعديل بيانات هاتف" : "اضافة رقم جديد"}
      </h2>

      <div className="space-y-4 flex flex-col gap-[15px]">
        <TextField
          id="Glu"
          dir="rtl"
          label="الرقم"
          variant="filled"
          className="w-full"
          sx={sameTextField}
          value={data?.phone ?? ""}
          onChange={(e) => handleData("phone", e.target.value.replace(/[^0-9.]/g, ""))}
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
          اضافة
        </Button>
      </div>
    </div>
  );
}
