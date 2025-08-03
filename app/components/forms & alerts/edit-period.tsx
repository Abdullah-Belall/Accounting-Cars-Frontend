"use client";
import { getSlug, periodsArray } from "@/app/utils/base";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import SelectList from "../common/select-list";
import styles from "@/app/styles/drop-down.module.css";
import {
  CLIENT_COLLECTOR_REQ,
  UPDATE_BALANCE_REQ,
} from "@/app/utils/requests/client-side.requests";
import MyLoading from "../common/loading";

export default function EditPeriodPopup({ OnConfirm }: { OnConfirm: any }) {
  const [loading, setLoading] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const { openPopup } = usePopup();
  const openSnakeBar = (message: string) => {
    openPopup("snakeBarPopup", { message });
  };
  const [data, setData] = useState({
    period: "",
    balance: "",
  });

  const handleData = (key: keyof typeof data, value: string) => {
    setData({ ...data, [key]: value });
  };
  const validation = () => {
    if (data.balance === "") {
      openSnakeBar("الرجاء إدخال الرصيد.");
      return false;
    }
    if (data.period === "") {
      openSnakeBar("الرجاء اختيار الفترة المحاسبية.");
      return false;
    }
    return true;
  };
  const handleDone = async () => {
    if (loading) return;
    if (!validation()) return;
    setLoading(true);
    const response = await CLIENT_COLLECTOR_REQ(UPDATE_BALANCE_REQ, { data });
    if (response.done) {
      openPopup("snakeBarPopup", { message: "تم اضافة الرصيد بنجاح.", type: "success" });
      OnConfirm();
    } else {
      openSnakeBar(response.message);
    }
    setLoading(false);
  };

  const dropDownOpthions = periodsArray.slice(1).map((e, i, arr) => (
    <li
      key={i}
      onClick={() => {
        handleData("period", e.value);
        setDropDown(false);
      }}
      className={`${
        i !== arr.length - 1 && "border-b"
      } p-mainxs text-center border-myLight cursor-pointer`}
    >
      {e.label}
    </li>
  ));
  return (
    <div className="w-full min-[400px]:w-[400px] px-mainxs">
      <div className="rounded-md shadow-md w-full bg-myLight p-mainxl">
        <h2 className="text-lg text-center font-semibold mb-4">
          اضافة رصيد بداية الفترة المحاسبية
        </h2>

        <div className="space-y-4 flex flex-col gap-[15px]">
          <TextField
            id="Glu"
            dir="rtl"
            label="الرصيد"
            variant="filled"
            className="w-full"
            value={data.balance}
            onChange={(e) => handleData("balance", e.target.value.replace(/[^0-9.]/g, ""))}
          />
          <SelectList
            placeHolder="الفترة المحاسبية"
            select={data.period !== "" ? getSlug(periodsArray, data.period) : null}
            onClick={() => setDropDown(true)}
            onBlur={() => setDropDown(false)}
            dropDown={dropDown}
          >
            {dropDown && (
              <>
                <ul
                  className={
                    styles.list +
                    ` w-full shadow-md max-h-[120px] overflow-y-scroll z-10 rounded-md absolute left-0 top-[calc(100%+6px)] bg-mdDark px-mainxs`
                  }
                >
                  {dropDownOpthions}
                </ul>
              </>
            )}
          </SelectList>

          <Button
            onClick={handleDone}
            sx={{ fontFamily: "cairo" }}
            className="!bg-mdDark"
            variant="contained"
          >
            {loading ? <MyLoading /> : "تأكيد"}
          </Button>
        </div>
      </div>
    </div>
  );
}
