"use client";
import AdvanceBillsPopUp from "@/app/components/advances/advance-bills-popup";
import BlackLayer from "@/app/components/common/black-layer";
import AddAdvanceForm from "@/app/components/forms & alerts/add-advance";
import DeleteAlert from "@/app/components/forms & alerts/delete-alert";
import UpdateWorkerForm from "@/app/components/forms & alerts/update-worker";
import AdvanceTable from "@/app/components/tables/advance-table";
import PhonesTable from "@/app/components/tables/phones.table";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import {
  BAN_USER_REQ,
  CLIENT_COLLECTOR_REQ,
  GET_WORKERS_PROFILE_REQ,
  MAKE_WORKER_ADVANCE_REQ,
  UPDATE_WORKER_ADVANCE_REQ,
} from "@/app/utils/requests/client-side.requests";
import { AdvanceInterface, PhoneInterface, WorkersInterface } from "@/app/utils/types/interfaces";
import { Button, Chip } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Worker() {
  const router = useRouter();
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addAdvance, setAddAdvance] = useState(false);
  const params = useParams();
  const id = params.id;
  const [data, setData] = useState<WorkersInterface | undefined>();
  const { openPopup, popupState, closePopup } = usePopup();
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
    const response = await CLIENT_COLLECTOR_REQ(BAN_USER_REQ, {
      id,
      banned_reason: "he such an asshole.",
    });
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
      <div className="flex flex-col px-mainxs gap-mainxs w-full mx-auto">
        <div className="w-full max-w-[600px] mx-auto bg-myHover border border-mdLight text-white rounded-lg p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-myDark"> المعلومات الشخصية للموظف</h2>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-16 w-16 bg-myDark rounded-md flex items-center justify-center text-sm text-gray-300">
                صورة
              </div>
              <div>
                <h3 className="text-xl font-bold text-myDark">{data?.user_name}</h3>
                <p className=" text-mdDark">
                  <span className="font-semibold">الدور:</span> {endRole}
                </p>
                <p className=" text-mdDark">
                  <span className="font-semibold">الراتب:</span>{" "}
                  {data?.salary ? `ج.م ${data?.salary}` : "غير محدد"}
                </p>
              </div>
            </div>

            {data?.is_banned && (
              <Chip label="محظور" style={{ fontFamily: "cairo" }} className={"!text-red-600"} />
            )}
          </div>
          {!data?.is_banned && data?.role !== "owner" && (
            <div className="w-full flex justify-end flex items-center gap-1">
              <Button
                onClick={() => setUpdate(true)}
                sx={{ fontFamily: "cairo" }}
                className="!bg-mdDark"
                variant="contained"
              >
                تعديل
              </Button>
              <Button
                sx={{ fontFamily: "cairo" }}
                onClick={() => setDeleteAlert(true)}
                className="!bg-red-700"
                variant="contained"
              >
                حظر
              </Button>
            </div>
          )}
        </div>
        <div className="relative w-full max-w-[600px] mx-auto mt-5">
          <AdvanceTable title="السلف" data={data?.advances as AdvanceInterface[]} />
          <Button
            onClick={() => setAddAdvance(true)}
            sx={{ fontFamily: "cairo" }}
            className="!bg-mdDark !absolute !left-[3px] !top-0"
            variant="contained"
          >
            سلفة جديدة
          </Button>
        </div>
        <div className="w-full max-w-[600px] mx-auto mt-5">
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
          <BlackLayer onClick={() => setDeleteAlert(false)}>
            <DeleteAlert name="هذا الموظف" action="حظر" onConfirm={handleBanConfirm} />
          </BlackLayer>
        </>
      )}
      {update && (
        <>
          <BlackLayer onClick={() => setUpdate(false)}>
            <UpdateWorkerForm
              id={data?.id as string}
              onDone={() => {
                fetchData();
                setUpdate(false);
              }}
              data={{ role: data?.role as string, salary: data?.salary as number }}
            />
          </BlackLayer>
        </>
      )}
      {addAdvance && (
        <BlackLayer onClick={() => setAddAdvance(false)}>
          <AddAdvanceForm
            onDone={async (data) => {
              const response = await CLIENT_COLLECTOR_REQ(MAKE_WORKER_ADVANCE_REQ, {
                ...data,
                id,
              });
              if (response.done) {
                openPopup("snakeBarPopup", {
                  message: "تم تسجيل سلفة جديدة بنجاح.",
                  type: "success",
                });
                fetchData();
                setAddAdvance(false);
              } else {
                openPopup("snakeBarPopup", { message: response.message });
              }
            }}
          />
        </BlackLayer>
      )}
      {popupState.advanceForm.isOpen && (
        <BlackLayer onClick={() => setAddAdvance(false)}>
          <AddAdvanceForm
            isForEdit={popupState.advanceForm.data}
            onDone={async (data) => {
              const response = await CLIENT_COLLECTOR_REQ(UPDATE_WORKER_ADVANCE_REQ, data);
              if (response.done) {
                openPopup("snakeBarPopup", {
                  message: "تم تعديل السلفة بنجاح.",
                  type: "success",
                });
                fetchData();
                setAddAdvance(false);
                closePopup("advanceForm");
              } else {
                openPopup("snakeBarPopup", { message: response.message });
              }
            }}
          />
        </BlackLayer>
      )}
      {popupState.payAdvance.isOpen && (
        <BlackLayer onClick={() => closePopup("payAdvance")}>
          <AdvanceBillsPopUp />
        </BlackLayer>
      )}
    </>
  );
}
