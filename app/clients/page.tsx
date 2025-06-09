"use client";
import dynamic from "next/dynamic";
const ClientsClient = dynamic(() => import("@/app/components/pages/clients/clients-page"), {
  ssr: false,
});
export default function Clients() {
  return <ClientsClient />;
}
