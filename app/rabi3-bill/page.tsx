"use client";
import React, { useEffect, useMemo, useState } from "react";
import { carTypesArray, formatDate, getSlug, shortIdGenerator } from "../utils/base";
import { useBills } from "../utils/contexts/bills-contexts";
import { Button } from "@mui/material";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { TbBrandToyota } from "react-icons/tb";
import Image from "next/image";
import ktmImage from "@/public/ktm.png";

export default function RabiaBill() {
  const { bills } = useBills();
  const [hostname, setHostName] = useState("");
  const [showKtm, setShowKtm] = useState(true);
  const isCostBill = bills?.type === "cost";
  const handlePrint = () => {
    window.print();
  };
  const billsData = bills?.data?.filter((e) => Number(e.qty) > 0);
  const sortedBills: any = billsData?.filter((e) => e?.product?.name);
  const items = useMemo(() => {
    return sortedBills.map((e: any, i: number, arr: any) => (
      <ul
        key={i}
        className={
          "flex bg-white text-[#45616c]" + (i !== arr.length - 1 && " border-b-3 border-[#9fadb0]")
        }
      >
        <li className="py-3 flex flex-col justify-center px-4 gap-2 text-center w-[50%]">
          {isCostBill && shortIdGenerator(e.id) + " - "}
          {e?.name}
        </li>
        <li className="py-3 flex flex-col justify-center px-4 gap-2 text-center w-[13%] border-x-2 border-[#9fadb0]">
          {e?.qty}
        </li>
        <li className="flex flex-col gap-2 justify-center text-center w-[13%] border-l-2 border-[#9fadb0]">
          {Number(e?.price ?? e?.unit_price).toLocaleString()}
        </li>
        <li className="flex flex-col gap-2 justify-center text-center w-[24%]">
          {(Number(e?.price ?? e?.unit_price) * Number(e?.qty)).toLocaleString()}
        </li>
      </ul>
    ));
  }, [billsData]);
  const masna3a: any = billsData?.filter((e) => !e?.product?.name);
  const masna3aItems = useMemo(() => {
    return masna3a.map((e: any, i: number, arr: any) => (
      <ul
        key={i + "masna3a"}
        className={
          "flex bg-white text-[#45616c] border-[#9fadb0] " +
          (i !== arr.length - 1 && " border-b-3 ") +
          (i === 0 && " border-t-3")
        }
      >
        <li className="py-3 flex flex-col justify-center px-4 gap-2 text-center w-[50%]">
          {isCostBill && shortIdGenerator(e.id) + " - "}
          {e?.name}
        </li>
        <li className="py-3 flex flex-col justify-center px-4 gap-2 text-center w-[13%] border-x-2 border-[#9fadb0]">
          {e?.qty}
        </li>
        <li className="flex flex-col gap-2 justify-center text-center w-[13%] border-l-2 border-[#9fadb0]">
          {Number(e?.price ?? e?.unit_price).toLocaleString()}
        </li>
        <li className="flex flex-col gap-2 justify-center text-center w-[24%]">
          {(Number(e?.price ?? e?.unit_price) * Number(e?.qty)).toLocaleString()}
        </li>
      </ul>
    ));
  }, [billsData]);
  useEffect(() => {
    setHostName(window.location.hostname);
  }, []);
  return (
    <div className="print-content min-h-[calc(100dvh)] relative flex flex-col w-full bg-white">
      <div className="print-button !absolute !right-[10px] !top-0 z-3 flex gap-2">
        <Button
          sx={{ fontFamily: "cairo" }}
          className="!bg-mdDark"
          variant="contained"
          onClick={handlePrint}
        >
          طباعة
        </Button>
        <Button
          sx={{ fontFamily: "cairo" }}
          className="!bg-mdDark"
          variant="contained"
          onClick={() => setShowKtm(!showKtm)}
        >
          {showKtm ? "اخفاء الختم" : "اظهار الختم"}
        </Button>
      </div>
      <h1 className="text-[80px] font-bold text-center mx-auto text-[black]">
        {getBillData(hostname)?.title}
      </h1>
      <div className="w-full flex flex-col items-start pr-[30px] gap-1">
        <p className="font-bold text-[20px] pr-[60px] text-[black]">
          لجميع انواع السيارات {getBillData(hostname)?.carsType}
        </p>
        <div className="flex items-center font-semibold gap-2 text-[black]">
          <p className="px-2 py-2 bg-[#45616c] rounded-md text-white border-2 border-[#9fadb0]">
            <FaLocationDot />
          </p>
          الغردقة منطقة الحرفين امام المجمع الصناعي بالغردقة
        </div>
        <div className="flex items-center font-semibold gap-2 tracking-widest text-[black]">
          <p className="px-2 py-2 bg-[#45616c] rounded-md text-white border-2 border-[#9fadb0]">
            <FaPhoneAlt />
          </p>
          {getBillData(hostname)?.phones}
        </div>
      </div>
      <div className="flex gap-1 font-semibold mt-[10px] w-[90%] mx-auto text-[black]">
        {!isCostBill && (
          <div className="border-3 border-[#9fadb0] rounded-md py-1.5 px-1 text-center w-[calc(100%/3)]">
            {formatDate(bills?.totals?.created_at as Date)}
          </div>
        )}
        <div className="mx-auto border-3 border-[#9fadb0] rounded-md py-1.5 px-1 text-center w-[calc(100%/3)]">
          {isCostBill
            ? "فواتير تكاليف"
            : "فاتورة مبيعات - " + shortIdGenerator(Number(bills?.bill_id))}
        </div>
        {!isCostBill && (
          <div className="border-3 border-[#9fadb0] rounded-md py-1.5 px-1 text-center w-[calc(100%/3)]">
            الرقم/{" "}
            {bills?.car?.client?.contacts && bills?.car?.client?.contacts?.length > 0
              ? bills?.car?.client?.contacts[0].phone?.slice(1) + "+"
              : "لا يوجد"}
          </div>
        )}
      </div>

      <div className="flex gap-1 font-semibold mt-[3px] w-[90%] mx-auto text-[black]">
        <div className="border-3 border-[#9fadb0] rounded-md py-1.5 px-1 text-center w-[calc(100%/3)]">
          المطلوب من: {bills?.car?.client?.user_name}
        </div>
        <div className="mx-auto border-3 border-[#9fadb0] rounded-md py-1.5 px-1 text-center w-[calc(100%/3)]">
          السيارة: {bills?.car?.mark && bills?.car?.mark !== "" ? bills?.car?.mark : ""}{" "}
          {bills?.car?.type && (bills?.car?.type as any) !== ""
            ? getSlug(carTypesArray, bills?.car?.type)
            : ""}{" "}
        </div>

        <div className="border-3 border-[#9fadb0] rounded-md py-1.5 px-1 text-center w-[calc(100%/3)]">
          لوحة الترخيص:{" "}
          {bills?.car?.plate && bills?.car?.plate !== "" ? bills?.car?.plate : "غير مسجل"}
        </div>
      </div>
      <div className="flex flex-col w-[90%] mx-auto mt-1 border-3 border-[#9fadb0] rounded-xl overflow-hidden">
        <ul className="flex bg-[#45616c] border-b-3 border-[#9fadb0] text-white">
          <li className="py-2 flex flex-col justify-center px-4 gap-2 text-center w-[50%]">
            <p className="text-xl font-bold whitespace-nowrap">البند</p>
            <p className="text-xs">ITEM</p>
          </li>
          <li className="py-2 flex flex-col justify-center px-4 gap-2 text-center w-[13%] border-x-2 border-white">
            <p className="text-xl font-bold whitespace-nowrap">الكمية</p>
            <p className="text-xs">QTY</p>
          </li>
          <li className="flex flex-col gap-2 text-center w-[13%] border-l-2 border-white">
            <p className="pt-2 font-bold whitespace-nowrap">سعر الوحدة</p>
            <p className="text-xs px-4 pb-1">UNIT PRICE</p>
            <div className="text-center py-1 border-t-2 border-white px-4">جنية</div>
          </li>
          <li className="flex flex-col gap-2 text-center w-[24%]">
            <p className="text-xl pt-2 font-bold whitespace-nowrap px-4">المبلغ الاجمالي</p>
            <p className="text-xs px-4">TOTAL AMOUNT</p>
            <div className="text-center py-1 border-t-2 border-white px-4">جنية</div>
          </li>
        </ul>
        {[items, masna3aItems].flat()}
      </div>
      <div className="flex flex-col gap-1 w-[90%] mx-auto mt-1 border-3 border-[#9fadb0] rounded-md p-2 text-lg font-bold">
        <div className="flex items-center justify-between text-[black]">
          <div className="w-full flex items-center gap-3 flex-row-reverse justify-end">
            الاجمالي
            <div className="bg-[#45616c] border-2 border-[#9fadb0] bg-[#45616c] rounded-md h-[40px] w-[160px] text-white flex justify-center items-center">
              {Number(bills?.totals?.totalPrice).toLocaleString()}
            </div>
          </div>
          {!isCostBill && (
            <div className="w-full flex items-center gap-3 justify-end">
              مدفوع تحت الحساب
              <div className="bg-[#45616c] border-2 border-[#9fadb0] bg-[#45616c] rounded-md h-[40px] w-[160px] text-white flex justify-center items-center">
                {Number(bills?.totals?.take_from_client_balance).toLocaleString()}
              </div>
            </div>
          )}
        </div>
        {!isCostBill && (
          <div className="flex items-center justify-between text-[black]">
            <div className="w-full flex items-center gap-3 flex-row-reverse justify-end">
              الباقي في حساب العميل
              <div className="bg-[#45616c] border-2 border-[#9fadb0] bg-[#45616c] rounded-md h-[40px] w-[160px] text-white flex justify-center items-center">
                {Number(bills?.totals?.client_balance).toLocaleString()}
              </div>
            </div>
            <div className="w-full flex items-center justify-end gap-3">
              المطلوب
              <div className="bg-[#45616c] border-2 border-[#9fadb0] bg-[#45616c] rounded-md h-[40px] w-[160px] text-white flex justify-center items-center">
                {Number(bills?.totals?.client_depts).toLocaleString()}
              </div>
            </div>
          </div>
        )}
      </div>
      {!isCostBill && (
        <div className="relative flex gap-1 w-[90%] text-[black] mx-auto mt-1 border-3 border-[#9fadb0] rounded-md p-2 text-lg font-bold">
          <div className="text-sm w-full flex items-center gap-3 justify-start">
            وسيلة الدفع: {bills?.totals?.payment_method}
          </div>
          <div className="text-sm w-full flex items-center gap-3 justify-center">
            حالة الدفع: {bills?.totals?.paid_status}
          </div>
          {bills?.totals?.paid_status === "دفع بالأقساط" && (
            <div className="text-sm w-full flex items-center gap-3 justify-end">
              المقدم: {Number(bills?.totals?.down_payment || 0)}
            </div>
          )}
          {showKtm && (
            <div className="absolute bottom-[-10px] left-[-20px] rotate-[35deg] opacity-[.7]">
              <Image src={ktmImage} alt="rabi3-bill" width={150} height={150} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const billParamters: {
  domain: string;
  title: string | React.ReactNode;
  carsType: string;
  phones: string;
}[] = [
  {
    domain: "elrabi3.nabdtech.store",
    title: `الربيع سيرفس`,
    carsType: "البنزين",
    phones: "01224957535 - 01155607133",
  },
  {
    domain: "toyota.nabdtech.store",
    title: (
      <div className="flex items-center gap-1">
        <p>TOYOTA</p>
        <TbBrandToyota />
        <p>D</p>
      </div>
    ),
    carsType: "الجاز",
    phones: "01224957535 - 01155607133",
  },
  {
    domain: "localhost",
    title: (
      <div className="flex items-center gap-1">
        <p>TOYOTA</p>
        <TbBrandToyota />
        <p>D</p>
      </div>
    ),
    carsType: "الجاز",
    phones: "01224957535 - 01155607133",
  },
];
const getBillData = (domain: string) => {
  return billParamters.find((e) => e.domain === domain);
};
