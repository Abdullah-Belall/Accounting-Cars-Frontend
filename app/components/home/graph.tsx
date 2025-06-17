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
  // const editedMonths = [
  //   { totalEarning: 15200, netProfit: 4300, year: 2025, month: "يناير" },
  //   { totalEarning: 17400, netProfit: 5200, year: 2025, month: "فبراير" },
  //   { totalEarning: 16000, netProfit: 4800, year: 2025, month: "مارس" },
  //   { totalEarning: 18900, netProfit: 6000, year: 2025, month: "أبريل" },
  //   { totalEarning: 20500, netProfit: 6700, year: 2025, month: "مايو" },
  //   { totalEarning: 19800, netProfit: 6100, year: 2025, month: "يونيو" },
  //   { totalEarning: 21400, netProfit: 7300, year: 2025, month: "يوليو" },
  //   { totalEarning: 22600, netProfit: 7900, year: 2025, month: "أغسطس" },
  //   { totalEarning: 21000, netProfit: 6900, year: 2025, month: "سبتمبر" },
  //   { totalEarning: 23000, netProfit: 8200, year: 2025, month: "أكتوبر" },
  //   { totalEarning: 21900, netProfit: 7500, year: 2025, month: "نوفمبر" },
  //   { totalEarning: 24000, netProfit: 8800, year: 2025, month: "ديسمبر" },
  // ];
  // const days = [
  //   { totalEarning: 1200, netProfit: 400, year: 2025, day: 1 },
  //   { totalEarning: 980, netProfit: 300, year: 2025, day: 2 },
  //   { totalEarning: 1100, netProfit: 370, year: 2025, day: 3 },
  //   { totalEarning: 1350, netProfit: 450, year: 2025, day: 4 },
  //   { totalEarning: 990, netProfit: 320, year: 2025, day: 5 },
  //   { totalEarning: 1400, netProfit: 500, year: 2025, day: 6 },
  //   { totalEarning: 1500, netProfit: 530, year: 2025, day: 7 },
  //   { totalEarning: 1250, netProfit: 410, year: 2025, day: 8 },
  //   { totalEarning: 1180, netProfit: 390, year: 2025, day: 9 },
  //   { totalEarning: 1430, netProfit: 470, year: 2025, day: 10 },
  //   { totalEarning: 1300, netProfit: 430, year: 2025, day: 11 },
  //   { totalEarning: 1480, netProfit: 510, year: 2025, day: 12 },
  //   { totalEarning: 1380, netProfit: 460, year: 2025, day: 13 },
  //   { totalEarning: 1600, netProfit: 580, year: 2025, day: 14 },
  //   { totalEarning: 1700, netProfit: 600, year: 2025, day: 15 },
  //   { totalEarning: 1450, netProfit: 480, year: 2025, day: 16 },
  //   { totalEarning: 1330, netProfit: 440, year: 2025, day: 17 },
  //   { totalEarning: 1280, netProfit: 420, year: 2025, day: 18 },
  //   { totalEarning: 1420, netProfit: 470, year: 2025, day: 19 },
  //   { totalEarning: 1500, netProfit: 520, year: 2025, day: 20 },
  //   { totalEarning: 1470, netProfit: 490, year: 2025, day: 21 },
  //   { totalEarning: 1350, netProfit: 450, year: 2025, day: 22 },
  //   { totalEarning: 1220, netProfit: 400, year: 2025, day: 23 },
  //   { totalEarning: 1290, netProfit: 420, year: 2025, day: 24 },
  //   { totalEarning: 1400, netProfit: 460, year: 2025, day: 25 },
  //   { totalEarning: 1550, netProfit: 540, year: 2025, day: 26 },
  //   { totalEarning: 1650, netProfit: 580, year: 2025, day: 27 },
  //   { totalEarning: 1380, netProfit: 470, year: 2025, day: 28 },
  //   { totalEarning: 1320, netProfit: 450, year: 2025, day: 29 },
  //   { totalEarning: 1450, netProfit: 500, year: 2025, day: 30 },
  // ];
  // const years = [
  //   { totalEarning: 19000, netProfit: 6300, year: 2023 },
  //   { totalEarning: 25500, netProfit: 11000, year: 2024 },
  //   { totalEarning: 20500, netProfit: 7000, year: 2025 },
  // ];
  return (
    <div className="w-full flex flex-col gap-10">
      <div className="w-full flex flex-col gap-12 lg:gap-3 lg:flex-row">
        <div className="w-full h-[300px]">
          <GraphTemplet data={editedMonths} title={`تحاليل أشهر السنة الحالية`} />
        </div>
        <div className="w-full h-[300px]">
          <GraphTemplet data={data.days} title={`تحاليل أيام الشهر الحالي`} />
        </div>
      </div>
      <div className="w-full h-[300px]">
        <GraphTemplet data={data.years} title={`تحاليل السنوات`} />
      </div>
    </div>
  );
}
