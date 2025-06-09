"use client";
import dynamic from "next/dynamic";
const SortsClient = dynamic(() => import("@/app/components/pages/sorts/sorts-page"), {
  ssr: false,
});
export default function Sorts() {
  return <SortsClient />;
}
