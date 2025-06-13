"use client";
import { useEffect, useState } from "react";
import {
  CLIENT_COLLECTOR_REQ,
  CREATE_NEW_TENANT_REQ,
  GET_ALL_TENANTS_REQ,
  SIGN_FUSER_REQ,
} from "../utils/requests/client-side.requests";
import { useRouter } from "next/navigation";
import NoData from "../components/common/no-data";
import MainTable from "../components/tables/main-table";
import { formatDate, sameTextField } from "../utils/base";
import { Button, TextField } from "@mui/material";
import BlackLayer from "../components/common/black-layer";
import PopupHolder from "../components/common/popup-holder";
import { usePopup } from "../utils/contexts/popup-contexts";

export default function Boss() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [addTenant, setAddTenant] = useState({
    active: false,
    payload: {
      tenant_domain: "",
      phone: "",
      user_name: "",
      password: "",
      title: "",
      logo: "",
    },
  });
  const { openPopup } = usePopup();

  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_ALL_TENANTS_REQ);
    console.log(response);
    if (response.done) {
      setData(response.data?.tenants);
    } else {
      router.replace("/");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleAddTenant = (
    active: boolean,
    key?: keyof typeof addTenant.payload,
    value?: string
  ) => {
    const payload = { ...addTenant.payload };
    if (key) {
      payload[key] = value as string;
    }
    setAddTenant({
      active,
      payload,
    });
  };
  const handleSend = async () => {
    const base = addTenant.payload;
    const response = await CLIENT_COLLECTOR_REQ(CREATE_NEW_TENANT_REQ, {
      tenant_domain: base.tenant_domain,
      phone: base.phone,
      logo: base.logo,
      title: base.title,
    });
    console.log(response);
    if (response.done) {
      const mioObj: any = addTenant.payload;
      delete mioObj.phone;
      delete mioObj.title;
      delete mioObj.logo;
      const fuserResponse = await CLIENT_COLLECTOR_REQ(SIGN_FUSER_REQ, mioObj);
      console.log(fuserResponse);
      if (fuserResponse.done) {
        fetchData();
        openPopup("snakeBarPopup", { message: "تم اضافة المستأجر الجديد بنجاح.", type: "success" });
        handleAddTenant(false);
      } else {
        openPopup("snakeBarPopup", { message: response?.message });
      }
    } else {
      openPopup("snakeBarPopup", { message: response?.message });
      return;
    }
  };
  return (
    <div className="w-full px-mainxs relative">
      <Button
        onClick={() => handleAddTenant(true)}
        sx={{ fontFamily: "cairo" }}
        className="!bg-mdDark !absolute !left-[12px] !top-0 cursor-pointer z-20"
        variant="contained"
      >
        اضافة مستأجر جديد
      </Button>
      <MainTable
        title="كل المستأجرين"
        headers={["تاريخ الاضافة", "رقم هاتف", "الدومين", "المعرف", "*"]}
      >
        {data?.map((row: any, index) => (
          <tr key={index}>
            <td className="px-4 py-2 text-center">{formatDate(row?.created_at)}</td>
            <td className={`px-4 py-2 text-center`}>{row?.phone?.trim() ?? "لا يوجد"}</td>
            <td className={`px-4 py-2 text-center`}>{row?.domain}</td>
            <td className={`px-4 py-2 text-center`}>{row?.tenant_id}</td>
            <td className={`px-4 py-2 text-center`}>{index + 1}</td>
          </tr>
        ))}
      </MainTable>
      {data?.length === 0 && <NoData />}
      {addTenant.active && (
        <>
          <BlackLayer onClick={() => handleAddTenant(false)} />
          <PopupHolder>
            <div className="rounded-md shadow-md min-w-sm bg-myLight p-mainxl">
              <h2 className="text-lg text-center font-semibold mb-4">اضافة مستأجر جديد</h2>
              <div className="space-y-4 flex flex-col gap-[15px]">
                <TextField
                  id="Glu"
                  dir="rtl"
                  label="الدومين"
                  variant="filled"
                  className="w-full"
                  sx={sameTextField}
                  value={addTenant.payload.tenant_domain}
                  onChange={(e) => handleAddTenant(true, "tenant_domain", e.target.value)}
                />
                <TextField
                  id="Glu"
                  dir="rtl"
                  label="رقم الهاتف"
                  variant="filled"
                  className="w-full"
                  sx={sameTextField}
                  value={addTenant.payload.phone}
                  onChange={(e) => handleAddTenant(true, "phone", e.target.value)}
                />
                <div className="w-full h-[1px] bg-myDark my-[10px]"></div>
                <TextField
                  id="Glu"
                  dir="rtl"
                  label="اسم المستخدم للمالك"
                  variant="filled"
                  className="w-full"
                  sx={sameTextField}
                  value={addTenant.payload.user_name}
                  onChange={(e) => handleAddTenant(true, "user_name", e.target.value)}
                />
                <TextField
                  id="Glu"
                  dir="rtl"
                  label="كلمة السر"
                  variant="filled"
                  className="w-full"
                  sx={sameTextField}
                  value={addTenant.payload.password}
                  onChange={(e) => handleAddTenant(true, "password", e.target.value)}
                />
                <TextField
                  id="Glu"
                  dir="rtl"
                  label="عنوان الشركة"
                  variant="filled"
                  className="w-full"
                  sx={sameTextField}
                  value={addTenant.payload.title}
                  onChange={(e) => handleAddTenant(true, "title", e.target.value)}
                />
                <TextField
                  id="Glu"
                  dir="rtl"
                  label="اللوجو"
                  variant="filled"
                  className="w-full"
                  sx={sameTextField}
                  value={addTenant.payload.logo}
                  onChange={(e) => handleAddTenant(true, "logo", e.target.value)}
                />
                <Button
                  onClick={handleSend}
                  sx={{ fontFamily: "cairo" }}
                  className="!bg-mdDark"
                  variant="contained"
                >
                  اضافة
                </Button>
              </div>
            </div>
          </PopupHolder>
        </>
      )}
    </div>
  );
}
