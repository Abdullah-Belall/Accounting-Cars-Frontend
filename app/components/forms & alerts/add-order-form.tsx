"use client";
import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import SelectList from "../common/select-list";
import styles from "@/app/styles/drop-down.module.css";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import {
  ADD_ORDER_REQ,
  CLIENT_COLLECTOR_REQ,
  GET_ALL_CAR_REQ,
} from "@/app/utils/requests/client-side.requests";
import {
  getSlug,
  methodsArray,
  paidStatusArray,
  periodsArray,
  sameTextField,
  taxArray,
} from "@/app/utils/base";
import { useRouter } from "next/navigation";
import { useBills } from "@/app/utils/contexts/bills-contexts";
import { TbCircleXFilled } from "react-icons/tb";
import CarsTable from "../tables/cars-table";

export default function AddOrderForm({ closePopup }: { closePopup: () => void }) {
  const router = useRouter();
  const [data, setData] = useState([]);
  const { openPopup, popupState, closeOrderPopup } = usePopup();
  const openSnakeBar = (message: string) => {
    openPopup("snakeBarPopup", { message });
  };
  const [formData, setFormData] = useState<{
    payment_method: string;
    installment_type: string;
    paid_status: string;
    tax: string | null;
    discount: string;
    installment: string;
    down_payment: string;
    additional_fees: string | null;
  }>({
    payment_method: "",
    installment_type: "",
    paid_status: "",
    tax: null,
    discount: "",
    installment: "",
    down_payment: "",
    additional_fees: "",
  });
  const handleFormData = (key: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [key]: value });
  };
  const [openDropDown, setOpenDropDown] = useState({
    payment_method: false,
    paid_status: false,
    tax: false,
    installment_type: false,
  });
  const { setBills } = useBills();
  const handleOpenDropDown = (key: keyof typeof openDropDown, value: boolean) => {
    setOpenDropDown({ ...openDropDown, [key]: value });
  };
  const DropDownOptions = (arr: any, formDataKeyName: keyof typeof formData) => {
    return arr.map((e: any) => (
      <li
        key={e.value}
        onClick={() => {
          handleFormData(formDataKeyName, e.value);
          if (
            formDataKeyName !== "discount" &&
            (formDataKeyName === "payment_method" ||
              formDataKeyName === "paid_status" ||
              formDataKeyName === "tax" ||
              formDataKeyName === "installment_type")
          ) {
            handleOpenDropDown(formDataKeyName, false);
          }
        }}
        className="p-mainxs text-center border-b border-myLight cursor-pointer"
      >
        {e.label}
      </li>
    ));
  };

  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_ALL_CAR_REQ);
    if (response.done) {
      setData(response.data.cars);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const totalPrice = popupState.makeOrderPopup.data.product_sorts.reduce(
    (acc: number, curr: { unit_price: number; qty: number }) =>
      acc + Number(curr.unit_price) * curr.qty,
    0
  );
  const totalPriceAfter =
    totalPrice *
      (formData.tax && formData.tax !== "" ? Number(formData.tax.slice(0, 2)) / 100 + 1 : 1) -
    (formData.discount === "" ? 0 : Number(formData.discount)) +
    (formData.additional_fees === "" ? 0 : Number(formData.additional_fees));
  const validation = () => {
    if (!popupState.makeOrderPopup.data.car) {
      openSnakeBar("يجب اختيار عميل للمتابعة.");
      return false;
    }
    if (formData.payment_method === "") {
      openSnakeBar("يجب تحديد وسيلة دفع للمتابعة.");
      return false;
    }
    if (formData.paid_status === "") {
      openSnakeBar("يجب تحديد حالة الدفع للمتابعة.");
      return false;
    }

    if (formData.paid_status === "installments") {
      if (formData.installment_type === "") {
        openSnakeBar("يجب تحديد نوع القسط للمتابعة.");
        return false;
      }
      if (
        formData.down_payment !== "" &&
        +formData.down_payment >= Number(totalPriceAfter.toFixed(2))
      ) {
        openSnakeBar("لا يمكن ان يكون المقدم اكبر من او يساوي اجمالي السعر بعد الضريبة والخصم.");
        return false;
      }
      if (installmentValue === "" || +installmentValue <= 0) {
        openSnakeBar("يجب تحديد قيمة قسط للمتابعة.");
        return false;
      }
      if (installmentValue !== "" && +installmentValue > Number(totalPriceAfter.toFixed(2))) {
        openSnakeBar("لا يمكن ان يكون قيمة القسط اكبر من اجمالي السعر بعد الضريبة والخصم.");
        return false;
      }
      if (
        formData.down_payment !== "" &&
        installmentValue !== "" &&
        +formData.down_payment + +installmentValue >= Number(totalPriceAfter.toFixed(2))
      ) {
        openSnakeBar(
          "لا يمكن ان يكون مجموع المقدم وقيمة القسط اكبر من اجمالي السعر بعد الضريبة والخصم."
        );
        return false;
      }
    }
    if (Number(formData.discount) < 0) {
      openSnakeBar("لا يمكن ان يكون الخصم بالسالب.");
      return false;
    }
    if (
      Number(formData.discount) >
      totalPrice *
        (formData.tax && formData.tax !== "" ? Number(formData.tax.slice(0, 2)) / 100 + 1 : 1)
    ) {
      openSnakeBar("لا يمكن ان يكون الخصم اكبر من اجمالي السعر.");
      return false;
    }
    return true;
  };
  const handleDone = async () => {
    if (!validation()) return;
    const finalObj: any = {
      car_id: popupState.makeOrderPopup.data.car?.id,
      product_sorts: JSON.stringify(popupState.makeOrderPopup.data.product_sorts),
      ...formData,
    };
    finalObj.installment = installmentValue;
    if (finalObj.discount !== "") {
      finalObj.discount = +finalObj.discount;
    } else {
      delete finalObj.discount;
    }
    if (finalObj?.tax && finalObj?.tax !== "") {
      finalObj.tax = finalObj.tax.slice(0, 2);
    } else {
      delete finalObj.tax;
    }
    if (finalObj?.additional_fees && finalObj?.additional_fees !== "") {
      finalObj.additional_fees = +finalObj.additional_fees;
    } else {
      delete finalObj.additional_fees;
    }
    if (finalObj.paid_status === "installments") {
      finalObj.installment = Number(finalObj.installment);
      finalObj.down_payment = finalObj.down_payment !== "" ? Number(finalObj.down_payment) : 0;
    } else {
      delete finalObj.installment;
      delete finalObj.down_payment;
      delete finalObj.installment_type;
    }
    const response = await CLIENT_COLLECTOR_REQ(ADD_ORDER_REQ, {
      car_id: popupState.makeOrderPopup.data.car?.id,
      ...finalObj,
    });
    if (response.done) {
      openPopup("snakeBarPopup", { message: "تم انشاء الفاتورة بنجاح.", type: "success" });
      const data = response.data;
      const sortsData = data?.order_items?.map((item: any, index: number) => ({
        color: item?.sort?.color,
        index: index + 1,
        id: item?.sort?.id,
        name: item?.sort?.name,
        size: item?.sort?.size,
        qty: item?.qty,
        price: item?.unit_price,
        product: {
          name: item?.sort?.product?.name,
          id: item?.sort?.product?.id,
          material: item?.sort?.product?.material,
        },
      }));
      setBills({
        type: "order",
        bill_id: data?.short_id,
        car: data.car,
        data: sortsData,
        totals: {
          totalPrice: data?.total_price_after,
          tax: data?.tax + "%",
          additional_fees: data?.additional_fees,
          discount: data?.discount,
          paid_status: getSlug(paidStatusArray, data?.payment.status),
          installment_type: getSlug(periodsArray, formData.installment_type),
          down_payment: formData.down_payment,
          installment: installmentValue,
          payment_method: getSlug(methodsArray, data?.payment?.payment_method),
          created_at: data?.created_at,
        },
      });
      closeOrderPopup("makeOrderPopup");
      const rabi3 = ["localhost", "alrabi3-trail.nabdtech.store"];
      router.push(rabi3.includes(window.location.hostname) ? "/rabi3-bill" : "bill");
    } else {
      openSnakeBar(response.message);
    }
  };
  const installmentValue = formData.installment
    ? Math.ceil(
        Number(
          (Math.ceil(Number(totalPriceAfter)) -
            (formData.down_payment ? Number(formData.down_payment) : 0)) /
            Number(formData.installment)
        )
      ).toString()
    : "";
  return (
    <div className="w-full sm:w-[640px] px-mainxs">
      <div className={"relative bg-myLight rounded-xl shadow-md p-mainxs"}>
        <button
          onClick={closePopup}
          className="flex justify-center items-center w-[25px] h-[25px] bg-background rounded-[50%] z-[5] cursor-pointer absolute right-[-10px] top-[-10px] "
        >
          <TbCircleXFilled className="min-w-[30px] min-h-[30px]" />
        </button>
        <div
          className={
            "hiddenScrollbar relative flex flex-col items-center max-h-[calc(100dvh-120px)] overflow-y-scroll md:overflow-y-visible"
          }
        >
          <div className="w-full">
            <h2 className="text-lg text-center font-semibold mb-1">انشاء طلب جديد</h2>
            <CarsTable title={"حدد السيارة"} data={data} order={true} />
          </div>
          <div className="w-full flex gap-2 items-center mt-2.5">
            <SelectList
              placeHolder="وسيلة الدفع"
              select={
                formData.payment_method !== ""
                  ? getSlug(methodsArray, formData.payment_method)
                  : "وسيلة الدفع"
              }
              onClick={() => handleOpenDropDown("payment_method", true)}
              onBlur={() => handleOpenDropDown("payment_method", false)}
              dropDown={openDropDown.payment_method}
            >
              {openDropDown.payment_method && (
                <>
                  <ul
                    className={
                      styles.list +
                      " w-full max-h-[120px] overflow-y-scroll z-10 rounded-md absolute left-0 top-[calc(100%+6px)] bg-anotherLight px-mainxs"
                    }
                  >
                    {DropDownOptions(methodsArray, "payment_method")}
                  </ul>
                </>
              )}
            </SelectList>
            <SelectList
              placeHolder="حالة الدفع"
              select={
                formData.paid_status !== ""
                  ? getSlug(paidStatusArray, formData.paid_status)
                  : "حالة الدفع"
              }
              onClick={() => handleOpenDropDown("paid_status", true)}
              onBlur={() => handleOpenDropDown("paid_status", false)}
              dropDown={openDropDown.paid_status}
            >
              {openDropDown.paid_status && (
                <>
                  <ul
                    className={
                      styles.list +
                      " w-full max-h-[120px] overflow-y-scroll z-10 rounded-md absolute left-0 top-[calc(100%+6px)] bg-anotherLight px-mainxs"
                    }
                  >
                    {DropDownOptions(paidStatusArray, "paid_status")}
                  </ul>
                </>
              )}
            </SelectList>
          </div>
          <div
            className={`${
              formData.paid_status === "installments"
                ? "h-[114px] md:h-[53px] mt-1.5 overflow-visible"
                : "h-[0] overflow-hidden"
            } duration-[.3s] transition-[margin height] w-full flex flex-col md:flex-row gap-2 items-center`}
          >
            <SelectList
              placeHolder="نوع القسط"
              select={
                formData.installment_type !== ""
                  ? getSlug(periodsArray, formData.installment_type)
                  : "نوع القسط"
              }
              onClick={() => handleOpenDropDown("installment_type", true)}
              onBlur={() => handleOpenDropDown("installment_type", false)}
              dropDown={openDropDown.installment_type}
            >
              {openDropDown.installment_type && (
                <>
                  <ul
                    className={
                      styles.list +
                      " w-full max-h-[120px] overflow-y-scroll z-10 rounded-md absolute left-0 top-[calc(100%+6px)] bg-anotherLight px-mainxs"
                    }
                  >
                    {DropDownOptions(periodsArray, "installment_type")}
                  </ul>
                </>
              )}
            </SelectList>
            <div className="flex gap-2 items-center w-full">
              <TextField
                id="Glu"
                dir="rtl"
                label="المقدم"
                variant="filled"
                sx={sameTextField}
                onChange={(e) =>
                  handleFormData("down_payment", e.target.value.replace(/[^0-9.]/g, ""))
                }
                value={formData.down_payment}
                className="w-full"
              />
              <TextField
                id="Glu"
                dir="rtl"
                label="عدد الأقساط"
                variant="filled"
                sx={sameTextField}
                onChange={(e) =>
                  handleFormData("installment", e.target.value.replace(/[^0-9.]/g, ""))
                }
                value={formData.installment ? Math.ceil(Number(formData.installment)) : ""}
                className="w-full"
              />
              <TextField
                id="Glu"
                dir="rtl"
                label="قيمة القسط"
                variant="filled"
                sx={sameTextField}
                onChange={(e) =>
                  handleFormData(
                    "installment",
                    e.target.value
                      ? (
                          (Math.ceil(Number(totalPriceAfter)) -
                            (formData.down_payment ? Number(formData.down_payment) : 0)) /
                          Number(e.target.value.replace(/[^0-9.]/g, ""))
                        ).toString()
                      : ""
                  )
                }
                value={installmentValue}
                className="w-full"
              />
            </div>
          </div>
          <div className="w-full flex flex-col sm:flex-row gap-2 items-center mt-1.5">
            <SelectList
              placeHolder="ضريبة القيمة المضافة"
              select={getSlug(taxArray, formData.tax as string) ?? "ضريبة القيمة المضافة"}
              onClick={() => handleOpenDropDown("tax", true)}
              onBlur={() => handleOpenDropDown("tax", false)}
              dropDown={openDropDown.tax}
            >
              {openDropDown.tax && (
                <>
                  <ul
                    className={
                      styles.list +
                      " w-full max-h-[120px] overflow-y-scroll z-10 rounded-md absolute left-0 top-[calc(100%+6px)] bg-anotherLight px-mainxs"
                    }
                  >
                    {DropDownOptions(taxArray, "tax")}
                  </ul>
                </>
              )}
            </SelectList>
            <div className="w-full flex gap-2 items-center">
              <TextField
                id="Glu"
                dir="rtl"
                label="الخصم بالجنية"
                variant="filled"
                sx={sameTextField}
                value={formData.discount}
                onChange={(e) => handleFormData("discount", e.target.value.replace(/[^0-9.]/g, ""))}
                className="w-full"
              />
              <TextField
                id="Glu"
                dir="rtl"
                label="مصنعية"
                variant="filled"
                sx={sameTextField}
                value={formData.additional_fees}
                onChange={(e) =>
                  handleFormData("additional_fees", e.target.value.replace(/[^0-9.]/g, ""))
                }
                className="w-full"
              />
            </div>
          </div>
          <div className="w-full flex gap-2 items-center mt-1.5">
            <TextField
              id="Glu"
              dir="rtl"
              label="اجمالي السعر"
              variant="filled"
              sx={sameTextField}
              value={Number(totalPrice.toFixed(2)).toLocaleString()}
              className="w-full"
              disabled
            />
            <TextField
              id="Glu"
              dir="rtl"
              label="اجمالي السعر بعد الضريبة والخصم"
              variant="filled"
              sx={sameTextField}
              value={Number(totalPriceAfter.toFixed(2)).toLocaleString()}
              className="w-full"
              disabled
            />
          </div>
          <Button
            onClick={handleDone}
            sx={{ fontFamily: "cairo" }}
            className="!bg-mdDark !mt-3 w-fit"
            variant="contained"
          >
            تأكيد الفاتورة
          </Button>
        </div>
      </div>
    </div>
  );
}
