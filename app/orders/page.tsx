"use client";
import dynamic from "next/dynamic";
const OrdersClient = dynamic(() => import("@/app/components/pages/orders/order-page"), {
  ssr: false,
});
export default function Sorts() {
  return <OrdersClient />;
}
