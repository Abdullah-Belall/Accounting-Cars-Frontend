"use client";
import AddUserForm from "@/app/components/forms & alerts/add-user-form";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { useRouter } from "next/navigation";

export default function AddClient() {
  const router = useRouter();
  const { openPopup } = usePopup();
  const handleOnDone = () => {
    openPopup("snakeBarPopup", { message: "تم اضافة عميل بنجاح.", type: "success" });
    router.push("/clients");
  };
  return (
    <div className="flex justify-center items-center w-full h-[calc(100dvh-80px)]">
      <AddUserForm type="client" title={"اضافة عميل جديد"} onDone={handleOnDone} />
    </div>
  );
}
