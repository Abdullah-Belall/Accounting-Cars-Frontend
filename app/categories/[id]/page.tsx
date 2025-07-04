"use client";
import dynamic from "next/dynamic";
const CategoryProductsClient = dynamic(
  () => import("@/app/components/pages/category-products/cat-products-page"),
  {
    ssr: false,
  }
);
export default function Sorts() {
  return <CategoryProductsClient />;
}
