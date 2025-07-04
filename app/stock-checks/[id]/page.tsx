"use client";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
const StockChecksItemsPage = dynamic(
  () => import("@/app/components/pages/stock-checks/stock-checks-items-page"),
  {
    ssr: false,
  }
);
export default function StockChecksPage() {
  const id = useParams().id;
  return <StockChecksItemsPage id={id as string} />;
}
