"use client";
import dynamic from "next/dynamic";
const SortsStockChecksClient = dynamic(
  () => import("@/app/components/pages/stock-checks/sorts-stock-checks-page"),
  {
    ssr: false,
  }
);
export default function AddStockChecks() {
  return <SortsStockChecksClient />;
}
