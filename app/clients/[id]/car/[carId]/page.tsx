"use client";
import OrdersTable from "@/app/components/tables/orders-table";
import {
  CLIENT_COLLECTOR_REQ,
  GET_CAR_ORDERS_REQ,
} from "@/app/utils/requests/client-side.requests";
import { OrderInterface } from "@/app/utils/types/interfaces";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CarsOrders() {
  const param = useParams();
  const searchParams = useSearchParams();
  const carId = param?.carId;
  const [data, setData] = useState<OrderInterface[]>();
  const router = useRouter();
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_CAR_ORDERS_REQ, { id: carId });
    if (response.done) {
      setData(response.data.orders);
    } else {
      router.replace(`/log-in`);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="mx-mainxs">
      <OrdersTable
        title={`فواتير ${searchParams.get("client")} لسيارة ${searchParams.get("car")}`}
        data={data as OrderInterface[]}
        refetch={fetchData}
      />
    </div>
  );
}
