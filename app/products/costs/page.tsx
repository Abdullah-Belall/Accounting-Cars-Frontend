"use client";
import dynamic from "next/dynamic";
const CostsClient = dynamic(() => import("@/app/components/pages/costs/costs-page"), {
  ssr: false,
});
export default function Costs() {
  return <CostsClient />;
}
