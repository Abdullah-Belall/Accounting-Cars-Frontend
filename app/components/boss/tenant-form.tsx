import { sameTextField } from "@/app/utils/base";
import { Button, TextField } from "@mui/material";
import BlackLayer from "../common/black-layer";
import PopupHolder from "../common/popup-holder";
import {
  CLIENT_COLLECTOR_REQ,
  CREATE_NEW_TENANT_REQ,
  SIGN_FUSER_REQ,
  UPDATE_TENANT_REQ,
} from "@/app/utils/requests/client-side.requests";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { useState } from "react";

export default function TenantForm({
  fetchData,
  payload,
  closePopup,
  id,
}: {
  closePopup: () => void;
  payload: {
    tenant_domain: string;
    phone: string;
    user_name: string;
    password: string;
    title: string;
    logo: string;
    telegram_chat_id: string;
  };
  id?: string;
  fetchData: () => void;
}) {
  const [addTenant, setAddTenant] = useState(payload);
  const { openPopup } = usePopup();

  const handleAddTenant = (key: keyof typeof payload, value: string) => {
    setAddTenant({ ...addTenant, [key]: value });
  };
  const handleSend = async (e: any) => {
    e.preventDefault();
    const base = addTenant;
    if (payload?.tenant_domain?.length !== 0) {
      const response = await CLIENT_COLLECTOR_REQ(UPDATE_TENANT_REQ, {
        id,
        data: {
          tenant_domain: base.tenant_domain,
          phone: base.phone,
          logo: base.logo,
          title: base.title,
          telegram_chat_id: base.telegram_chat_id,
        },
      });
      if (response.done) {
        fetchData();
        openPopup("snakeBarPopup", { message: "تم تعديل المستأجر بنجاح.", type: "success" });
        closePopup();
      } else {
        openPopup("snakeBarPopup", { message: response?.message });
      }
      return;
    }
    const response = await CLIENT_COLLECTOR_REQ(CREATE_NEW_TENANT_REQ, {
      tenant_domain: base.tenant_domain,
      phone: base.phone,
      logo: base.logo,
      title: base.title,
      telegram_chat_id: base.telegram_chat_id,
    });
    console.log(response);
    if (response.done) {
      const mioObj: any = addTenant;
      delete mioObj.phone;
      delete mioObj.title;
      delete mioObj.logo;
      delete mioObj.telegram_chat_id;
      const fuserResponse = await CLIENT_COLLECTOR_REQ(SIGN_FUSER_REQ, mioObj);
      console.log(fuserResponse);
      if (fuserResponse.done) {
        fetchData();
        openPopup("snakeBarPopup", { message: "تم اضافة المستأجر الجديد بنجاح.", type: "success" });
        closePopup();
      } else {
        openPopup("snakeBarPopup", { message: response?.message });
      }
    } else {
      openPopup("snakeBarPopup", { message: response?.message });
      return;
    }
  };
  return (
    <>
      <BlackLayer onClick={closePopup} />
      <PopupHolder>
        <div className="rounded-md shadow-md min-w-md bg-myLight p-mainxl">
          <h2 className="text-lg text-center font-semibold mb-4">
            {payload?.tenant_domain?.length === 0 ? "اضافة مستأجر جديد" : "تعديل مستأجر"}
          </h2>
          <div className="space-y-4 flex flex-col gap-[15px]">
            <TextField
              id="Glu"
              dir="rtl"
              label="الدومين"
              variant="filled"
              className="w-full"
              sx={sameTextField}
              value={addTenant.tenant_domain}
              onChange={(e) => handleAddTenant("tenant_domain", e.target.value)}
            />
            <TextField
              id="Glu"
              dir="rtl"
              label="رقم الهاتف"
              variant="filled"
              className="w-full"
              sx={sameTextField}
              value={addTenant.phone}
              onChange={(e) => handleAddTenant("phone", e.target.value)}
            />
            <div className="w-full h-[1px] bg-myDark my-[10px]"></div>
            {payload?.tenant_domain?.length === 0 && (
              <div dir="rtl" className="flex gap-2 mb-0">
                <TextField
                  id="Glu"
                  dir="rtl"
                  label="اسم المستخدم للمالك"
                  variant="filled"
                  className="w-full"
                  sx={sameTextField}
                  value={addTenant.user_name}
                  onChange={(e) => handleAddTenant("user_name", e.target.value)}
                />
                <TextField
                  id="Glu"
                  dir="rtl"
                  label="كلمة السر"
                  variant="filled"
                  className="w-full"
                  sx={sameTextField}
                  value={addTenant.password}
                  onChange={(e) => handleAddTenant("password", e.target.value)}
                />
              </div>
            )}
            <TextField
              id="Glu"
              dir="rtl"
              label="كود تليجرام"
              variant="filled"
              className="w-full"
              sx={sameTextField}
              value={addTenant.telegram_chat_id}
              onChange={(e) => handleAddTenant("telegram_chat_id", e.target.value)}
            />
            <TextField
              id="Glu"
              dir="rtl"
              label="اسم الشركة"
              variant="filled"
              className="w-full"
              sx={sameTextField}
              value={addTenant.title}
              onChange={(e) => handleAddTenant("title", e.target.value)}
            />
            <TextField
              id="Glu"
              dir="rtl"
              label="اللوجو"
              variant="filled"
              className="w-full"
              sx={sameTextField}
              value={addTenant.logo}
              onChange={(e) => handleAddTenant("logo", e.target.value)}
            />
            <Button
              onClick={(e) => handleSend(e)}
              sx={{ fontFamily: "cairo" }}
              className="!bg-mdDark"
              variant="contained"
            >
              {payload?.tenant_domain?.length === 0 ? "اضافة" : "تعديل"}
            </Button>
          </div>
        </div>
      </PopupHolder>
    </>
  );
}
