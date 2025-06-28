"use client";
import dynamic from "next/dynamic";
const StockChecksClient = dynamic(
  () => import("@/app/components/pages/stock-checks/stock-checks-page"),
  {
    ssr: false,
  }
);
export default function StockChecksPage() {
  return <StockChecksClient />;
}
