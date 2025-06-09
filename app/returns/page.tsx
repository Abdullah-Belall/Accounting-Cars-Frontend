"use client";
import dynamic from "next/dynamic";
const ReturnsClient = dynamic(() => import("@/app/components/pages/returns/returns-page"), {
  ssr: false,
});
export default function Returns() {
  return <ReturnsClient />;
}
