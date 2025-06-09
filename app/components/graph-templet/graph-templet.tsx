"use client";
import { GraphDataInterface } from "@/app/utils/types/interfaces";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
export default function GraphTemplet({
  data,
  title,
}: {
  data: GraphDataInterface[];
  title: string;
}) {
  return (
    <div className="w-full h-full">
      <h1 className="mb-2 w-fit text-lg font-semibold text-myDark text-nowrap ml-auto">{title}</h1>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={data[0]?.day ? "day" : data[0]?.month ? "month" : "year"} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="totalEarning" stroke="#f9a620" name="المبيعات" />
          <Line type="monotone" dataKey="netProfit" stroke="#548c2f" name="صافي الأرباح" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
