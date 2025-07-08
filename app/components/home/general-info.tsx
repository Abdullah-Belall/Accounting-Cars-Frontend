"use client";
import { CalcsInterface } from "@/app/utils/types/interfaces";
import InfoField from "./info-field";
import { useEffect, useState } from "react";
import { getSlug, periodsArray } from "@/app/utils/base";
import { Button } from "@mui/material";
import BlackLayer from "../common/black-layer";
import EditPeriodPopup from "../forms & alerts/edit-period";

export default function GeneralInfo({ data }: { data: CalcsInterface }) {
  const [isForTrail, setIsForTrail] = useState(false);
  const [editBalance, setEditBalance] = useState(false);
  useEffect(() => {
    const cond = ["localhost", "wolf-jet.vercel.app"].includes(window.location.hostname);
    setIsForTrail(cond);
  }, []);
  return (
    <>
      <section className="w-full flex flex-col">
        <h1 className="font-bold mb-[15px]">التحاليل العامة</h1>
        <div className="relative w-full mt-[8px]">
          <InfoField
            title={`رصيد بداية الفترة المحاسبية (${getSlug(periodsArray, data?.period) ?? "غير محدد"})`}
            total={isForTrail ? 95000 : (data?.balance ?? 0)}
            uom={`ج.م`}
          />
          {!data?.period && (
            <Button
              onClick={() => setEditBalance(true)}
              sx={{ fontFamily: "cairo" }}
              className="!bg-mdDark !absolute !left-[12px] !top-[12px]"
              variant="contained"
            >
              تعديل
            </Button>
          )}
        </div>
        <div className="w-full flex flex-col md:flex-row gap-[6px] justify-center items-center">
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
        <div className="w-full mt-[8px] flex flex-col md:flex-row gap-[6px] justify-center items-center">
          <InfoField title={"اجمالي ديون الزبائن"} total={data?.clientsDepts} uom={`ج.م`} />
          <InfoField title={"اجمالي ديونك للموردين"} total={data?.myDepts} uom={`ج.م`} />
        </div>
      </section>
      {editBalance && (
        <>
          <BlackLayer onClick={() => setEditBalance(false)}>
            <EditPeriodPopup
              OnConfirm={() => {
                setEditBalance(false);
                window.location.reload();
              }}
            />
          </BlackLayer>
        </>
      )}
    </>
  );
}
