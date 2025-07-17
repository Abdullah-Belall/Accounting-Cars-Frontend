"use client";
import { useBills } from "@/app/utils/contexts/bills-contexts";
import OrderBillsTable from "../tables/order-bills-table";
import { Button } from "@mui/material";
import { formatDate } from "@/app/utils/base";

export default function OrderPrint() {
  const { bills } = useBills();

  const handlePrint = () => {
    window.print();
  };
  return (
    <div className="print-content relative mx-auto flex flex-col items-center max-w-[637px] justify-center w-full px-mainxs">
      <h1 className="font-bold">فاتورة مبيعات {bills?.bill_id}</h1>
      <div dir="rtl" className="flex flex-col w-full mt-3">
        <h2>العميل: {bills?.car?.client?.user_name}</h2>
        <h2>السيارة: {bills?.car?.mark}</h2>
        <h2>ضريبة القيمة المضافة: {bills?.totals.tax}</h2>
        <h2>الخصم: {bills?.totals.discount} ج.م</h2>
        <h2>
          مصنعية:{" "}
          {bills?.totals.additional_fees
            ? Number(Number(bills?.totals.additional_fees).toFixed(2)).toLocaleString()
            : 0}{" "}
          ج.م
        </h2>
        <h2>
          اجمالي السعر: {Number(Number(bills?.totals.totalPrice).toFixed(2)).toLocaleString()} ج.م
        </h2>
        <h2>وسيلة الدفع: {bills?.totals?.payment_method}</h2>
        <h2>حالة الدفع: {bills?.totals?.paid_status}</h2>
        {bills?.totals?.paid_status === "دفع بالأقساط" && (
          <>
            <h2>نوع القسط: {bills?.totals?.installment_type}</h2>
            <h2>المقدم: {bills?.totals?.down_payment} ج.م</h2>
            <h2>قيمة القسط: {bills?.totals?.installment} ج.م</h2>
          </>
        )}
        <h2>تاريخ انشاء الفاتورة: {formatDate(bills?.totals?.created_at as Date)}</h2>
        <h2>تاريخ طباعة الفاتورة: {formatDate(new Date())}</h2>
        <Button
          sx={{ fontFamily: "cairo" }}
          className="print-button !bg-mdDark !absolute !left-[10px] !top-[45px]"
          variant="contained"
          onClick={handlePrint}
        >
          طباعة
        </Button>
      </div>
      <div className="max-w-[100%]">
        <OrderBillsTable data={bills?.data} />
      </div>
    </div>
  );
}
