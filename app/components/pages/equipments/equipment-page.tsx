"use client";
import {
  ADD_EQUIPMENT_REQ,
  CLIENT_COLLECTOR_REQ,
  GET_ALL_EQUIPMENTS_REQ,
} from "@/app/utils/requests/client-side.requests";
import EquipmentsTable from "../../tables/equipments-table";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import BlackLayer from "../../common/black-layer";
import AddEquipment from "../../forms & alerts/add-equipments-form";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { useSearch } from "@/app/utils/contexts/search-results-contexts";

export default function EquipmentsPage() {
  const router = useRouter();
  const [addEquipment, setAddEquipment] = useState(false);
  const { openPopup } = usePopup();
  const { fillSearch, getSearch } = useSearch();
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_ALL_EQUIPMENTS_REQ);
    console.log(response);
    if (response.done) {
      fillSearch("equipments", { results: response.data.equipments, total: response.data.total });
    } else {
      router.replace("log-in");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="relative px-mainxs">
        <Button
          onClick={() => setAddEquipment(true)}
          sx={{ fontFamily: "cairo" }}
          className="!bg-mdDark !absolute !left-[12px] !top-0 z-[3]"
          variant="contained"
        >
          انشاء معدة
        </Button>
        <EquipmentsTable title={"كل المعدات"} data={getSearch("equipments").results} />
      </div>
      {addEquipment && (
        <BlackLayer onClick={() => setAddEquipment(false)}>
          <AddEquipment
            onDone={async (data: any) => {
              const response = await CLIENT_COLLECTOR_REQ(ADD_EQUIPMENT_REQ, data);
              if (response.done) {
                fetchData();
                openPopup("snakeBarPopup", {
                  message: "تم اضافة معدة جديدة بنجاح.",
                  type: "success",
                });
                setAddEquipment(false);
              } else {
                openPopup("snakeBarPopup", { message: response.message });
              }
            }}
          />
        </BlackLayer>
      )}
    </>
  );
}
