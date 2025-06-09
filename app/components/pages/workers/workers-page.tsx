"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CLIENT_COLLECTOR_REQ,
  GET_ALL_WORKERS_REQ,
} from "@/app/utils/requests/client-side.requests";
import UsersTable from "@/app/components/tables/users-table";
import { useSearch } from "@/app/utils/contexts/search-results-contexts";

export default function WorkersPage() {
  const router = useRouter();
  const { fillSearch, getSearch } = useSearch();
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_ALL_WORKERS_REQ);
    console.log(response);
    if (response.done) {
      fillSearch("workers", { results: response.data.workers, total: response.data.total });
    } else {
      router.replace("/log-in");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(getSearch("workers").results);
  return (
    <div className="px-mainxs">
      <UsersTable type={"worker"} data={getSearch("workers").results} />
    </div>
  );
}
