"use client";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import SelectList from "../common/select-list";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import {
  ADD_CLIENT_REQ,
  ADD_WORKER_REQ,
  CLIENT_COLLECTOR_REQ,
  EDIT_CLIENT_REQ,
} from "@/app/utils/requests/client-side.requests";
import { sameTextField } from "@/app/utils/base";

export default function AddUserForm({
  type,
  title,
  isForEdit,
  onDone,
}: {
  isForEdit?: { user_name: string; tax_num: string; id: string; balance: number } | undefined;
  onDone: any;
  title: string;
  type: "worker" | "client";
}) {
  const [data, setData] = useState<{
    user_name: null | string;
    tax_num?: null | string;
    password?: null | string;
    role?: null | string;
    salary?: null | string | number;
    balance?: null | string | number;
  }>({
    user_name: isForEdit ? isForEdit.user_name : null,
    tax_num: isForEdit ? isForEdit.tax_num : null,
    password: null,
    role: null,
    salary: null,
    balance: isForEdit ? isForEdit.balance : null,
  });
  const [dropDown, setDropDown] = useState(false);
  const [dropDownSlug, setDropDownSlug] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const { openPopup } = usePopup();
  const openSnakeBar = (message: string) => {
    openPopup("snakeBarPopup", { message });
  };
  const handleData = (keyName: keyof typeof data, value: string) => {
    setData({ ...data, [keyName]: value });
    if (keyName === "role") {
      setDropDownSlug(value === "admin" ? "موظف" : value === "owner" ? "مالك" : "مراقب");
      setDropDown(false);
    }
  };
  const validation = () => {
    const { user_name, password, role } = data;
    if (!user_name) {
      openSnakeBar("يجب تحديد اسم للمتابعة.");
      return false;
    }
    if ((user_name as string).length < 2) {
      openSnakeBar("يجب ان يكون الأسم حرفين علي الأقل.");
      return false;
    }
    if (isForEdit || type === "client") {
      return true;
    }

    if (!password) {
      openSnakeBar("يجب تحديد كلمة سر للمتابعة.");
      return false;
    }
    if ((password as string).length < 9) {
      openSnakeBar("كلمة سر غير صالحة.");
      return false;
    }
    if (!role) {
      openSnakeBar("يجب تحديد دور للمتابعة.");
      return false;
    }
    return true;
  };
  const handleDone = async () => {
    if (loading) return;
    if (!validation()) return;
    const finalObjWorker = { ...data };
    delete finalObjWorker.tax_num;
    delete finalObjWorker.balance;
    finalObjWorker.salary = finalObjWorker.salary ? Number(finalObjWorker.salary) : null;
    const finalObjClient = { ...data };
    delete finalObjClient.password;
    delete finalObjClient.role;
    delete finalObjClient.salary;
    finalObjClient.balance = Number(finalObjClient.balance);
    let finalObj;
    if (type === "worker") {
      finalObj = finalObjWorker;
    } else if (type === "client" && isForEdit) {
      finalObj = { data: finalObjClient, id: isForEdit.id };
    } else {
      finalObj = finalObjClient;
    }
    setLoading(true);
    const response = await CLIENT_COLLECTOR_REQ(
      isForEdit ? EDIT_CLIENT_REQ : type === "worker" ? ADD_WORKER_REQ : ADD_CLIENT_REQ,
      finalObj
    );
    setLoading(false);
    if (response.done) {
      onDone();
    } else {
      openSnakeBar(response.message);
    }
  };
  return (
    <div className="w-full min-[380px]:w-[380px] px-mainxs">
      <div className="rounded-md shadow-md w-full bg-myHover p-mainxl">
        <h2 className="text-lg text-center font-semibold mb-4">{title}</h2>
        <div className="space-y-4 flex flex-col gap-[15px]">
          <TextField
            id="Glu"
            dir="rtl"
            label="اسم المستخدم"
            type="text"
            variant="filled"
            className="w-full"
            sx={sameTextField}
            value={data.user_name ?? ""}
            onChange={(e) => handleData("user_name", e.target.value)}
          />
          {type === "client" && (
            <>
              <TextField
                id="Glu"
                dir="rtl"
                label="الرقم الضريبي"
                type="text"
                variant="filled"
                className="w-full"
                sx={sameTextField}
                value={data.tax_num ?? ""}
                onChange={(e) => handleData("tax_num", e.target.value)}
              />
              <TextField
                id="Glu"
                dir="rtl"
                label="الميزانية"
                type="text"
                variant="filled"
                className="w-full"
                sx={sameTextField}
                value={data.balance ?? ""}
                onChange={(e) => handleData("balance", e.target.value.replace(/[^0-9.]/g, ""))}
              />
            </>
          )}
          {type === "worker" && (
            <>
              <TextField
                id="Glu"
                dir="rtl"
                label="كلمة السر"
                variant="filled"
                className="w-full"
                type="password"
                sx={sameTextField}
                onChange={(e) => handleData("password", e.target.value)}
              />
              <TextField
                id="Glu"
                dir="rtl"
                label="الراتب"
                variant="filled"
                className="w-full"
                sx={sameTextField}
                onChange={(e) => handleData("salary", e.target.value.replace(/[^0-9.]/g, ""))}
              />
              <SelectList
                placeHolder="الدور"
                select={dropDownSlug}
                onBlur={() => setDropDown(false)}
                onClick={() => setDropDown(true)}
                dropDown={dropDown}
              >
                {dropDown && (
                  <>
                    <ul className="w-full z-10 rounded-md absolute left-0 top-[calc(100%+6px)] bg-anotherLight px-mainxs">
                      <li
                        onClick={() => handleData("role", "admin")}
                        className="p-mainxs text-center border-b border-myLight cursor-pointer"
                      >
                        موظف
                      </li>
                      <li
                        onClick={() => handleData("role", "reader")}
                        className="p-mainxs text-center cursor-pointer"
                      >
                        مراقب
                      </li>
                      <li
                        onClick={() => handleData("role", "owner")}
                        className="p-mainxs text-center cursor-pointer"
                      >
                        مالك
                      </li>
                    </ul>
                  </>
                )}
              </SelectList>
            </>
          )}

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
    </div>
  );
}
