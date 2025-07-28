"use client";
import React, { useEffect, useMemo, useState } from "react";
import { carTypesArray, formatDate, getSlug, shortIdGenerator } from "../utils/base";
import { useBills } from "../utils/contexts/bills-contexts";
import { Button } from "@mui/material";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { TbBrandToyota } from "react-icons/tb";

export default function RabiaBill() {
  const { bills } = useBills();
  const [hostname, setHostName] = useState("");
  const handlePrint = () => {
    window.print();
  };
  const items = useMemo(() => {
    return bills?.data?.map((e: any, i, arr) => (
      <ul
        key={i}
        className={
          "flex bg-white text-[#45616c]" + (i !== arr.length - 1 && " border-b-3 border-[#9fadb0]")
        }
      >
        <li className="py-3 flex flex-col justify-center px-4 gap-2 text-center w-[50%]">
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
  }, [bills?.data]);
  console.log(bills);
  useEffect(() => {
    setHostName(window.location.hostname);
  }, []);
  return (
    <div className="print-content min-h-[calc(100dvh)] relative flex flex-col w-full">
      <Button
        sx={{ fontFamily: "cairo" }}
        className="print-button !bg-mdDark !absolute !right-[10px] !top-0 z-3"
        variant="contained"
        onClick={handlePrint}
      >
        طباعة
      </Button>
      <h1 className="text-[80px] font-bold text-center mx-auto">{getBillData(hostname)?.title}</h1>
      <div className="w-full flex flex-col items-start pr-[30px] gap-1">
        <p className="font-bold text-[20px] pr-[60px]">
          لجميع انواع السيارات {getBillData(hostname)?.carsType}
        </p>
        <div className="flex items-center font-semibold gap-2">
          <p className="px-2 py-2 bg-[#45616c] rounded-md text-white border-2 border-[#9fadb0]">
            <FaLocationDot />
          </p>
          الغردقة منطقة الحرفين امام المجمع الصناعي بالغردقة
        </div>
        <div className="flex items-center font-semibold gap-2 tracking-widest">
          <p className="px-2 py-2 bg-[#45616c] rounded-md text-white border-2 border-[#9fadb0]">
            <FaPhoneAlt />
          </p>
          {getBillData(hostname)?.phones}
        </div>
      </div>
      <div className="flex gap-1 font-semibold mt-[10px] w-[90%] mx-auto">
        <div className="border-3 border-[#9fadb0] rounded-md py-3 text-lg px-1 text-center w-[calc(100%/3)]">
          {formatDate(bills?.totals?.created_at as Date)}
        </div>
        <div className="border-3 border-[#9fadb0] rounded-md py-3 text-lg px-1 text-center w-[calc(100%/3)]">
          فاتورة مبيعات - {shortIdGenerator(Number(bills?.bill_id))}
        </div>
        <div className="border-3 border-[#9fadb0] rounded-md py-3 text-lg px-1 text-center w-[calc(100%/3)]">
          الرقم/ {bills?.car?.client?.contacts ? bills?.car?.client?.contacts[0].phone : "لا يوجد"}
        </div>
      </div>
      <div className="border-3 tracking-widest border-[#9fadb0] rounded-md py-3 text-lg px-1 text-start w-[90%] font-semibold mx-auto mt-1">
        المطلوب من {bills?.car?.client?.user_name} المحترم لسيارة{" "}
        {bills?.car?.mark && bills?.car?.mark !== "" ? bills?.car?.mark : "__"}{" "}
        {bills?.car?.type && (bills?.car?.type as any) !== ""
          ? getSlug(carTypesArray, bills?.car?.type)
          : "-"}{" "}
        {bills?.car?.plate && bills?.car?.plate !== "" ? bills?.car?.plate : ""}
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
        {items}
      </div>
      <div className="flex flex-col gap-1 w-[90%] mx-auto mt-1 border-3 border-[#9fadb0] rounded-md p-2 text-lg font-bold">
        <div className="flex items-center justify-between">
          <div className="w-full flex items-center gap-3 flex-row-reverse justify-end">
            الاجمالي
            <div className="bg-[#45616c] border-2 border-[#9fadb0] bg-[#45616c] rounded-md h-[40px] w-[160px] text-white flex justify-center items-center">
              {Number(bills?.totals?.totalPrice).toLocaleString()}
            </div>
          </div>
          <div className="w-full flex items-center gap-3 justify-end">
            مدفوع تحت الحساب
            <div className="bg-[#45616c] border-2 border-[#9fadb0] bg-[#45616c] rounded-md h-[40px] w-[160px] text-white flex justify-center items-center">
              {Number(bills?.totals?.take_from_client_balance).toLocaleString()}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
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
      </div>
      <div className="flex gap-1 w-[90%] mx-auto mt-1 border-3 border-[#9fadb0] rounded-md p-2 text-lg font-bold">
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
      </div>
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
// "use client";

// import { useMemo } from "react";
// import { carTypesArray, formatDate, getSlug } from "../utils/base";
// import { useBills } from "../utils/contexts/bills-contexts";
// import { Button } from "@mui/material";

// export default function RabiaBill() {
//   const { bills } = useBills();

//   const handlePrint = () => {
//     window.print();
//   };
//   // {bills?.data}
//   const items = useMemo(() => {
//     return bills?.data?.map((e: any, i) => (
//       <ul key={e?.id + i.toString()} className="w-full flex border-b-2 border-[#888]">
//         <li className="w-[35%] py-3 text-center">
//           {e?.product?.name} {e?.name} {e?.size}
//         </li>
//         <li className="w-[calc(65%/3)] py-3 text-center">{e?.qty}</li>
//         <li className="w-[calc(65%/3)] py-3 text-center">
//           {Number(e?.price ?? e?.unit_price).toLocaleString()}
//         </li>
//         <li className="w-[calc(65%/3)] py-3 text-center">
//           {(Number(e?.price ?? e?.unit_price) * Number(e?.qty)).toLocaleString()}
//         </li>
//       </ul>
//     ));
//   }, [bills?.data]);
//   console.log(bills);
//   return (
//     <div className="print-content h-[calc(100dvh)] relative flex flex-col w-full">
//       <Button
//         sx={{ fontFamily: "cairo" }}
//         className="print-button !bg-mdDark !absolute !right-[10px] !top-0 z-3"
//         variant="contained"
//         onClick={handlePrint}
//       >
//         طباعة
//       </Button>
//       <div className="relative w-full flex justify-between">
//         <div className="w-full flex flex-col items-center">
//           <h1 className="text-[45px] font-bold">مركز الربيع سيرفس</h1>
//           <p className="font-semibold text-[20px]">لصيانة جميع انواع سيارات الملاكي</p>
//         </div>
//         <div className="w-full rounded-s-3xl bg-black text-white font-bold text-[35px] py-[40px] text-center">
//           فاتورة مشتريات
//         </div>
//       </div>
//       <div className="mt-[40px] flex justify-between w-[85%] pr-[120px]">
//         <div className="flex flex-col">
//           <h1 className="text-orange-600 font-semibold text-xl">المبلغ الاجمالي</h1>
//           <h2 className="text-xl font-semibold mt-3">{bills?.totals?.totalPrice}</h2>
//           <div className="w-[25px] h-[3px] rounded-md bg-[#888] my-4"></div>
//           <ul className="flex flex-col font-semibold gap-1">
//             <li>رقم الفاتورة: {bills?.bill_id}</li>
//             <li>تاريخ الفاتورة: {formatDate(bills?.totals?.created_at as Date)}</li>
//           </ul>
//         </div>
//         <div className="flex flex-col">
//           <h1 className="text-orange-600 font-semibold text-xl">اسم المشتري</h1>
//           <h2 className="text-xl font-semibold mt-3">{bills?.car?.client?.user_name}</h2>
//           <div className="w-[25px] h-[3px] rounded-md bg-[#888] my-4"></div>
//           <ul className="flex flex-col font-semibold gap-1">
//             <li>
//               رقم الهاتف:{" "}
//               {bills?.car?.client?.contacts ? bills?.car?.client?.contacts[0].phone : "لا يوجد"}
//             </li>
//             <li>
//               السيارة: {bills?.car?.mark && bills?.car?.mark !== "" ? bills?.car?.mark : "غير مسجل"}
//             </li>
//             <li>
//               رقم السيارة:{" "}
//               {bills?.car?.plate && bills?.car?.plate !== "" ? bills?.car?.plate : "غير مسجل"}
//             </li>
//             <li>
//               نوع السيارة:{" "}
//               {bills?.car?.type && (bills?.car?.type as any) !== ""
//                 ? getSlug(carTypesArray, bills?.car?.type)
//                 : "غير مسجل"}
//             </li>
//           </ul>
//         </div>
//       </div>
//       <div className="relative flex flex-col w-full mt-4 font-semibold">
//         <ul className="w-full bg-black flex">
//           <li className="w-[35%] bg-orange-600 text-white py-3 text-center rounded-e-2xl">
//             اسم المنتج
//           </li>
//           <li className="w-[calc(65%/3)] text-white py-3 text-center">الكمية</li>
//           <li className="w-[calc(65%/3)] text-white py-3 text-center">السعر</li>
//           <li className="w-[calc(65%/3)] text-white py-3 text-center">الاجمالي</li>
//         </ul>
//         {items}
//         <div className="flex justify-between px-5 w-[240px] bg-orange-600 py-3 text-white mr-auto">
//           <p>الاجمالي</p>
//           <p>{bills?.totals?.totalPrice}</p>
//         </div>
//       </div>
//       <div className="absolute bottom-0 left-0 pl-6 mr-auto w-[55%] py-2 bg-black text-white text-end rounded-s-2xl">
//         01155607133 - 01061254203
//       </div>
//     </div>
//   );
// }
