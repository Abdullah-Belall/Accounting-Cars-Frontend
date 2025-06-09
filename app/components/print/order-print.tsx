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
  console.log(bills);
  return (
    <div className="print-content relative mx-auto flex flex-col items-center max-w-xl justify-center w-full px-mainxs">
      <h1 className="font-bold">
        فاتورة {bills?.type === "order" ? "مبيعات" : "مرتجعات"} {bills?.bill_id?.slice(4)}
      </h1>
      <div dir="rtl" className="flex flex-col w-full mt-3">
        <h2>العميل: {bills?.client?.name}</h2>
        <h2>ضريبة القيمة المضافة: {bills?.totals.tax}</h2>
        <h2>الخصم: {bills?.totals.discount} ج.م</h2>
        <h2>
          اجمالي السعر: {Number(Number(bills?.totals.totalPrice).toFixed(2)).toLocaleString()} ج.م
        </h2>
        <h2>وسيلة الدفع: {bills?.totals?.payment_method}</h2>
        <h2>حالة الدفع: {bills?.totals?.paid_status}</h2>
        <h2>تاريخ انشاء الفاتورة: {formatDate(bills?.totals?.created_at as Date)}</h2>
        <h2>تاريخ طباعة الفاتورة: {formatDate(new Date())}</h2>
        <Button
          sx={{ fontFamily: "cairo" }}
          className="print-button !bg-mdDark !absolute !left-0 !top-[45px]"
          variant="contained"
          onClick={handlePrint}
        >
          طباعة
        </Button>
      </div>
      <OrderBillsTable data={bills?.data} />
    </div>
  );
}
