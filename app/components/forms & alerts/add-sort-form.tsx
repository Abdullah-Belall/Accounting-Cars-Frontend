"use client";
import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { sameTextField, unCountedMessage } from "@/app/utils/base";
import {
  ADD_SORT_REQ,
  CLIENT_COLLECTOR_REQ,
  GET_ALL_SUPPLIERS_REQ,
  UPDATE_SORT_REQ,
} from "@/app/utils/requests/client-side.requests";
import SelectList from "../common/select-list";
import styles from "@/app/styles/drop-down.module.css";

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
    supplier: string;
  };
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{
    name: string;
    color: string;
    size?: string;
    qty?: string | number;
    cost?: string | number;
    unit_price: string | number;
    note: string;
    supplier: string;
  }>({
    name: isForEdit ? isForEdit.name : "",
    color: isForEdit ? isForEdit.color : "",
    size: isForEdit ? isForEdit.size : "",
    qty: isForEdit ? isForEdit.qty : "",
    cost: "",
    unit_price: isForEdit ? isForEdit.unit_price : "",
    note: isForEdit ? isForEdit.note : "",
    supplier: isForEdit ? isForEdit.supplier : "",
  });
  const [suppliers, setSuppliers] = useState([]);
  const [dropDown, setDropDown] = useState(false);

  const { openPopup } = usePopup();
  const openSnakeBar = (message: string) => {
    openPopup("snakeBarPopup", { message });
  };
  const handleData = (key: keyof typeof data, value: string) => {
    setData({ ...data, [key]: value });
  };
  const vaildation = () => {
    const { qty, cost, unit_price, supplier } = data;
    if (supplier === "") {
      openSnakeBar("يجب تحديد اسم المورد للمتابعة.");
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
    const editObj: any = {
      id: isForEdit?.sort_id,
      data: { ...data },
    };
    delete editObj.data.supplier;
    const addObj: any = {
      id,
      ...data,
    };
    if (data.size === "") {
      delete editObj.size;
      delete addObj.size;
    }
    if (data.color === "") {
      delete editObj.color;
      delete addObj.color;
    }
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
    setLoading(false);
    if (response.done) {
      onConfirm();
    } else {
      openSnakeBar(response?.message || unCountedMessage);
    }
  };
  const getAllSuppliers = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_ALL_SUPPLIERS_REQ);
    if (response.done) {
      setSuppliers(response.data.suppliers);
    }
  };
  useEffect(() => {
    getAllSuppliers();
  }, []);
  return (
    <div className="w-full min-[540px]:w-[540px] px-mainxs">
      <div className="rounded-md shadow-md bg-myLight p-mainxl">
        <h2 className="text-lg text-center font-semibold mb-4">
          {isForEdit ? `تعديل بيانات صنف ${isForEdit.name}` : "اضافة صنف جديد"}
        </h2>
        <div className="space-y-4 flex flex-col gap-[8px]">
          {!isForEdit && (
            <SelectList
              placeHolder="المورد"
              select={data.supplier !== "" ? data.supplier : "المورد"}
              onClick={() => setDropDown(true)}
              onBlur={() => setDropDown(false)}
              dropDown={dropDown}
            >
              {dropDown && (
                <>
                  <ul
                    className={
                      styles.list +
                      " w-full max-h-[120px] overflow-y-scroll z-10 rounded-md absolute left-0 top-[calc(100%+6px)] bg-anotherLight px-mainxs"
                    }
                  >
                    {suppliers.map((e: any) => (
                      <li
                        key={e.user_name}
                        onClick={() => {
                          handleData("supplier", e.user_name);
                          setDropDown(false);
                        }}
                        className="p-mainxs text-center border-b border-myLight cursor-pointer"
                      >
                        {e.user_name}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </SelectList>
          )}
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
              label="المقاس"
              variant="filled"
              sx={sameTextField}
              className="w-full"
              value={data.size ?? ""}
              onChange={(e) => handleData("size", e.target.value)}
            />
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
          </div>
          <div className="flex justify-center items-center gap-mainxs mb-0">
            {!isForEdit && (
              <>
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
              </>
            )}

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
    </div>
  );
}
