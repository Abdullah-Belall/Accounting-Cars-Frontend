"use client";
import dynamic from "next/dynamic";
const CategoriesClient = dynamic(
  () => import("@/app/components/pages/categories/categories-page"),
  {
    ssr: false,
  }
);
export default function CategoriesPage() {
  return <CategoriesClient />;
}
