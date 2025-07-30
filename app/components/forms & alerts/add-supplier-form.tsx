"use client";
import { unCountedMessage } from "@/app/utils/base";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { ADD_SUPPLIER_REQ, CLIENT_COLLECTOR_REQ } from "@/app/utils/requests/client-side.requests";
import { Button, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { sameTextField } from "../../utils/base";
import MyLoading from "../common/loading";

export default function AddSupplierForm({
  onSupplierAdded,
  isForEdit,
}: {
  onSupplierAdded: () => void;
  isForEdit?: { name: string; id: string; onEdited: any };
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(
    isForEdit
      ? {
          name: isForEdit.name,
        }
      : {
          name: "",
        }
  );
  const { openPopup } = usePopup();
  const openSnakeBar = (message: string) => {
    openPopup("snakeBarPopup", { message });
  };
  const handleData = (
    key: keyof typeof data,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({ ...data, [key]: e.target.value });
  };
  const vaildation = () => {
    const { name } = data;
    if (name.length < 2) {
      openSnakeBar("لا يمكن ان يكون اسم المورد من حرف واحد فقط.");
      return false;
    }
    return true;
  };
  const handleDone = async () => {
    if (loading) return;
    if (!vaildation()) return;
    setLoading(true);
    const response = await CLIENT_COLLECTOR_REQ(ADD_SUPPLIER_REQ, { user_name: data.name });
    setLoading(false);
    if (response.done) {
      if (isForEdit) {
        isForEdit.onEdited();
      } else {
        onSupplierAdded();
      }
      setData({
        name: "",
      });
    } else {
      openSnakeBar(response?.message || unCountedMessage);
    }
  };
  return (
    <div className="mx-mainxs rounded-md shadow-md w-full min-[400px]:w-[384px] bg-myLight p-mainxl">
      <h2 className="text-lg text-center font-semibold mb-4">اضافة مورد جديد</h2>
      <div className="space-y-4 flex flex-col gap-[15px]">
        <TextField
          id="Glu"
          dir="rtl"
          label="الاسم"
          variant="filled"
          className="w-full"
          sx={sameTextField}
          value={data.name}
          onChange={(e) => handleData("name", e)}
        />
        <Button
          onClick={handleDone}
          sx={{ fontFamily: "cairo" }}
          className="!bg-mdDark"
          variant="contained"
        >
          {loading ? <MyLoading /> : "اضافة"}
        </Button>
      </div>
    </div>
  );
}
