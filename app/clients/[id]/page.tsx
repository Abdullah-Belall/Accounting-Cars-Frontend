"use client";
import BlackLayer from "@/app/components/common/black-layer";
import AddCarForm from "@/app/components/forms & alerts/add-car-form";
import AddUserForm from "@/app/components/forms & alerts/add-user-form";
import DeleteAlert from "@/app/components/forms & alerts/delete-alert";
import CarsTable from "@/app/components/tables/cars-table";
import PhonesTable from "@/app/components/tables/phones.table";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import {
  ADD_CAR_REQ,
  CLIENT_COLLECTOR_REQ,
  DELETE_CAR_REQ,
  EDIT_CAR_REQ,
  GET_CLIENT_PROFILE_REQ,
} from "@/app/utils/requests/client-side.requests";
import { CarsInterface, ClientInterface, PhoneInterface } from "@/app/utils/types/interfaces";
import { Button } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";

export default function Client() {
  const router = useRouter();
  const params = useParams();
  const { openPopup, popupState, closePopup } = usePopup();
  const id = params.id;
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState<ClientInterface>();
  const [addCar, setAddCar] = useState(false);

  const handleClose = () => {
    setEdit(false);
  };
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_CLIENT_PROFILE_REQ, { id });
    if (response.done) {
      setData(response.data);
    } else {
      router.replace("/log-in");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const onDone = () => {
    openPopup("snakeBarPopup", { message: "تم تعديل بيانات العميل بنجاح.", type: "success" });
    handleClose();
    fetchData();
  };
  return (
    <>
      <div className="flex flex-col items-center px-mainxs gap-mainxs w-full ml-auto !gap-[40px] mb-mainxl">
        <div className="w-full max-w-[600px] flex flex-col bg-myHover border border-mdLight text-white rounded-lg p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-myDark">المعلومات الشخصية للعميل</h2>
          <div className="relative w-full flex items-center space-x-4 mb-6">
            <div className="h-16 w-16 bg-myDark rounded-md flex items-center justify-center text-sm text-gray-300">
              صورة
            </div>
            <div>
              <h3 className="text-xl font-bold text-myDark flex items-center gap-2">
                {data?.user_name}
              </h3>
              <p className="text-mdDark mt-2">
                الرقم الضريبي: {data?.tax_num && data?.tax_num !== "" ? data?.tax_num : "لا يوجد"}
              </p>
              {/* <p className="text-mdDark mt-2">اجمالي الديون: {allDepts} ج.م</p> */}
            </div>
            <CiEdit
              onClick={() => setEdit(true)}
              className="absolute left-0 top-[50%] translate-y-[-50%] text-[25px] text-mdDark hover:text-red-700 cursor-pointer"
            />
          </div>
        </div>
        <div className="w-full">
          <PhonesTable
            type={"العميل"}
            data={data?.contacts as PhoneInterface[]}
            userId={id as string}
            refetch={fetchData}
          />
        </div>
        <div className="w-full relative">
          <CarsTable data={data?.cars as CarsInterface[]} title="سيارات العميل" />
          <div className="!absolute left-[5px] top-[-5px] flex gap-2 items-center">
            <Button
              onClick={() => setAddCar(true)}
              sx={{ fontFamily: "cairo" }}
              className="bg-mdDark!"
              variant="contained"
            >
              اضافة سيارة جديدة
            </Button>
          </div>
        </div>
      </div>
      {edit && (
        <>
          <BlackLayer onClick={handleClose}>
            <AddUserForm
              type="client"
              title={"تعديل اسم العميل"}
              isForEdit={{
                id: data?.id as string,
                user_name: data?.user_name as string,
                tax_num: data?.tax_num as string,
              }}
              onDone={onDone}
            />
          </BlackLayer>
        </>
      )}
      {popupState.carForm.isOpen && (
        <BlackLayer onClick={() => closePopup("carForm")}>
          <AddCarForm
            onAdded={async (obj: any) => {
              const response = await CLIENT_COLLECTOR_REQ(EDIT_CAR_REQ, obj);
              if (response.done) {
                openPopup("snakeBarPopup", { message: "تم تعديل السيارة بنجاح.", type: "success" });
                closePopup("carForm");
                fetchData();
              } else {
                openPopup("snakeBarPopup", { message: response.message });
              }
            }}
            isForEdit={popupState.carForm.data}
            client_id={data?.id as string}
          />
        </BlackLayer>
      )}
      {addCar && (
        <BlackLayer onClick={() => setAddCar(false)}>
          <AddCarForm
            onAdded={async (obj: any) => {
              const response = await CLIENT_COLLECTOR_REQ(ADD_CAR_REQ, obj);
              if (response.done) {
                openPopup("snakeBarPopup", { message: "تم اضافة السيارة بنجاح.", type: "success" });
                setAddCar(false);
                fetchData();
              } else {
                openPopup("snakeBarPopup", { message: response.message });
              }
            }}
            client_id={data?.id as string}
          />
        </BlackLayer>
      )}
      {popupState.deleteAlertPopup.isOpen && (
        <BlackLayer onClick={() => closePopup("deleteAlertPopup")}>
          <DeleteAlert
            name={popupState.deleteAlertPopup.data?.mark}
            action="حذف"
            onConfirm={async () => {
              const response = await CLIENT_COLLECTOR_REQ(DELETE_CAR_REQ, {
                id: popupState.deleteAlertPopup.data?.id,
              });
              if (response.done) {
                openPopup("snakeBarPopup", { message: "تم حذف السيارة بنجاح.", type: "success" });
                closePopup("deleteAlertPopup");
                fetchData();
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
