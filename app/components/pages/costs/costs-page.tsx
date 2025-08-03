"use client";
import { useEffect } from "react";
import { CLIENT_COLLECTOR_REQ, GET_ALL_COSTS_REQ } from "@/app/utils/requests/client-side.requests";
import { useRouter } from "next/navigation";
import CostsTable from "@/app/components/tables/costs-table";
import { useSearch } from "@/app/utils/contexts/search-results-contexts";
import { Button } from "@mui/material";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { useBills } from "@/app/utils/contexts/bills-contexts";
import { getSlug, methodsArray, paidStatusArray } from "@/app/utils/base";

export default function CostsPage() {
  const router = useRouter();
  const { fillSearch, getSearch } = useSearch();
  const { popupState, closePopup } = usePopup();
  const delv: any[] = popupState.costsCollector.data?.checked;
  const { setBills } = useBills();

  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_ALL_COSTS_REQ);

    if (response.done) {
      fillSearch("costs", { results: response.data?.costs, total: response.data?.total });
    } else {
      router.replace("/log-in");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const data = getSearch("costs").results;
  const onPrint = () => {
    const sortsData = delv?.map((item: any, index: number) => ({
      color: item?.sort?.color,
      index: index + 1,
      id: item?.short_id,
      name: item?.sort?.name,
      size: item?.sort?.size,
      qty: item?.qty,
      unit_price: item?.unit_price,
      product: {
        name: item?.sort?.product?.name,
        id: item?.sort?.product?.id,
        material: item?.sort?.product?.material,
      },
    }));
    setBills({
      type: "cost",
      bill_id: data?.short_id,
      car: data?.car,
      data: sortsData,
      totals: {
        totalPrice: delv?.reduce((acc, item) => acc + item?.unit_price * item.qty, 0),
        tax: data?.tax + "%",
        additional_fees: data?.additional_fees,
        client_balance: data?.car?.client?.balance,
        take_from_client_balance: data?.payment?.client_balance,
        discount: data?.discount,
        down_payment: data?.payment?.down_payment,
        paid_status: getSlug(paidStatusArray, data?.payment?.status),
        payment_method: getSlug(methodsArray, data?.payment?.payment_method),
        created_at: data?.created_at,
        client_depts: data?.client_depts,
      },
    });
    closePopup("costsCollector");
    const billPath = window.localStorage.getItem("bill_path");
    router.push(billPath ?? "/bill");
  };
  return (
    <>
      <div className="px-mainxs relative">
        {delv && delv.length > 0 && (
          <Button
            onClick={onPrint}
            sx={{ fontFamily: "cairo" }}
            className="!bg-mdDark !absolute !left-[12px] !top-0 z-2"
            variant="contained"
          >
            طباعة الفواتير
          </Button>
        )}
        <CostsTable data={data} title="فواتير التكاليف" />
      </div>
    </>
  );
}
