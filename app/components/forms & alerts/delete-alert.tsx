"use client";
import { Button } from "@mui/material";

export default function DeleteAlert({
  name,
  action,
  onConfirm,
  warning,
}: {
  name: string;
  action: string;
  onConfirm: () => void;
  warning?: string;
}) {
  return (
    <div className="rounded-md shadow-md w-full min-[316px]:w-[300px] mx-mainxs bg-myLight p-mainxl">
      <h2 className="text-lg text-myDark text-center font-semibold mb-2">
        هل انت متأكد انك تريد {action} {name} ؟
      </h2>

      <div className="mb-2 text-xs text-center">{warning ?? ""}</div>
      <div className="space-y-4 flex flex-col gap-[15px]">
        <Button
          onClick={onConfirm}
          sx={{ fontFamily: "cairo" }}
          className="!bg-red-700"
          variant="contained"
        >
          تأكيد
        </Button>
      </div>
    </div>
  );
}
