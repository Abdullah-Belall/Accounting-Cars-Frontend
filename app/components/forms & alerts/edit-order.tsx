"use client";
import {
  getSlug,
  methodsArray,
  paidStatusArray,
  periodsArray,
  sameTextField,
  shortIdGenerator,
} from "@/app/utils/base";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import SelectList from "../common/select-list";
import styles from "@/app/styles/drop-down.module.css";
import { CLIENT_COLLECTOR_REQ, UPDATE_ORDER_REQ } from "@/app/utils/requests/client-side.requests";
import { TbCircleXFilled } from "react-icons/tb";

export default function EditOrderPopup({ refetch }: { refetch: any }) {
  const { popupState, openPopup, closePopup } = usePopup();
  const deliveryData = popupState.editOrderPopup.data;
  const openSnakeBar = (message: string) => {
    openPopup("snakeBarPopup", { message });
  };
  const [data, setData] = useState({
    tax: deliveryData.tax,
    discount: deliveryData.discount || "",
    client_balance: deliveryData.client_balance || "",
    payment_method: deliveryData.payment_method,
    paid_status: deliveryData.payment_status,
    installment_type: deliveryData.installment_type || "",
  });
  const [dropDown, setDropDown] = useState({
    tax: false,
    payment_method: false,
    paid_status: false,
    installment_type: false,
  });
  const handleDropDowns = (key: keyof typeof dropDown, value: boolean) => {
    setDropDown({ ...dropDown, [key]: value });
  };
  const handleData = (key: keyof typeof data, value: string) => {
    if (key === "paid_status" && value !== "installment") {
      setData({ ...data, [key]: value, installment_type: "" });
    } else {
      setData({ ...data, [key]: value });
    }
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
    if (data.paid_status === "installments") {
      if (!data.installment_type || data.installment_type === "") {
        openSnakeBar("يجب تحديد نوع القسط للمتابعة.");
        return false;
      }
    }
    return true;
  };
  const handleDone = async () => {
    if (!validation()) return;
    const finalObj: any = {
      tax: data.tax !== "" && data.tax !== "0%" ? data.tax.slice(0, 2) : "0",
      discount: data.discount !== "" ? Number(data.discount) : 0,
      payment_method: data.payment_method,
      paid_status: data.paid_status,
      client_balance: data.client_balance ? Number(data.client_balance) : 0,
      installment_type: data.installment_type ?? null,
    };
    if (finalObj.paid_status !== "installments") {
      delete finalObj.installment_type;
      delete finalObj.installment;
      delete finalObj.down_payment;
    }
    const response = await CLIENT_COLLECTOR_REQ(UPDATE_ORDER_REQ, {
      id: deliveryData.id,
      data: finalObj,
    });
    if (response.done) {
      closePopup("editOrderPopup");
      refetch();
      openPopup("snakeBarPopup", { message: "تم تعديل الفاتورة بنجاح.", type: "success" });
    } else {
      openSnakeBar(response.message);
    }
  };

  const tax = data.tax.length > 2 ? data.tax.slice(0, 2) : data.tax.slice(0, 1);
  const deliveryDataTax =
    deliveryData.tax.length > 2 ? deliveryData.tax.slice(0, 2) : deliveryData.tax.slice(0, 1);
  console.log(deliveryData.earning);
  console.log(deliveryDataTax);
  const totalPriceAfter =
    ((Number(deliveryData.earning) + Number(deliveryData.discount || 0)) /
      (Number(deliveryDataTax) > 0 ? Number(deliveryDataTax) / 100 + 1 : 1)) *
      (Number(tax) > 0 ? Number(tax) / 100 + 1 : 1) -
    Number(data.discount);
  return (
    <div className="relative rounded-md shadow-md w-full min-[400px]:w-[384px] mx-mainxs bg-myLight p-mainxl">
      <button
        onClick={() => closePopup("editOrderPopup")}
        className="flex justify-center items-center w-[25px] h-[25px] bg-background rounded-[50%] z-[5] cursor-pointer absolute right-[-10px] top-[-10px] "
      >
        <TbCircleXFilled className="min-w-[30px] min-h-[30px]" />
      </button>
      <h2 className="text-lg text-center font-semibold mb-4">
        تعديل الفاتورة {shortIdGenerator(deliveryData.index)}
      </h2>

      <div className="space-y-4 flex flex-col">
        <div className="flex flex-row-reverse gap-2 mb-2.5 w-full">
          <TextField
            id="Glu"
            label="من حساب العميل"
            variant="filled"
            className="w-full"
            sx={sameTextField}
            value={data.client_balance}
            onChange={(e) => handleData("client_balance", e.target.value.replace(/[^0-9.]/g, ""))}
          />
          <TextField
            id="Glu"
            label="الخصم"
            variant="filled"
            className="w-full"
            sx={sameTextField}
            value={data.discount !== "0" ? data.discount : ""}
            onChange={(e) => handleData("discount", e.target.value.replace(/[^0-9.]/g, ""))}
          />
        </div>
        {/* <SelectList
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
        </SelectList> */}
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
        <div
          className={`${
            data.paid_status === "installments"
              ? "h-[52px] overflow-visible"
              : "h-[0] overflow-hidden mb-0"
          } mt-0 duration-[.3s] transition-[margin height] w-full`}
        >
          <SelectList
            placeHolder="نوع القسط"
            select={
              data.installment_type ? getSlug(periodsArray, data.installment_type) : "نوع القسط"
            }
            onClick={() => handleDropDowns("installment_type", true)}
            onBlur={() => handleDropDowns("installment_type", false)}
            dropDown={dropDown.installment_type}
          >
            {dropDown.installment_type && (
              <ul
                className={
                  styles.list +
                  " w-full max-h-[120px] overflow-y-scroll z-10 rounded-md absolute left-0 top-[calc(100%+6px)] bg-anotherLight px-mainxs"
                }
              >
                {periodsArray.map((e) => (
                  <li
                    key={e.value}
                    onClick={() => {
                      handleData("installment_type", e.value);
                      handleDropDowns("installment_type", false);
                    }}
                    className="p-mainxs text-center border-b border-myLight cursor-pointer"
                  >
                    {e.label}
                  </li>
                ))}
              </ul>
            )}
          </SelectList>
        </div>
        <TextField
          id="Glu"
          dir="rtl"
          label="اجمالي السعر بعد الضريبة والخصم"
          variant="filled"
          sx={sameTextField}
          value={totalPriceAfter.toFixed(2).toLocaleString()}
          className="w-full !mb-2"
          disabled
        />
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
