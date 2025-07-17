"use client";

import { useMemo } from "react";
import { formatDate } from "../utils/base";
import { useBills } from "../utils/contexts/bills-contexts";
import { Button } from "@mui/material";

export default function RabiaBill() {
  const { bills } = useBills();

  const handlePrint = () => {
    window.print();
  };
  // {bills?.data}
  const items = useMemo(() => {
    return bills?.data?.map((e: any) => (
      <ul key={e?.id} className="w-full flex border-b-2 border-[#888]">
        <li className="w-[35%] py-3 text-center">
          {e?.product?.name} {e?.name} {e?.size}
        </li>
        <li className="w-[calc(65%/3)] py-3 text-center">{e?.qty}</li>
        <li className="w-[calc(65%/3)] py-3 text-center">{Number(e?.price).toLocaleString()}</li>
        <li className="w-[calc(65%/3)] py-3 text-center">
          {(Number(e?.price) * Number(e?.qty)).toLocaleString()}
        </li>
      </ul>
    ));
  }, [bills?.data]);
  console.log(bills);
  return (
    <div className="print-content h-[calc(100dvh)] relative flex flex-col w-full">
      <Button
        sx={{ fontFamily: "cairo" }}
        className="print-button !bg-mdDark !absolute !right-[10px] !top-0 z-3"
        variant="contained"
        onClick={handlePrint}
      >
        طباعة
      </Button>
      <div className="relative w-full flex justify-between">
        <div className="w-full flex flex-col items-center">
          <h1 className="text-[45px] font-bold">مركز الربيع سيرفس</h1>
          <p className="font-semibold text-[20px]">لصيانة جميع انواع سيارات الملاكي</p>
        </div>
        <div className="w-full rounded-s-3xl bg-black text-white font-bold text-[35px] py-[40px] text-center">
          فاتورة مشتريات
        </div>
      </div>
      <div className="mt-[40px] flex justify-between w-[85%] pr-[120px]">
        <div className="flex flex-col">
          <h1 className="text-orange-600 font-semibold text-xl">المبلغ الاجمالي</h1>
          <h2 className="text-xl font-semibold mt-3">{bills?.totals?.totalPrice}</h2>
          <div className="w-[25px] h-[3px] rounded-md bg-[#888] my-4"></div>
          <ul className="flex flex-col font-semibold gap-1">
            <li>رقم الفاتورة: {bills?.bill_id}</li>
            <li>تاريخ الفاتورة: {formatDate(bills?.totals?.created_at as Date)}</li>
          </ul>
        </div>
        <div className="flex flex-col">
          <h1 className="text-orange-600 font-semibold text-xl">اسم المشتري</h1>
          <h2 className="text-xl font-semibold mt-3">{bills?.car?.client?.user_name}</h2>
          <div className="w-[25px] h-[3px] rounded-md bg-[#888] my-4"></div>
          <ul className="flex flex-col font-semibold gap-1">
            <li>
              رقم الهاتف:{" "}
              {bills?.car?.client?.contacts ? bills?.car?.client?.contacts[0].phone : "لا يوجد"}
            </li>
            <li>
              رقم السيارة:{" "}
              {bills?.car?.plate && bills?.car?.plate !== "" ? bills?.car?.plate : "غير مسجل"}
            </li>
            <li>نوع السيارة: {bills?.car?.mark}</li>
          </ul>
        </div>
      </div>
      <div className="relative flex flex-col w-full mt-4 font-semibold">
        <ul className="w-full bg-black flex">
          <li className="w-[35%] bg-orange-600 text-white py-3 text-center rounded-e-2xl">
            اسم المنتج
          </li>
          <li className="w-[calc(65%/3)] text-white py-3 text-center">الكمية</li>
          <li className="w-[calc(65%/3)] text-white py-3 text-center">السعر</li>
          <li className="w-[calc(65%/3)] text-white py-3 text-center">الاجمالي</li>
        </ul>
        {items}
        <div className="flex justify-between px-5 w-[240px] bg-orange-600 py-3 text-white mr-auto">
          <p>الاجمالي</p>
          <p>{bills?.totals?.totalPrice}</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 pl-6 mr-auto w-[55%] py-2 bg-black text-white text-end rounded-s-2xl">
        01155607133 - 01061254203
      </div>
    </div>
  );
}
