"use client";
import dynamic from "next/dynamic";
const EquipmentsClient = dynamic(() => import("@/app/components/pages/equipments/equipment-page"), {
  ssr: false,
});
export default function EquipmentsPage() {
  return <EquipmentsClient />;
}
