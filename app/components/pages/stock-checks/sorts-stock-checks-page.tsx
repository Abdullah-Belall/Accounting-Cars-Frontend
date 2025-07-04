"use client";
import { useEffect } from "react";
import {
  CLIENT_COLLECTOR_REQ,
  CREATE_STOCK_CHECKS_REQ,
  GET_ALL_SORTS_REQ,
} from "@/app/utils/requests/client-side.requests";
import { SortInterface } from "@/app/utils/types/interfaces";
import { useRouter } from "next/navigation";
import { useSearch } from "@/app/utils/contexts/search-results-contexts";
import SortsStockChecksTable from "../../tables/sorts-stock-checks-table";
import { Button } from "@mui/material";
import { useStockChecks } from "@/app/utils/contexts/stock-checks-contexts";
import { usePopup } from "@/app/utils/contexts/popup-contexts";

export default function SortsStockChecksPage() {
  const router = useRouter();
  const { findAll } = useStockChecks();
  const { getSearch, fillSearch } = useSearch();
  const { openPopup } = usePopup();

  const fetchData = async () => {
    const response: { done: boolean; data: { sorts: SortInterface[] } } =
      await CLIENT_COLLECTOR_REQ(GET_ALL_SORTS_REQ);

    if (response.done) {
      fillSearch("stockChecksSorts", {
        results: response.data.sorts,
        total: response.data.sorts.length,
      });
    } else {
      router.replace("/log-in");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const data = getSearch("stockChecksSorts");
  const handleDone = async () => {
    const sorts = findAll();
    if (sorts.length === 0) {
      openPopup("snakeBarPopup", { message: "لا يوجد أصناف في الجرد." });
      return;
    }
    const response = await CLIENT_COLLECTOR_REQ(CREATE_STOCK_CHECKS_REQ, { data: sorts });
    if (response.done) {
      openPopup("snakeBarPopup", { message: "تم انشاء الجرد بنجاح.", type: "success" });
      router.push("/stock-checks");
    } else {
      openPopup("snakeBarPopup", { message: response?.message });
    }
  };
  return (
    <>
      <div className="px-mainxs relative">
        <SortsStockChecksTable data={data?.results} />
        <Button
          onClick={handleDone}
          sx={{ fontFamily: "cairo" }}
          className="!bg-mdDark !absolute !left-[12px] !top-0"
          variant="contained"
        >
          تأكيد الجرد
        </Button>
      </div>
    </>
  );
}
