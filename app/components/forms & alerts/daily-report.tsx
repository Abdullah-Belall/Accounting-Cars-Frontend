"use client";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { Button } from "@mui/material";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  CLIENT_COLLECTOR_REQ,
  GET_DAILY_REPORT_REQ,
} from "@/app/utils/requests/client-side.requests";
import MyLoading from "../common/loading";

export default function DailyReport({ close }: { close: () => void }) {
  const [loading, setLoading] = useState(false);
  const { openPopup } = usePopup();
  const [date, setDate] = useState<any>(dayjs());
  const handleDone = async () => {
    if (loading) return;
    setLoading(true);
    const response = await CLIENT_COLLECTOR_REQ(GET_DAILY_REPORT_REQ, { date });
    console.log(response);
    if (response.done) {
      openPopup("dailyReport", { ...response.data, date });
      close();
    } else {
      openPopup("snakeBarPopup", {
        message: response.message,
      });
    }
    setLoading(false);
  };
  return (
    <div className="mx-mainxs rounded-md shadow-md w-full min-[400px]:w-[384px] bg-myLight p-mainxl">
      <h2 className="text-lg text-center font-semibold mb-4">تقرير يومي</h2>
      <div className="space-y-4 flex flex-col gap-[15px]">
        <div className="" dir="ltr">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoItem>
              <DatePicker onChange={(newValue) => setDate(newValue)} value={date} />
            </DemoItem>
          </LocalizationProvider>
        </div>
        <Button
          onClick={handleDone}
          sx={{ fontFamily: "cairo" }}
          className="!bg-mdDark"
          variant="contained"
        >
          {loading ? <MyLoading /> : "إظهار التقرير"}
        </Button>
      </div>
    </div>
  );
}
