"use client";
import BlackLayer from "@/app/components/common/black-layer";
import PopupHolder from "@/app/components/common/popup-holder";
import DeleteAlert from "@/app/components/forms & alerts/delete-alert";
import PhonesTable from "@/app/components/tables/phones.table";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import {
  BAN_USER_REQ,
  CLIENT_COLLECTOR_REQ,
  GET_WORKERS_PROFILE_REQ,
} from "@/app/utils/requests/client-side.requests";
import { PhoneInterface, WorkersInterface } from "@/app/utils/types/interfaces";
import { Button, Chip } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Worker() {
  const router = useRouter();
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const id = params.id;
  const [data, setData] = useState<WorkersInterface | undefined>();
  const { openPopup } = usePopup();
  const openSnakeBar = (message: string) => {
    openPopup("snakeBarPopup", { message });
  };
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_WORKERS_PROFILE_REQ, { id });
    if (response.done) {
      setData(response.data);
    } else {
      router.replace("/log-in");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleBanConfirm = async () => {
    if (loading) return;
    setLoading(true);
    const response = await CLIENT_COLLECTOR_REQ(BAN_USER_REQ, { id, banned_reason: "he is gay." });
    setLoading(false);
    if (response.done) {
      openPopup("snakeBarPopup", { message: "تم حظر الموظف بنجاح.", type: "success" });
      setDeleteAlert(false);
      fetchData();
    } else {
      openSnakeBar(response.message);
    }
  };
  const endRole = data?.role === "admin" ? "موظف" : data?.role === "owner" ? "مالك" : "المراقب";
  return (
    <>
      <div dir="rtl" className="flex flex-col px-mainxs gap-mainxs w-fit mx-auto">
        <div
          dir="rtl"
          className="w-[600px] bg-myHover border border-mdLight text-white rounded-lg p-6 shadow-lg"
        >
          <h2 className="text-lg font-semibold mb-4 text-myDark"> المعلومات الشخصية للموظف</h2>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-16 w-16 bg-myDark rounded-md flex items-center justify-center text-sm text-gray-300">
                صورة
              </div>
              <div>
                <h3 className="text-xl font-bold text-myDark">{data?.user_name}</h3>
                <p className=" text-mdDark">{endRole}</p>
              </div>
            </div>

            {data?.is_banned && (
              <Chip label="محظور" style={{ fontFamily: "cairo" }} className={"!text-red-600"} />
            )}
          </div>
          {/* display none if this is owner or the person is admin */}
          {!data?.is_banned && (
            <Button
              sx={{ fontFamily: "cairo" }}
              onClick={() => setDeleteAlert(true)}
              className="!bg-red-700"
              variant="contained"
            >
              حظر الموظف
            </Button>
          )}
        </div>
        <div className="w-full mt-5">
          <PhonesTable
            type={"الموظف"}
            data={data?.contacts as PhoneInterface[]}
            userId={id as string}
            refetch={fetchData}
          />
        </div>
      </div>
      {deleteAlert && (
        <>
          <BlackLayer onClick={() => setDeleteAlert(false)} />
          <PopupHolder>
            <DeleteAlert name="هذا الموظف" action="حظر" onConfirm={handleBanConfirm} />
          </PopupHolder>
        </>
      )}
    </>
  );
}
