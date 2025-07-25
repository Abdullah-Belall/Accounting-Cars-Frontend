"use client";
import { CalcsInterface } from "@/app/utils/types/interfaces";
import InfoField from "./info-field";
import { useState } from "react";
import { getSlug, periodsArray } from "@/app/utils/base";
import { Button } from "@mui/material";
import BlackLayer from "../common/black-layer";
import EditPeriodPopup from "../forms & alerts/edit-period";
import OrdersTable from "../tables/orders-table";
import {
  CLIENT_COLLECTOR_REQ,
  GET_DAILY_REPORT_REQ,
} from "@/app/utils/requests/client-side.requests";
import { useRouter } from "next/navigation";
import ReturnsTable from "../tables/returns-table";
import ExpensesTable from "../tables/expenses-table";
import CostsTable from "../tables/costs-table";
import EquipmentsTable from "../tables/equipments-table";

export default function GeneralInfo({ data }: { data: CalcsInterface }) {
  const router = useRouter();
  const [editBalance, setEditBalance] = useState(false);
  const [dailyReport, setDailyReport] = useState(false);
  const [dailyReportData, setDailyReportData] = useState<any>();
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_DAILY_REPORT_REQ);
    console.log(response);
    if (response.done) {
      setDailyReportData(response.data);
    } else {
      router.replace("log-in");
    }
  };
  const handlePrint = () => {
    window.print();
  };
  return dailyReport ? (
    <div className="print-content relative min-h-[calc(100dvh)] relative flex flex-col w-full px-mainxs mt-[20px]">
      <div className="flex items-center gap-1 !absolute !left-mainxs !top-0 z-2">
        <Button
          onClick={handlePrint}
          sx={{ fontFamily: "cairo" }}
          className="print-button !bg-mdDark"
          variant="contained"
        >
          طباعة
        </Button>
        <Button
          onClick={() => {
            setDailyReport(false);
          }}
          sx={{ fontFamily: "cairo" }}
          className="print-button !bg-mdDark"
          variant="contained"
        >
          رجوع
        </Button>
      </div>
      {/* <div className="flex gap-1">
        <TextField
          id="Glu"
          dir="rtl"
          label="اجمالي المبيعات"
          variant="filled"
          className="w-full"
          sx={sameTextField}
          value={dailyReportData?.sales?.orders?.reduce(
            (acc: any, curr: any) => acc + Number(curr.total_price_after),
            0
          )}
          disabled
        />
      </div> */}
      <div>
        <OrdersTable
          data={dailyReportData?.sales?.orders}
          title=" فواتير المبيعات"
          refetch={fetchData}
        />
      </div>
      <div className="mt-[20px]">
        <ReturnsTable
          isMainTable={false}
          title={"فواتير المرتجعات"}
          data={dailyReportData?.returns?.returns_items}
        />
      </div>
      <div className="mt-[20px]">
        <ExpensesTable data={dailyReportData?.expenses?.expenses} forDailyReport={false} />
      </div>
      <div className="mt-[20px]">
        <CostsTable data={dailyReportData?.costs?.costs} title=" فواتير التكاليف" />
      </div>
      <div className="mt-[20px]">
        <EquipmentsTable
          title={"المعدات"}
          data={dailyReportData?.equipments?.equipments}
          isForDailyReport={false}
        />
      </div>
    </div>
  ) : (
    <>
      <section className="relative w-full flex flex-col">
        <Button
          onClick={() => {
            setDailyReport(true);
            fetchData();
          }}
          sx={{ fontFamily: "cairo" }}
          className="!bg-mdDark !absolute !left-[3px] !top-[-5px]"
          variant="contained"
        >
          التقرير اليومي
        </Button>
        <h1 className="font-bold mb-[1px] text-lg">التحاليل العامة</h1>
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
