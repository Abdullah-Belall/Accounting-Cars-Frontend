"use client";
import { CalcsInterface } from "@/app/utils/types/interfaces";
import InfoField from "./info-field";
import { useState } from "react";
import { getSlug, periodsArray } from "@/app/utils/base";
import { Button } from "@mui/material";
import BlackLayer from "../common/black-layer";
import EditPeriodPopup from "../forms & alerts/edit-period";

export default function GeneralInfo({ data }: { data: CalcsInterface }) {
  const [editBalance, setEditBalance] = useState(false);
  return (
    <>
      <section className="w-full flex flex-col">
        <h1 className="font-bold mb-[15px]">التحاليل العامة</h1>
        <div className="relative w-full mt-[8px]">
          <InfoField
            title={`رصيد بداية الفترة المحاسبية (${
              getSlug(periodsArray, data?.period) ?? "غير محدد"
            })`}
            total={data?.balance ?? 0}
            // total={"تجريبي" as any}
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
        <div className="w-full flex flex-col md:flex-row gap-[6px] justify-center items-center mt-2">
          <InfoField
            title={"اجمالي تكاليف بضاعة المخزون الحالية"}
            total={data?.totalCostsPrice ?? 0}
            // total={"تجريبي" as any}
            uom={`ج.م`}
          />
          <InfoField
            title={"اجمالي اسعار بضاعة المخزون الحالية"}
            total={data?.totalSortsPrices ?? 0}
            // total={"تجريبي" as any}
            uom={`ج.م`}
          />
        </div>
        <div className="w-full mt-[8px] flex flex-col md:flex-row gap-[6px] justify-center items-center">
          <InfoField
            title={"اجمالي ديون الزبائن"}
            total={data?.clientsDepts}
            // total={"تجريبي" as any}
            uom={`ج.م`}
          />
          <InfoField
            title={"اجمالي ديونك للموردين"}
            total={data?.myDepts}
            // total={"تجريبي" as any}
            uom={`ج.م`}
          />
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
