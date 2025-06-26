"use client";
import { CalcsInterface } from "@/app/utils/types/interfaces";
import InfoField from "./info-field";
import { useEffect, useState } from "react";

export default function GeneralInfo({ data }: { data: CalcsInterface }) {
  const [isForTrail, setIsForTrail] = useState(false);
  useEffect(() => {
    console.log(window.location.hostname);
    const cond = ["localhost", "wolf-jet.vercel.app"].includes(window.location.hostname);
    console.log(cond);
    setIsForTrail(cond);
  }, []);
  return (
    <section className="w-full flex flex-col items-end">
      <h1 className="font-bold mb-[15px]">التحاليل العامة</h1>
      <div dir="rtl" className="w-full flex gap-[10px] justify-center items-center">
        <InfoField
          title={"اجمالي تكاليف بضاعة المخزون الحالية"}
          total={isForTrail ? 125500 : data?.totalCostsPrice}
          uom={`ج.م`}
        />
        <InfoField
          title={"اجمالي اسعار بضاعة المخزون الحالية"}
          total={isForTrail ? 165000 : data?.totalSortsPrices}
          uom={`ج.م`}
        />
      </div>
    </section>
  );
}
