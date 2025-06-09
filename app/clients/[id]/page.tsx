"use client";
import BlackLayer from "@/app/components/common/black-layer";
import PopupHolder from "@/app/components/common/popup-holder";
import AddUserForm from "@/app/components/forms & alerts/add-user-form";
import OrdersTable from "@/app/components/tables/orders-table";
import PhonesTable from "@/app/components/tables/phones.table";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import {
  CLIENT_COLLECTOR_REQ,
  GET_CLIENT_PROFILE_REQ,
} from "@/app/utils/requests/client-side.requests";
import { ClientInterface, OrderInterface, PhoneInterface } from "@/app/utils/types/interfaces";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";

export default function Client() {
  const router = useRouter();
  const params = useParams();
  const { openPopup } = usePopup();
  const id = params.id;
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState<ClientInterface>();
  const handleClose = () => {
    setEdit(false);
  };
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_CLIENT_PROFILE_REQ, { id });
    console.log(response);
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
      <div className="flex flex-col items-center px-mainxs gap-mainxs w-full ml-auto !gap-[40px]">
        <div
          dir="rtl"
          className="flex flex-col w-[50%] bg-myHover border border-mdLight text-white rounded-lg p-6 shadow-lg"
        >
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
            </div>
            <CiEdit
              onClick={() => setEdit(true)}
              className="absolute left-0 top-[50%] translate-y-[-50%] text-[25px] text-mdDark hover:text-orange-700 cursor-pointer"
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
        <div className="w-full">
          <OrdersTable
            refetch={fetchData}
            data={data?.orders as OrderInterface[]}
            tableFor="client"
            title="الطلبات المسجلة للعميل"
          />
        </div>
      </div>
      {edit && (
        <>
          <BlackLayer onClick={handleClose} />
          <PopupHolder>
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
          </PopupHolder>
        </>
      )}
    </>
  );
}
