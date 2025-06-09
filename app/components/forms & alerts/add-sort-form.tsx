"use client";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { sameTextField, unCountedMessage } from "@/app/utils/base";
import {
  ADD_SORT_REQ,
  CLIENT_COLLECTOR_REQ,
  UPDATE_SORT_REQ,
} from "@/app/utils/requests/client-side.requests";

export default function AddSortForm({
  id,
  onConfirm,
  isForEdit,
}: {
  id?: string;
  onConfirm: any;
  isForEdit?: {
    sort_id: string;
    name: string;
    size: string;
    color: string;
    qty: string;
    unit_price: string;
    note: string;
  };
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{
    name: string;
    color: string;
    size: string;
    qty?: string | number;
    cost?: string | number;
    unit_price: string | number;
    note: string;
  }>({
    name: isForEdit ? isForEdit.name : "",
    color: isForEdit ? isForEdit.color : "",
    size: isForEdit ? isForEdit.size : "",
    qty: isForEdit ? isForEdit.qty : "",
    cost: "",
    unit_price: isForEdit ? isForEdit.unit_price : "",
    note: isForEdit ? isForEdit.note : "",
  });
  const { openPopup } = usePopup();
  const openSnakeBar = (message: string) => {
    openPopup("snakeBarPopup", { message });
  };
  const handleData = (key: keyof typeof data, value: string) => {
    setData({ ...data, [key]: value });
  };
  const vaildation = () => {
    const { name, size, qty, cost, unit_price } = data;
    if (name === "") {
      openSnakeBar("يجب تحديد اسم للصنف للمتابعة.");
      return false;
    }
    if (name.length < 2) {
      openSnakeBar("لا يمكن ان يكون اسم الصنف اقل من حرفين.");
      return false;
    }
    if (!size) {
      openSnakeBar("يجب تحديد المقاس للمتابعة.");
      return false;
    }
    if (Number(qty) <= 0) {
      openSnakeBar("يجب تحديد كمية للمتابعة.");
      return false;
    }
    if (!isForEdit) {
      if (Number(cost) <= 0) {
        openSnakeBar("يجب تحديد تكلفة بضاعة للمتابعة.");
        return false;
      }
    }
    if (+unit_price <= 0) {
      openSnakeBar("يجب تحديد سعر للوحدة للمتابعة.");
      return false;
    }
    if (Number(qty) * Number(unit_price) < Number(qty) * Number(cost)) {
      openSnakeBar("لا يمكن ان تكون تكلفة البضاعة اقل من سعر بيع الكمية كاملة.");
      return false;
    }

    return true;
  };
  const handleDone = async () => {
    if (loading) return;
    if (!vaildation()) return;
    setLoading(true);
    const editObj = {
      id: isForEdit?.sort_id,
      data: { ...data },
    };
    const addObj: any = {
      id,
      ...data,
    };
    editObj.data.unit_price = Number(editObj.data.unit_price);
    addObj.qty = Number(addObj.qty);
    addObj.unit_price = Number(addObj.unit_price);
    addObj.costPrice = Number(addObj.cost) * addObj.qty;
    delete addObj.cost;
    delete editObj.data.qty;
    delete editObj.data.cost;
    const response = await CLIENT_COLLECTOR_REQ(
      isForEdit ? UPDATE_SORT_REQ : ADD_SORT_REQ,
      isForEdit ? editObj : addObj
    );
    console.log(response);
    setLoading(false);
    if (response.done) {
      onConfirm();
    } else {
      openSnakeBar(response?.message || unCountedMessage);
    }
  };
  return (
    <div className="rounded-md shadow-md min-w-md bg-myLight p-mainxl">
      <h2 className="text-lg text-center font-semibold mb-4">
        {isForEdit ? `تعديل بيانات صنف ${isForEdit.name}` : "اضافة صنف جديد"}
      </h2>
      <div className="space-y-4 flex flex-col gap-[15px]">
        <TextField
          id="Glu"
          dir="rtl"
          label="اسم الصنف"
          variant="filled"
          sx={sameTextField}
          className="w-full"
          value={data.name ?? ""}
          onChange={(e) => handleData("name", e.target.value)}
        />
        <div className="flex justify-between items-center gap-mainxs mb-0">
          <TextField
            id="Glu"
            dir="rtl"
            label="اللون"
            className="w-full"
            variant="filled"
            sx={sameTextField}
            value={data.color ?? ""}
            onChange={(e) => handleData("color", e.target.value)}
          />
          <TextField
            id="Glu"
            dir="rtl"
            label="المقاس"
            variant="filled"
            sx={sameTextField}
            className="w-full"
            value={data.size ?? ""}
            onChange={(e) => handleData("size", e.target.value)}
          />
        </div>
        <div className="flex justify-center items-center gap-mainxs mb-0">
          <TextField
            id="Glu"
            dir="rtl"
            label="سعر البيع للوحدة"
            className="w-full"
            variant="filled"
            sx={sameTextField}
            value={data.unit_price ?? ""}
            onChange={(e) => handleData("unit_price", e.target.value.replace(/[^0-9.]/g, ""))}
          />
          {!isForEdit && (
            <>
              <TextField
                id="Glu"
                dir="rtl"
                label="التكلفة للوحدة"
                variant="filled"
                sx={sameTextField}
                className="w-full"
                value={data.cost ?? ""}
                onChange={(e) => handleData("cost", e.target.value.replace(/[^0-9.]/g, ""))}
              />
              <TextField
                id="Glu"
                dir="rtl"
                label="الكمية"
                variant="filled"
                sx={sameTextField}
                className="w-full"
                value={data.qty ?? ""}
                onChange={(e) => handleData("qty", e.target.value.replace(/[^0-9.]/g, ""))}
              />
            </>
          )}
        </div>
        <TextField
          id="Glu"
          dir="rtl"
          label="ملحوظة اضافية"
          variant="filled"
          className="w-full"
          sx={sameTextField}
          value={data.note ?? ""}
          onChange={(e) => handleData("note", e.target.value)}
        />
        <Button
          onClick={handleDone}
          sx={{ fontFamily: "cairo" }}
          className={"!bg-mdDark"}
          variant="contained"
        >
          اضافة
        </Button>
      </div>
    </div>
  );
}
