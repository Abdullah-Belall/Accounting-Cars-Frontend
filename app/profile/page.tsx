"use client";
import ChangePassword from "../components/forms & alerts/change-password";
import { getSlug, rolesArray } from "../utils/base";
import { useUser } from "../utils/contexts/UserContext";
import { CLIENT_COLLECTOR_REQ, INITIAL_DATA_REQ } from "../utils/requests/client-side.requests";

export default function Profile() {
  const { user } = useUser();

  const PushInailData = async () => {
    await CLIENT_COLLECTOR_REQ(INITIAL_DATA_REQ);
  };
  return (
    <>
      <div dir="rtl" className="flex flex-col px-mainxs gap-mainxs w-full sm:max-w-[600px] mx-auto">
        <div
          dir="rtl"
          className="w-full bg-myHover border border-mdLight text-white rounded-lg p-6 shadow-lg"
        >
          <h2 className="text-lg font-semibold mb-4 text-myDark">المعلومات الشخصية</h2>
          <div className="flex items-center space-x-4 mb-6">
            <div className="h-16 w-16 bg-myDark rounded-md flex items-center justify-center text-sm text-gray-300">
              صورة
            </div>
            <div>
              <h3 className="text-xl font-bold text-myDark">{user?.user_name}</h3>
              <p className=" text-mdDark">{getSlug(rolesArray, user?.role as string)}</p>
            </div>
          </div>
          <ChangePassword />
        </div>
      </div>
    </>
  );
}
