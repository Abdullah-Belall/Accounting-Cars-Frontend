"use client";
import { PhoneInterface } from "@/app/utils/types/interfaces";
import MainTable from "./main-table";
import PhonesTabelRow from "../users/phones-table-rows";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import BlackLayer from "../common/black-layer";
import PopupHolder from "../common/popup-holder";
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
  const headers = ["العمليات", "تاريخ الاضافة", "ملاحظات", "رقم الهاتف", "*"];
  if (type === "الموظف") {
    headers.splice(0, 2);
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
    console.log(response);
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
        {data?.length === 0 && <NoData />}
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
          <BlackLayer onClick={closeEditPhonePopUp} />
          <PopupHolder>
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
          </PopupHolder>
        </>
      )}
      {popupState.deleteAlertPopup.isOpen && (
        <>
          <BlackLayer onClick={() => closePopup("deleteAlertPopup")} />
          <PopupHolder>
            <DeleteAlert
              action={"حذف"}
              name={`الهاتف رقم ${popupState.deleteAlertPopup.data.index}`}
              onConfirm={handleConfirmDelete}
            />
          </PopupHolder>
        </>
      )}
      {openAddPhonePopup && (
        <>
          <BlackLayer onClick={() => setOpenAddPhonePopup(false)} />
          <PopupHolder>
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
          </PopupHolder>
        </>
      )}
    </>
  );
}
