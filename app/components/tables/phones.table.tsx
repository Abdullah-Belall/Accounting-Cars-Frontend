"use client";
import { PhoneInterface } from "@/app/utils/types/interfaces";
import MainTable from "./main-table";
import PhonesTabelRow from "../users/phones-table-rows";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import BlackLayer from "../common/black-layer";
import AddPhoneForm from "../forms & alerts/add-phone";
import DeleteAlert from "../forms & alerts/delete-alert";
import {
  CLIENT_COLLECTOR_REQ,
  DELETE_CONTACT_REQ,
} from "@/app/utils/requests/client-side.requests";
import { useState } from "react";
import { Button } from "@mui/material";
import NoData from "../common/no-data";

export default function PhonesTable({
  type,
  data,
  userId,
  refetch,
}: {
  type: "العميل" | "الموظف";
  data: PhoneInterface[];
  userId: string;
  refetch: any;
}) {
  const { popupState, closePopup, openPopup } = usePopup();
  const [loading, setLoading] = useState(false);
  const [openAddPhonePopup, setOpenAddPhonePopup] = useState(false);
  const openSnakeBar = (message: string) => {
    openPopup("snakeBarPopup", { message });
  };
  const headers = ["#", "رقم الهاتف", "ملاحظات", "تاريخ الاضافة", "العمليات"];
  if (type === "الموظف") {
    headers.splice(4, 1);
  }
  const closeEditPhonePopUp = () => {
    closePopup("editPhonePopup");
  };
  const handleConfirmDelete = async () => {
    if (loading) return;
    setLoading(true);
    const response = await CLIENT_COLLECTOR_REQ(DELETE_CONTACT_REQ, {
      id: popupState.deleteAlertPopup.data.id,
      type: type === "العميل" ? "client" : "worker",
    });
    setLoading(false);

    if (response.done) {
      openPopup("snakeBarPopup", { message: "تم حذف رقم الهاتف بنجاح.", type: "success" });
      closePopup("deleteAlertPopup");
      refetch();
    } else {
      openSnakeBar(response.message);
    }
  };
  return (
    <>
      <section className="relative">
        <MainTable title={`ارقام هاتف ${type}`} headers={headers}>
          {data?.map((row, index) => (
            <PhonesTabelRow key={index} type={type} data={{ ...row, index: index + 1 }} />
          ))}
        </MainTable>
        {(!data || data?.length === 0) && <NoData />}
        {type === "العميل" && (
          <div className="!absolute left-[5px] top-[-5px] flex gap-2 items-center">
            <Button
              onClick={() => setOpenAddPhonePopup(true)}
              sx={{ fontFamily: "cairo" }}
              className="bg-mdDark!"
              variant="contained"
            >
              اضافة رقم هاتف جديد
            </Button>
          </div>
        )}
      </section>
      {popupState.editPhonePopup.isOpen && (
        <>
          <BlackLayer onClick={closeEditPhonePopUp}>
            <AddPhoneForm
              user_id={userId}
              onDone={() => {
                openPopup("snakeBarPopup", {
                  message: "تم تعديل رقم هاتف العميل بنجاح.",
                  type: "success",
                });
                refetch();
                closeEditPhonePopUp();
              }}
              type={type === "العميل" ? "client" : "worker"}
              isForEdit={{
                phone: popupState.editPhonePopup.data?.phone,
                note: popupState.editPhonePopup.data?.note,
                id: popupState.editPhonePopup.data?.id,
              }}
            />
          </BlackLayer>
        </>
      )}
      {popupState.deleteAlertPopup.isOpen && (
        <>
          <BlackLayer onClick={() => closePopup("deleteAlertPopup")}>
            <DeleteAlert
              action={"حذف"}
              name={`الهاتف رقم ${popupState.deleteAlertPopup.data.index}`}
              onConfirm={handleConfirmDelete}
            />
          </BlackLayer>
        </>
      )}
      {openAddPhonePopup && (
        <>
          <BlackLayer onClick={() => setOpenAddPhonePopup(false)}>
            <AddPhoneForm
              user_id={userId}
              onDone={() => {
                openPopup("snakeBarPopup", {
                  message: "تم اضافة رقم هاتف جديد بنجاح.",
                  type: "success",
                });
                refetch();
                setOpenAddPhonePopup(false);
              }}
              type={type === "العميل" ? "client" : "worker"}
            />
          </BlackLayer>
        </>
      )}
    </>
  );
}
