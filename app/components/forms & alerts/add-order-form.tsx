"use client";
import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import SelectList from "../common/select-list";
import styles from "@/app/styles/drop-down.module.css";
import UsersTable from "../tables/users-table";
import styles2 from "@/app/styles/tables-scroll.module.css";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import {
  ADD_ORDER_REQ,
  CLIENT_COLLECTOR_REQ,
  GET_ALL_CLIENTS_REQ,
} from "@/app/utils/requests/client-side.requests";
import { getSlug, methodsArray, paidStatusArray, sameTextField, taxArray } from "@/app/utils/base";
import { useRouter } from "next/navigation";
import { useBills } from "@/app/utils/contexts/bills-contexts";

export default function AddOrderForm() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const { openPopup, popupState, closeOrderPopup } = usePopup();
  const openSnakeBar = (message: string) => {
    openPopup("snakeBarPopup", { message });
  };
  //* =================
  const [formData, setFormData] = useState<{
    payment_method: string;
    paid_status: string;
    tax: string | null;
    discount: string;
  }>({
    payment_method: "",
    paid_status: "",
    tax: null,
    discount: "",
  });
  const handleFormData = (key: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [key]: value });
  };
  const [openDropDown, setOpenDropDown] = useState({
    payment_method: false,
    paid_status: false,
    tax: false,
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
          if (formDataKeyName !== "discount") {
            handleOpenDropDown(formDataKeyName, false);
          }
        }}
        className="p-mainxs text-center border-b border-myLight cursor-pointer"
      >
        {e.label}
      </li>
    ));
  };

  //* =================
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_ALL_CLIENTS_REQ);
    if (response.done) {
      setData(response.data.clients);
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
    (formData.discount === "" ? 0 : Number(formData.discount));

  const validation = () => {
    if (!popupState.makeOrderPopup.data.client) {
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
    console.log(validation());
    if (!validation()) return;
    const finalObj: any = {
      client_id: popupState.makeOrderPopup.data.client?.id,
      product_sorts: JSON.stringify(popupState.makeOrderPopup.data.product_sorts),
      ...formData,
    };
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
    const response = await CLIENT_COLLECTOR_REQ(ADD_ORDER_REQ, {
      client_id: popupState.makeOrderPopup.data.client?.id,
      ...finalObj,
    });
    console.log(response);
    if (response.done) {
      openPopup("snakeBarPopup", { message: "تم انشاء الطلب بنجاح.", type: "success" });
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
        client: {
          name: data?.client.user_name,
          id: data?.client?.id,
        },
        data: sortsData,
        totals: {
          totalPrice: (
            data?.total_price * (data?.tax && data?.tax !== "" ? Number(data?.tax) / 100 + 1 : 1) -
            (data?.discount === "" ? 0 : Number(data?.discount))
          ).toString(),
          tax: data?.tax + "%",
          discount: data?.discount,
          paid_status: getSlug(paidStatusArray, data?.payment.status),
          payment_method: getSlug(methodsArray, data?.payment?.payment_method),
          created_at: data?.created_at,
        },
      });
      closeOrderPopup("makeOrderPopup");
      router.push("/bill");
    } else {
      openSnakeBar(response.message);
    }
  };
  return (
    <div className="relative rounded-xl shadow-md min-w-[620px] bg-myLight p-mainxl flex flex-col items-center">
      <h2 className="text-lg text-center font-semibold mb-4">انشاء طلب جديد</h2>
      <div className={styles2.list + " max-h-[250px] overflow-y-scroll"}>
        <UsersTable type="client" forOrder={true} data={data} />
      </div>
      <div className="w-full flex gap-2 items-center mt-5">
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
      </div>
      <div className="w-full flex gap-2 items-center mt-5">
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
      </div>
      <div className="w-full flex gap-2 items-center mt-5">
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
      </div>
      <Button
        onClick={handleDone}
        sx={{ fontFamily: "cairo" }}
        className="!bg-mdDark !mt-3 w-fit"
        variant="contained"
      >
        تأكيد الطلب
      </Button>
    </div>
  );
}
