"use client";
import dynamic from "next/dynamic";
const ExpensesClient = dynamic(() => import("@/app/components/pages/expenses/expense-page"), {
  ssr: false,
});
export default function ExpensesPage() {
  return <ExpensesClient />;
}
