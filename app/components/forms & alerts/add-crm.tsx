"use client";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import MyLoading from "../common/loading";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { PickerValue } from "@mui/x-date-pickers/internals";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { usePopup } from "@/app/utils/contexts/popup-contexts";

export default function CrmForm({
  onDone,
  isForEdit,
  title,
}: {
  onDone: (data: any) => void;
  isForEdit?: { name: string; next_call_date: PickerValue };
  title: string;
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(
    isForEdit
      ? {
          name: isForEdit.name,
          next_call_date: isForEdit.next_call_date ? dayjs(isForEdit.next_call_date) : null,
        }
      : {
          name: "",
          next_call_date: null,
        }
  );
  const { openPopup } = usePopup();
  const handleData = (key: keyof typeof data, value: string | PickerValue) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const vaildation = () => {
    const { name, next_call_date } = data;
    if (!name || name.trim().length === 0) {
      openPopup("snakeBarPopup", { message: "يجب ادخال اسم التنبيه." });
      return false;
    }
    if (!next_call_date) {
      openPopup("snakeBarPopup", { message: "يجب ادخال تاريخ التنبيه." });
      return false;
    }
    // Check if the selected date is in the future
    if (next_call_date && dayjs(next_call_date).isBefore(dayjs().add(1, "day"), "day")) {
      openPopup("snakeBarPopup", { message: "يجب أن يكون تاريخ التنبيه في المستقبل." });
      return false;
    }
    return true;
  };

  const handleDone = async () => {
    if (!vaildation()) return;
    if (loading) return;
    setLoading(true);
    onDone({ name: data.name, next_call_date: data.next_call_date });
    setLoading(false);
  };
  return (
    <div className="mx-mainxs rounded-md shadow-md w-full min-[400px]:w-[384px] bg-myLight p-mainxl">
      <h2 className="text-lg text-center font-semibold mb-4">{title}</h2>
      <div className="space-y-4 flex flex-col gap-[15px]">
        <TextField
          id="Glu"
          dir="rtl"
          label="اسم التنبيه"
          variant="filled"
          className="w-full"
          value={data.name}
          onChange={(e) => handleData("name", e.target.value)}
        />
        <div className="" dir="ltr">
          <h1 className="text-sm ml-auto w-fit mb-2">التنبيه التالي</h1>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoItem>
              <DatePicker
                onChange={(newValue) => handleData("next_call_date", newValue)}
                value={data.next_call_date}
                minDate={dayjs().add(1, "day")}
              />
            </DemoItem>
          </LocalizationProvider>
        </div>
        <Button
          onClick={handleDone}
          sx={{ fontFamily: "cairo" }}
          className="!bg-mdDark"
          variant="contained"
        >
          {loading ? <MyLoading /> : isForEdit ? "تعديل" : "اضافة التنبيه"}
        </Button>
      </div>
    </div>
  );
}
