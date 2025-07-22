"use client";
import { useEffect, useState } from "react";
import GeneralInfo from "./components/home/general-info";
import { CLIENT_COLLECTOR_REQ, GET_CALCS_REQ } from "./utils/requests/client-side.requests";
import { useRouter } from "next/navigation";
import { CalcsInterface } from "./utils/types/interfaces";
import AllGraphs from "./components/home/graph";

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState<CalcsInterface>();
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_CALCS_REQ);
    console.log(response);
    if (response.done) {
      setData(response.data);
    } else {
      router.replace("/log-in");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex flex-col gap-[40px] px-mainxs mt-[10px] mb-1">
      <GeneralInfo data={data as CalcsInterface} />
      <AllGraphs />
    </div>
  );
}
