"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CLIENT_COLLECTOR_REQ,
  GET_ALL_CLIENTS_REQ,
} from "@/app/utils/requests/client-side.requests";
import UsersTable from "@/app/components/tables/users-table";
import { useSearch } from "@/app/utils/contexts/search-results-contexts";

export default function ClientsPage() {
  const router = useRouter();
  const { fillSearch, getSearch } = useSearch();
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_ALL_CLIENTS_REQ);
    if (response.done) {
      fillSearch("clients", { results: response.data?.clients, total: response.data?.total });
    } else {
      router.replace("/log-in");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="px-mainxs">
      <UsersTable type={"client"} data={getSearch("clients")?.results} />
    </div>
  );
}
