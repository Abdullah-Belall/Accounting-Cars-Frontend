"use client";

import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import SelectList from "../common/select-list";
import styles from "@/app/styles/drop-down.module.css";
import {
  CLIENT_COLLECTOR_REQ,
  GET_ALL_SUPPLIERS_REQ,
} from "@/app/utils/requests/client-side.requests";
import MyLoading from "../common/loading";

export default function EditQtyPopup({
  OnConfirm,
  latest_cost_unit_price,
}: {
  OnConfirm: any;
  latest_cost_unit_price: number;
}) {
  const [loading, setLoading] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const { popupState, openPopup } = usePopup();
  const openSnakeBar = (message: string) => {
    openPopup("snakeBarPopup", { message });
  };
  const [data, setData] = useState({
    oldQty: popupState.editQtyPopup.data?.currQty,
    newQty: "",
    costPrice: "",
    supplier: "",
    initial_amount: "",
  });
  const [suppliers, setSuppliers] = useState([]);

  const handleData = (key: keyof typeof data, value: string) => {
    setData({ ...data, [key]: value });
  };
  const validation = () => {
    if (data.newQty === "" || data.newQty == "0") {
      openSnakeBar("يجب ادخال كمية صالحة للمتابعة.");
      return false;
    }
    if (Number(data.newQty) < 0 && Number(data.oldQty) + Number(data.newQty) < 0) {
      openSnakeBar("لا يمكن ان تكون الكمية الاجمالية رقم سالب.");
      return false;
    }
    if (data.costPrice == "" || Number(data.costPrice) <= 0) {
      openSnakeBar("يجب ادخال تكلفة صالحة للمتابعة.");
      return false;
    }
    return true;
  };
  const handleDone = async () => {
    if (loading) return;
    if (!validation()) return;
    await OnConfirm({
      qty: Number(total),
      costPrice: Number(data.costPrice) * Math.abs(Number(data.newQty)),
      supplier: data.supplier,
      initial_amount: data.initial_amount ? Number(data.initial_amount) : undefined,
    });
    setLoading(false);
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
  useEffect(() => {
    const inAmount = data.initial_amount;
    if (inAmount !== "") {
      if (Number(inAmount) > totalCost) {
        handleData("initial_amount", totalCost.toString());
      }
    }
  }, [data.initial_amount]);
  const total = (Number(data?.oldQty) ?? 0) + (Number(data.newQty) ?? 0);
  const totalCost = (Number(data.newQty) ?? 0) * Number(data.costPrice ?? 0);
  return (
    <div className="w-full min-[365px]:w-[365px] px-mainxs">
      <div className="rounded-md shadow-md bg-myLight p-mainxl">
        <h2 className="text-lg text-center font-semibold mb-4">
          تعديل كمية صنف {popupState.editQtyPopup.data?.title}
        </h2>

        <div className="flex flex-col gap-[8px]">
          <div className="flex gap-[8px]">
            <TextField
              id="Glu"
              dir="rtl"
              label="الكمية الاجمالية"
              variant="filled"
              className="w-full"
              value={total}
              onChange={(e) => handleData("oldQty", e.target.value)}
              disabled
            />
            <TextField
              id="Glu"
              dir="rtl"
              label="اجمالي التكلفة"
              variant="filled"
              className="w-full"
              value={totalCost.toLocaleString()}
              disabled
            />
          </div>
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
                    " w-full max-h-[120px] overflow-y-scroll z-10 rounded-md absolute left-0 top-[calc(100%+6px)] bg-mdDark px-mainxs"
                  }
                >
                  {suppliers.map((e: any) => (
                    <li
                      key={e.user_name}
                      onClick={() => {
                        handleData("supplier", e.user_name);
                        setDropDown(false);
                      }}
                      className="p-mainxs text-center border-b border-myLight cursor-pointer text-myLight"
                    >
                      {e.user_name}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </SelectList>
          <div className="flex gap-2 w-full m-0">
            <TextField
              id="Glu"
              dir="rtl"
              label="الكمية الجديدة"
              variant="filled"
              className="w-full"
              value={data.newQty ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                if (/^-?\d*\.?\d*$/.test(value)) {
                  handleData("newQty", value);
                }
              }}
            />
            <TextField
              id="Glu"
              dir="rtl"
              label="التكلفة للوحدة"
              variant="filled"
              className="w-full"
              value={data.costPrice ?? ""}
              onChange={(e) => handleData("costPrice", e.target.value.replace(/[^0-9.]/g, ""))}
            />
          </div>
          <TextField
            id="Glu"
            dir="rtl"
            label="اخر سعر تكلفة لهذا الصنف"
            variant="filled"
            className="w-full"
            value={latest_cost_unit_price.toString()}
            disabled
          />
          <TextField
            id="Glu"
            dir="rtl"
            label="دفعة مبداية للمورد"
            variant="filled"
            className="w-full"
            value={data.initial_amount}
            onChange={(e) => handleData("initial_amount", e.target.value.replace(/[^0-9.]/g, ""))}
          />

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
