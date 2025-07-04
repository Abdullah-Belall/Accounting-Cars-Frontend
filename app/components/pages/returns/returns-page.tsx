"use client";
import { useEffect } from "react";
import {
  CLIENT_COLLECTOR_REQ,
  GET_ALL_RETURNS_REQ,
} from "@/app/utils/requests/client-side.requests";
import { useRouter } from "next/navigation";
import ReturnsTable from "@/app/components/tables/returns-table";
import { useSearch } from "@/app/utils/contexts/search-results-contexts";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import BlackLayer from "../../common/black-layer";
import ReturnsItemsPopup from "../../orders/returns-items-popup";

export default function ReturnsPage() {
  const router = useRouter();
  const { fillSearch, getSearch } = useSearch();
  const { popupState, closePopup } = usePopup();
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_ALL_RETURNS_REQ);

    if (response.done) {
      fillSearch("returns", { results: response.data?.returns_items, total: response.data?.total });
    } else {
      router.replace("/log-in");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="px-mainxs relative">
        <ReturnsTable
          isMainTable={true}
          title={"فواتير المرتجعات"}
          data={getSearch("returns").results}
        />
      </div>
      {popupState?.returnsItemsPopup.isOpen && (
        <>
          <BlackLayer onClick={() => closePopup("returnsItemsPopup")}>
            <ReturnsItemsPopup returnId={popupState.returnsItemsPopup.data?.returnId} />
          </BlackLayer>
        </>
      )}
    </>
  );
}
