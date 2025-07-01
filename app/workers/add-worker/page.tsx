"use client";
import AddUserForm from "@/app/components/forms & alerts/add-user-form";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { useRouter } from "next/navigation";

export default function AddWorker() {
  const { openPopup } = usePopup();
  const router = useRouter();
  const handleOnDone = () => {
    openPopup("snakeBarPopup", { message: "تم اضافة موظف جديد بنجاح.", type: "success" });
    router.push("/workers");
  };
  return (
    <div className="flex justify-center items-center w-full h-[calc(100dvh-80px)]">
      <AddUserForm type="worker" title={"اضافة موظف جديد"} onDone={handleOnDone} />
    </div>
  );
}
