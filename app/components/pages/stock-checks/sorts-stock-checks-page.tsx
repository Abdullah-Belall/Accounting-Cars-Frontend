"use client";
import { useEffect, useState } from "react";
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
import MyLoading from "../../common/loading";

export default function SortsStockChecksPage() {
  const router = useRouter();
  const { findAll, clear } = useStockChecks();
  const [loading, setLoading] = useState(false);
  const { getSearch, fillSearch } = useSearch();
  const { openPopup } = usePopup();

  const fetchData = async () => {
    const response: { done: boolean; data: { sorts: SortInterface[] } } =
      await CLIENT_COLLECTOR_REQ(GET_ALL_SORTS_REQ);

    if (response.done) {
      fillSearch("sorts", {
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
  const data = getSearch("sorts");
  const handleDone = async () => {
    if (loading) return;
    const sorts = findAll();
    if (sorts.length === 0) {
      openPopup("snakeBarPopup", { message: "لا يوجد أصناف في الجرد." });
      return;
    }
    setLoading(true);
    const response = await CLIENT_COLLECTOR_REQ(CREATE_STOCK_CHECKS_REQ, {
      data: sorts,
      type: "sorts",
    });
    if (response.done) {
      openPopup("snakeBarPopup", { message: "تم انشاء الجرد بنجاح.", type: "success" });
      router.push("/stock-checks");
    } else {
      openPopup("snakeBarPopup", { message: response?.message });
    }
    clear();
    setLoading(false);
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
          {loading ? <MyLoading /> : "تأكيد الجرد"}
        </Button>
      </div>
    </>
  );
}
