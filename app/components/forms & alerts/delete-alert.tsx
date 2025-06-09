"use client";
import { Button } from "@mui/material";

export default function DeleteAlert({
  name,
  action,
  onConfirm,
}: {
  name: string;
  action: string;
  onConfirm: any;
}) {
  return (
    <div className="rounded-md shadow-md min-w-[320px] bg-myLight p-mainxl">
      <h2 className="text-lg text-myDark text-center font-semibold mb-4">
        هل انت متأكد انك تريد {action} {name} ؟
      </h2>

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
