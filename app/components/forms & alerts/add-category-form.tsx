"use client";
import { unCountedMessage } from "@/app/utils/base";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import {
  ADD_CATEGORY_REQ,
  CLIENT_COLLECTOR_REQ,
  EDIT_CATEGORY_REQ,
} from "@/app/utils/requests/client-side.requests";
import { Button, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { sameTextField } from "../../utils/base";

export default function AddCategoryForm({
  onCategoryAdded,
  isForEdit,
}: {
  onCategoryAdded: any;
  isForEdit?: { name: string; desc: string | null; id: string; onEdited: any };
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(
    isForEdit
      ? {
          name: isForEdit.name,
          desc: isForEdit.desc ?? "",
        }
      : {
          name: "",
          desc: "",
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
      openSnakeBar("لا يمكن ان يكون اسم الفئة من حرف واحد فقط.");
      return false;
    }
    return true;
  };
  const handleDone = async () => {
    if (loading) return;
    if (!vaildation()) return;
    setLoading(true);
    const finalObj = {
      ...data,
      desc: data.desc !== "" ? data.desc : null,
      id: isForEdit?.id,
    };
    if (!isForEdit) {
      delete finalObj.id;
    }
    const response = await CLIENT_COLLECTOR_REQ(
      isForEdit ? EDIT_CATEGORY_REQ : ADD_CATEGORY_REQ,
      finalObj
    );
    setLoading(false);
    if (response.done) {
      if (isForEdit) {
        isForEdit.onEdited();
      } else {
        onCategoryAdded();
      }
      setData({
        name: "",
        desc: "",
      });
    } else {
      openSnakeBar(response?.message || unCountedMessage);
    }
  };
  return (
    <div className="rounded-md shadow-md min-w-sm bg-myLight p-mainxl">
      <h2 className="text-lg text-center font-semibold mb-4">انشاء فئة جديدة</h2>
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
        <TextField
          id="Glu"
          dir="rtl"
          label="الوصف"
          variant="filled"
          className="w-full"
          sx={sameTextField}
          value={data.desc ?? ""}
          onChange={(e) => handleData("desc", e)}
        />
        <Button
          onClick={handleDone}
          sx={{ fontFamily: "cairo" }}
          className="!bg-mdDark"
          variant="contained"
        >
          انشاء
        </Button>
      </div>
    </div>
  );
}
