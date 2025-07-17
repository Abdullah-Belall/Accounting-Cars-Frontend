"use client";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { carTypesArray, getSlug, sameTextField } from "../../utils/base";
import { CarType } from "@/app/utils/types/interfaces";
import SelectList from "../common/select-list";
import styles from "@/app/styles/drop-down.module.css";

export default function AddCarForm({
  onAdded,
  isForEdit,
  client_id,
}: {
  onAdded: (obj: {
    data: {
      mark: string;
      type: CarType;
      plate: string;
      chassis: string;
      color: string;
      model: number;
      category: number;
    };
    id: string;
  }) => Promise<void>;
  isForEdit?: {
    mark: string;
    type: CarType;
    plate: string;
    chassis: string;
    color: string;
    model: number;
    category: number;
    id: string;
  };
  client_id: string;
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    mark: isForEdit?.mark ?? "",
    type: isForEdit?.type ?? "",
    plate: isForEdit?.plate ?? "",
    chassis: isForEdit?.chassis ?? "",
    color: isForEdit?.color ?? "",
    model: isForEdit?.model ?? "",
    category: isForEdit?.category ?? "",
  });
  const [dropDown, setDropDown] = useState({
    type: false,
  });
  const handleDropDown = (key: keyof typeof dropDown, value: boolean) => {
    setDropDown((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const { openPopup } = usePopup();
  const openSnakeBar = (message: string) => {
    openPopup("snakeBarPopup", { message });
  };
  const handleData = (key: keyof typeof data, value: string) => {
    setData({ ...data, [key]: value });
  };
  const vaildation = () => {
    const { mark } = data;
    if (mark.length < 2) {
      openSnakeBar("لا يمكن ان تكون العلامة التجارية من حرف واحد فقط.");
      return false;
    }
    return true;
  };
  const handleDone = async () => {
    if (loading) return;
    if (!vaildation()) return;
    setLoading(true);
    let obj;
    if (isForEdit) {
      obj = {
        id: isForEdit.id,
        data: {
          ...data,
          category: Number(data.category),
          model: Number(data.model),
          type: data.type === "" ? undefined : data.type,
        },
      };
    } else {
      obj = {
        id: client_id,
        data: {
          ...data,
          category: Number(data.category),
          model: Number(data.model),
          type: data.type === "" ? undefined : data.type,
        },
      };
    }
    await onAdded(obj as any);
    setLoading(false);
  };
  return (
    <div className="mx-mainxs rounded-md shadow-md w-full min-[400px]:w-[384px] bg-myLight p-mainxl">
      <h2 className="text-lg text-center font-semibold mb-4">اضافة سيارة جديدة</h2>
      <div className="flex flex-col gap-2">
        <div className="flex gap-1">
          <TextField
            id="Glu"
            dir="rtl"
            label="العلامة التجارية"
            variant="filled"
            className="w-full"
            sx={sameTextField}
            value={data.mark}
            onChange={(e) => handleData("mark", e.target.value)}
          />
          <SelectList
            placeHolder="النوع"
            select={data.type !== "" ? getSlug(carTypesArray, data.type) : "النوع"}
            onClick={() => handleDropDown("type", true)}
            onBlur={() => handleDropDown("type", false)}
            dropDown={dropDown.type}
          >
            {dropDown.type && (
              <>
                <ul
                  className={
                    styles.list +
                    " w-full max-h-[120px] overflow-y-scroll z-10 rounded-md absolute left-0 top-[calc(100%+6px)] bg-anotherLight px-mainxs"
                  }
                >
                  {carTypesArray.map((e) => (
                    <li
                      key={e.value}
                      onClick={() => {
                        handleData("type", e.value);
                        handleDropDown("type", false);
                      }}
                      className="p-mainxs text-center border-b border-myLight cursor-pointer"
                    >
                      {e.label}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </SelectList>
        </div>
        <TextField
          id="Glu"
          dir="rtl"
          label="لوحة الترخيص"
          variant="filled"
          className="w-full"
          sx={sameTextField}
          value={data.plate}
          onChange={(e) => handleData("plate", e.target.value)}
        />
        <TextField
          id="Glu"
          dir="rtl"
          label="رقم الشاسية"
          variant="filled"
          className="w-full"
          sx={sameTextField}
          value={data.chassis}
          onChange={(e) => handleData("chassis", e.target.value)}
        />
        <div className="flex gap-1">
          <TextField
            id="Glu"
            dir="rtl"
            label="اللون"
            variant="filled"
            className="w-full"
            sx={sameTextField}
            value={data.color}
            onChange={(e) => handleData("color", e.target.value)}
          />
          <TextField
            id="Glu"
            dir="rtl"
            label="الموديل"
            variant="filled"
            className="w-full"
            sx={sameTextField}
            value={data.model}
            onChange={(e) => handleData("model", e.target.value.replace(/[^0-9.]/g, ""))}
          />
        </div>
        <TextField
          id="Glu"
          dir="rtl"
          label="الفئة"
          variant="filled"
          className="w-full"
          sx={sameTextField}
          value={data.category}
          onChange={(e) => handleData("category", e.target.value.replace(/[^0-9.]/g, ""))}
        />
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
  );
}
