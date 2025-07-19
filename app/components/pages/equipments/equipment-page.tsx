"use client";
import {
  ADD_EQUIPMENT_REQ,
  CLIENT_COLLECTOR_REQ,
  GET_ALL_EQUIPMENTS_REQ,
} from "@/app/utils/requests/client-side.requests";
import EquipmentsTable from "../../tables/equipments-table";
import { useEffect, useState } from "react";
import { EquipmentInterface } from "@/app/utils/types/interfaces";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import BlackLayer from "../../common/black-layer";
import AddEquipment from "../../forms & alerts/add-equipments-form";
import { usePopup } from "@/app/utils/contexts/popup-contexts";

export default function EquipmentsPage() {
  const router = useRouter();
  const [data, setData] = useState<EquipmentInterface[]>([]);
  const [addEquipment, setAddEquipment] = useState(false);
  const { openPopup } = usePopup();

  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_ALL_EQUIPMENTS_REQ);
    if (response.done) {
      setData(response.data.equipments);
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
        <EquipmentsTable title={"كل المعدات"} data={data} />
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
