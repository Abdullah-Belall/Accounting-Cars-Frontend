"use client";
import { useEffect, useState } from "react";
import {
  CLIENT_COLLECTOR_REQ,
  GET_ONE_SUPPLIER_REQ,
} from "@/app/utils/requests/client-side.requests";
import CostsTable from "@/app/components/tables/costs-table";

export default function SupplierBillsPage({ id }: { id: string }) {
  const [data, setData] = useState<any>();
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_ONE_SUPPLIER_REQ, { id });

    if (response.done) {
      setData(response.data);
    } else {
      // router.replace("/log-in");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="px-mainxs relative">
        <CostsTable
          data={data?.bills}
          title={`فواتير التكاليف التابعة للمورد ${data?.user_name}`}
        />
      </div>
    </>
  );
}
