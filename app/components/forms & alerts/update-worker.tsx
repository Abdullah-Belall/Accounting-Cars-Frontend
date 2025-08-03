"use client";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import SelectList from "../common/select-list";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { CLIENT_COLLECTOR_REQ, UPDATE_WORKER_REQ } from "@/app/utils/requests/client-side.requests";
import { getSlug, rolesArray } from "@/app/utils/base";
import MyLoading from "../common/loading";

export default function UpdateWorkerForm({
  id,
  onDone,
  data: { role, salary },
}: {
  id: string;
  onDone: () => void;
  data: {
    role: string;
    salary: number | null;
  };
}) {
  const [data, setData] = useState<{
    role?: null | string;
    salary?: null | string | number;
  }>({
    role: role,
    salary: salary,
  });
  const [dropDown, setDropDown] = useState(false);
  const [dropDownSlug, setDropDownSlug] = useState<null | string>(
    getSlug(rolesArray, data?.role as string)
  );
  const [loading, setLoading] = useState(false);
  const { openPopup } = usePopup();
  const openSnakeBar = (message: string) => {
    openPopup("snakeBarPopup", { message });
  };
  const handleData = (keyName: keyof typeof data, value: string) => {
    setData({ ...data, [keyName]: value });
    if (keyName === "role") {
      setDropDownSlug(value === "admin" ? "موظف" : "مالك");
      setDropDown(false);
    }
  };
  const handleDone = async () => {
    if (loading) return;
    setLoading(true);
    const finalData = {
      salary: data?.salary && data?.salary !== "" ? Number(data.salary) : null,
      role: data?.role,
    };
    const response = await CLIENT_COLLECTOR_REQ(UPDATE_WORKER_REQ, {
      id,
      data: finalData,
    });
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
        <h2 className="text-lg text-center font-semibold mb-4">تعديل بيانات الموظف.</h2>
        <div className="space-y-4 flex flex-col gap-[15px]">
          <SelectList
            placeHolder="الدور"
            select={dropDownSlug}
            onBlur={() => setDropDown(false)}
            onClick={() => setDropDown(true)}
            dropDown={dropDown}
          >
            {dropDown && (
              <>
                <ul className="w-full z-10 rounded-md absolute left-0 top-[calc(100%+6px)] bg-mdDark px-mainxs">
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
          <TextField
            id="Glu"
            dir="rtl"
            label="الراتب"
            variant="filled"
            className="w-full"
            value={data?.salary ?? ""}
            onChange={(e) => handleData("salary", e.target.value.replace(/[^0-9.]/g, ""))}
          />
          <Button
            onClick={handleDone}
            sx={{ fontFamily: "cairo" }}
            className="!bg-mdDark"
            variant="contained"
          >
            {loading ? <MyLoading /> : "تعديل"}
          </Button>
        </div>
      </div>
    </div>
  );
}
