"use client";
import dynamic from "next/dynamic";
const WorkersClient = dynamic(() => import("@/app/components/pages/workers/workers-page"), {
  ssr: false,
});
export default function Workers() {
  return <WorkersClient />;
}
