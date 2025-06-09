"use client";
import { methodsArray, paidStatusArray, sameTextField, taxArray } from "@/app/utils/base";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import SelectList from "../common/select-list";
import styles from "@/app/styles/drop-down.module.css";
import { CLIENT_COLLECTOR_REQ, UPDATE_ORDER_REQ } from "@/app/utils/requests/client-side.requests";

export default function EditOrderPopup({ refetch }: { refetch: any }) {
  const { popupState, openPopup, closePopup } = usePopup();
  const deliveryData = popupState.editOrderPopup.data;
  const openSnakeBar = (message: string) => {
    openPopup("snakeBarPopup", { message });
  };
  const [data, setData] = useState({
    tax: deliveryData.tax,
    discount: deliveryData.discount,
    payment_method: deliveryData.payment_method,
    paid_status: deliveryData.payment_status,
  });
  console.log(data);
  const [dropDown, setDropDown] = useState({
    tax: false,
    payment_method: false,
    paid_status: false,
  });
  const handleDropDowns = (key: keyof typeof dropDown, value: boolean) => {
    setDropDown({ ...dropDown, [key]: value });
  };
  const handleData = (key: keyof typeof data, value: string) => {
    setData({ ...data, [key]: value });
  };
  const validation = () => {
    if (data.tax !== "" && data.tax !== "0%" && Number(data.tax.slice(0, 2)) < 0) {
      openSnakeBar("يجب ادخال خصم صالح للمتابعة.");
      return false;
    }
    if (data.discount !== "" && Number(data.discount) < 0) {
      openSnakeBar("لا يمكن ان يكون الخصم بالسالب.");
      return false;
    }
    if (
      data.discount >
      deliveryData.earnig *
        (data.tax !== "" && data.tax !== "0%" ? Number(data.tax.slice(0, 2)) : 1) +
        deliveryData.earnig
    ) {
      openSnakeBar("الخصم اكبر من اجمالي السعر.");
      return false;
    }
    return true;
  };
  const handleDone = async () => {
    if (!validation()) return;
    const finalObj = {
      tax: data.tax !== "" && data.tax !== "0%" ? data.tax.slice(0, 2) : "0",
      discount: data.discount !== "" ? Number(data.discount) : 0,
      payment_method: data.payment_method,
      paid_status: data.paid_status,
    };
    console.log(finalObj);
    const response = await CLIENT_COLLECTOR_REQ(UPDATE_ORDER_REQ, {
      id: deliveryData.id,
      data: finalObj,
    });
    console.log(response);
    if (response.done) {
      closePopup("editOrderPopup");
      refetch();
      openPopup("snakeBarPopup", { message: "تم تعديل الطلب بنجاح.", type: "success" });
    } else {
      openSnakeBar(response.message);
    }
  };
  const totalPriceAfter =
    deliveryData.earning *
      (data.tax !== "" && data.tax !== "0%" ? Number(data.tax.slice(0, 2)) / 100 + 1 : 1) -
    (data.discount !== "" ? Number(data.discount) : 0);
  return (
    <div className="rounded-md shadow-md min-w-md bg-myLight p-mainxl">
      <h2 className="text-lg text-center font-semibold mb-4">
        تعديل الطلب رقم {deliveryData.index}
      </h2>

      <div className="space-y-4 flex flex-col">
        <div className="flex flex-row-reverse gap-2">
          <SelectList
            placeHolder={data.tax == "0%" ? "بدون ضريبة" : data.tax}
            select={taxArray.find((e) => e.value === data.tax)?.label as string}
            onClick={() => handleDropDowns("tax", true)}
            onBlur={() => handleDropDowns("tax", false)}
            dropDown={dropDown.tax}
          >
            {dropDown.tax && (
              <>
                <ul
                  className={
                    styles.list +
                    " w-full max-h-[120px] overflow-y-scroll z-10 rounded-md absolute left-0 top-[calc(100%+6px)] bg-anotherLight px-mainxs"
                  }
                >
                  {taxArray.map((e) => (
                    <li
                      key={e.value}
                      onClick={() => {
                        handleData("tax", e.value);
                        handleDropDowns("tax", false);
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
          <TextField
            id="Glu"
            label="الخصم"
            variant="filled"
            className="w-fit"
            sx={sameTextField}
            value={data.discount !== "0" ? data.discount : ""}
            onChange={(e) => handleData("discount", e.target.value.replace(/[^0-9.]/g, ""))}
          />
        </div>
        <div className="flex gap-2">
          <SelectList
            placeHolder="طريقة الدفع"
            select={methodsArray.find((e) => e.value === data.payment_method)?.label as string}
            onClick={() => handleDropDowns("payment_method", true)}
            onBlur={() => handleDropDowns("payment_method", false)}
            dropDown={dropDown.payment_method}
          >
            {dropDown.payment_method && (
              <>
                <ul
                  className={
                    styles.list +
                    " w-full max-h-[120px] overflow-y-scroll z-10 rounded-md absolute left-0 top-[calc(100%+6px)] bg-anotherLight px-mainxs"
                  }
                >
                  {methodsArray.map((e) => (
                    <li
                      key={e.value}
                      onClick={() => {
                        handleData("payment_method", e.value);
                        handleDropDowns("payment_method", false);
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
          <SelectList
            placeHolder="حالة الدفع"
            select={paidStatusArray.find((e) => e.value === data.paid_status)?.label as string}
            onClick={() => handleDropDowns("paid_status", true)}
            onBlur={() => handleDropDowns("paid_status", false)}
            dropDown={dropDown.paid_status}
          >
            {dropDown.paid_status && (
              <>
                <ul
                  className={
                    styles.list +
                    " w-full max-h-[120px] overflow-y-scroll z-10 rounded-md absolute left-0 top-[calc(100%+6px)] bg-anotherLight px-mainxs"
                  }
                >
                  {paidStatusArray.map((e) => (
                    <li
                      key={e.value}
                      onClick={() => {
                        handleData("paid_status", e.value);
                        handleDropDowns("paid_status", false);
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
        <div className="w-full flex gap-2 items-center">
          <TextField
            id="Glu"
            dir="rtl"
            label="اجمالي السعر بعد الضريبة والخصم"
            variant="filled"
            sx={sameTextField}
            value={totalPriceAfter.toFixed(2).toLocaleString()}
            className="w-full"
            disabled
          />
          <TextField
            id="Glu"
            dir="rtl"
            label="اجمالي السعر"
            variant="filled"
            sx={sameTextField}
            value={deliveryData.earning.toLocaleString()}
            className="w-full"
            disabled
          />
        </div>
        <Button
          onClick={handleDone}
          sx={{ fontFamily: "cairo" }}
          className="!bg-mdDark"
          variant="contained"
        >
          تأكيد
        </Button>
      </div>
    </div>
  );
}
