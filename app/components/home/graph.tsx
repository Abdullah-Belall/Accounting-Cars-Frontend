"use client";
import { useEffect, useMemo, useState } from "react";
import GraphTemplet from "../graph-templet/graph-templet";
import { GraphDataInterface } from "@/app/utils/types/interfaces";
import {
  CLIENT_COLLECTOR_REQ,
  GET_GRAPH_DATA_REQ,
} from "@/app/utils/requests/client-side.requests";

const monthsArr = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

export default function AllGraphs() {
  const [data, setData] = useState({
    years: [],
    months: [],
    days: [],
  });
  const handleData = (key: keyof typeof data, value: GraphDataInterface[]) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const fetchData = async (type: keyof typeof data) => {
    const response = await CLIENT_COLLECTOR_REQ(GET_GRAPH_DATA_REQ, { type });
    console.log(response);
    if (response.done) {
      handleData(type, response.data.totalGraphData);
    }
  };
  useEffect(() => {
    fetchData("days");
    fetchData("months");
    fetchData("years");
  }, []);
  const editedMonths = useMemo(() => {
    return data.months.map((e: any) => ({
      ...e,
      month: monthsArr[e.month - 1],
    }));
  }, [data.months]);
  return (
    <div className="w-full flex flex-col gap-10">
      <div className="w-full h-[300px] flex gap-4">
        <GraphTemplet data={editedMonths} title={`تحاليل أشهر السنة الحالية`} />
        <GraphTemplet data={data.days} title={`تحاليل أيام الشهر الحالي`} />
      </div>
      <div className="w-full h-[300px]">
        <GraphTemplet data={data.years} title={`تحاليل السنوات`} />
      </div>
    </div>
  );
}
