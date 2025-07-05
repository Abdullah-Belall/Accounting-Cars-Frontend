"use client";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
const SuppliersClient = dynamic(
  () => import("@/app/components/pages/suppliers/suppliers-bills-page"),
  {
    ssr: false,
  }
);
export default function Costs() {
  const params = useParams();
  return <SuppliersClient id={params?.id as string} />;
}
