"use client";
import ChangePassword from "../components/forms & alerts/change-password";
import { useUser } from "../utils/contexts/UserContext";
import { CLIENT_COLLECTOR_REQ, INITIAL_DATA_REQ } from "../utils/requests/client-side.requests";

export default function Profile() {
  const { user } = useUser();

  const endRole = user?.role === "admin" ? "موظف" : user?.role === "owner" ? "مالك" : "ست الحبايب";
  const PushInailData = async () => {
    await CLIENT_COLLECTOR_REQ(INITIAL_DATA_REQ);
  };
  return (
    <>
      <div dir="rtl" className="flex flex-col px-mainxs gap-mainxs w-fit mx-auto">
        <div
          dir="rtl"
          className="w-[600px] bg-myHover border border-mdLight text-white rounded-lg p-6 shadow-lg"
        >
          <h2 onClick={PushInailData} className="text-lg font-semibold mb-4 text-myDark">
            المعلومات الشخصية
          </h2>
          <div className="flex items-center space-x-4 mb-6">
            <div className="h-16 w-16 bg-myDark rounded-md flex items-center justify-center text-sm text-gray-300">
              صورة
            </div>
            <div>
              <h3 className="text-xl font-bold text-myDark">{user?.user_name}</h3>
              <p className=" text-mdDark">{endRole}</p>
            </div>
          </div>
          <ChangePassword />
        </div>
      </div>
    </>
  );
}
