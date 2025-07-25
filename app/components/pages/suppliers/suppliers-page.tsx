"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CLIENT_COLLECTOR_REQ,
  GET_ALL_SUPPLIERS_REQ,
} from "@/app/utils/requests/client-side.requests";
import SuppliersTable from "../../tables/suppliers-table";
import { Button } from "@mui/material";
import BlackLayer from "../../common/black-layer";
import AddSupplierForm from "../../forms & alerts/add-supplier-form";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { useSearch } from "@/app/utils/contexts/search-results-contexts";

export default function SuppliersPage() {
  const router = useRouter();
  const { openPopup } = usePopup();
  const [add, setAdd] = useState(false);
  const { fillSearch, getSearch } = useSearch();
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_ALL_SUPPLIERS_REQ);

    if (response.done) {
      fillSearch("suppliers", { results: response.data?.suppliers, total: response.data?.total });
    } else {
      router.replace("/log-in");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="relative px-mainxs">
        <SuppliersTable data={getSearch("suppliers").results} />
        <Button
          onClick={() => setAdd(true)}
          sx={{ fontFamily: "cairo" }}
          className="!bg-mdDark !absolute !left-[12px] !top-0"
          variant="contained"
        >
          اضافة مورد
        </Button>
      </div>
      {add && (
        <>
          <BlackLayer onClick={() => setAdd(false)}>
            <AddSupplierForm
              onSupplierAdded={() => {
                openPopup("snakeBarPopup", {
                  message: "تم اضافة مورد جديدة بنجاح.",
                  type: "success",
                });
                setAdd(false);
                fetchData();
              }}
            />
          </BlackLayer>
        </>
      )}
    </>
  );
}
