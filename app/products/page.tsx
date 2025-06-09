"use client";
import dynamic from "next/dynamic";
const ProductsClient = dynamic(() => import("@/app/components/pages/products/products-page"), {
  ssr: false,
});
export default function Sorts() {
  return <ProductsClient />;
}
