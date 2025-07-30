"use client";
import {
  CLIENT_COLLECTOR_REQ,
  CREATE_STOCK_CHECKS_REQ,
  GET_ALL_EQUIPMENTS_REQ,
} from "@/app/utils/requests/client-side.requests";
import EquipmentsTable from "../../tables/equipments-table";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { useStockChecks } from "@/app/utils/contexts/stock-checks-contexts";
import { useSearch } from "@/app/utils/contexts/search-results-contexts";
import MyLoading from "../../common/loading";

export default function EquipmentsStockChecksPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { openPopup } = usePopup();
  const { findAll } = useStockChecks();
  const { fillSearch, getSearch } = useSearch();
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_ALL_EQUIPMENTS_REQ);
    if (response.done) {
      fillSearch("equipments", { results: response.data.equipments, total: response.data.total });
    } else {
      router.replace("log-in");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
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
      type: "equipments",
    });
    if (response.done) {
      openPopup("snakeBarPopup", { message: "تم انشاء الجرد بنجاح.", type: "success" });
      router.push("/stock-checks");
    } else {
      openPopup("snakeBarPopup", { message: response?.message });
    }
    setLoading(false);
  };
  return (
    <>
      <div className="relative px-mainxs">
        <Button
          onClick={handleDone}
          sx={{ fontFamily: "cairo" }}
          className="!bg-mdDark !absolute !left-[12px] !top-0 z-[3]"
          variant="contained"
        >
          {loading ? <MyLoading /> : "تأكيد الجرد"}
        </Button>
        <EquipmentsTable
          title={"كل المعدات"}
          data={getSearch("equipments").results}
          stockChecks={true}
        />
      </div>
    </>
  );
}
