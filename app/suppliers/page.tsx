"use client";
import dynamic from "next/dynamic";
const SuppliersClient = dynamic(() => import("@/app/components/pages/suppliers/suppliers-page"), {
  ssr: false,
});
export default function Workers() {
  return <SuppliersClient />;
}
