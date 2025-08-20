"use client";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import {
  ADD_TENANT_CHAT_ID_REQ,
  CLIENT_COLLECTOR_REQ,
  EDIT_TENANT_CHAT_ID_REQ,
} from "@/app/utils/requests/client-side.requests";
import MyLoading from "../common/loading";

export default function AddTenantChatIdForm({
  isForEdit,
  onDone,
  tenantId,
}: {
  isForEdit?: { id: string; chat_id: string };
  onDone: any;
  tenantId: string;
}) {
  const [data, setData] = useState<{
    telegram_chat_id: null | string;
    tenant_id: null | string;
  }>({
    telegram_chat_id: isForEdit ? isForEdit.chat_id : null,
    tenant_id: tenantId,
  });
  const [loading, setLoading] = useState(false);
  const { openPopup } = usePopup();
  const handleData = (keyName: keyof typeof data, value: string) => {
    setData({ ...data, [keyName]: value });
  };
  const validation = () => {
    const { telegram_chat_id, tenant_id } = data;
    if (!telegram_chat_id || telegram_chat_id === "") {
      openPopup("snakeBarPopup", {
        message: "يجب ادخال رقم الدردشة",
        type: "error",
      });
      return false;
    }
    if (!tenant_id || tenant_id?.trim().length < 36) {
      openPopup("snakeBarPopup", {
        message: "يجب ادخال معرف المستأجر (36 رقم).",
        type: "error",
      });
      return false;
    }
    return true;
  };
  const handleDone = async () => {
    if (loading) return;
    if (!validation()) return;
    setLoading(true);
    const updateObj = {
      id: isForEdit?.id,
      data,
    };
    const response = await CLIENT_COLLECTOR_REQ(
      isForEdit ? EDIT_TENANT_CHAT_ID_REQ : ADD_TENANT_CHAT_ID_REQ,
      isForEdit ? updateObj : data
    );
    setLoading(false);
    if (response.done) {
      openPopup("snakeBarPopup", {
        message: isForEdit ? "تم تعديل رقم الدردشة بنجاح." : "تم انشاء رقم الدردشة بنجاح.",
        type: "success",
      });
      onDone();
    } else {
      openPopup("snakeBarPopup", {
        message: response.message,
        type: "error",
      });
    }
  };
  return (
    <div className="rounded-md shadow-md mx-mainxs w-full min-[400px]:w-[384px] bg-myHover p-mainxl">
      <h2 className="text-lg text-center font-semibold mb-4">
        {isForEdit ? "تعديل" : "اضافة"} رقم الدردشة
      </h2>
      <div className="space-y-4 flex flex-col gap-[15px]">
        <TextField
          id="Glu"
          dir="rtl"
          label="معرف المستأجر"
          type="text"
          variant="filled"
          className="w-full"
          value={data.tenant_id ?? ""}
          disabled
        />
        <TextField
          id="Glu"
          dir="rtl"
          label="رقم الدردشة"
          type="text"
          variant="filled"
          className="w-full"
          value={data.telegram_chat_id ?? ""}
          onChange={(e) => handleData("telegram_chat_id", e.target.value)}
        />
        <Button
          onClick={handleDone}
          sx={{ fontFamily: "cairo" }}
          className="!bg-mdDark"
          variant="contained"
        >
          {loading ? <MyLoading /> : isForEdit ? "تعديل" : "اضافة"}
        </Button>
      </div>
    </div>
  );
}
