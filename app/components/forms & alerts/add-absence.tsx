"use client";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { sameTextField } from "@/app/utils/base";
import MyLoading from "../common/loading";

export default function AddAbsenceForm({
  onDone,
  isForEdit,
  title,
}: {
  onDone: (data: any) => void;
  isForEdit?: { reason: string | null; id: string };
  title: string;
}) {
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState(isForEdit?.reason || "");

  const handleDone = async () => {
    if (loading) return;
    setLoading(true);
    onDone({ data: { reason: reason && reason !== "" ? reason : undefined } });
    setLoading(false);
  };
  return (
    <div className="mx-mainxs rounded-md shadow-md w-full min-[400px]:w-[384px] bg-myLight p-mainxl">
      <h2 className="text-lg text-center font-semibold mb-4">{title}</h2>
      <div className="space-y-4 flex flex-col gap-[15px]">
        <TextField
          id="Glu"
          dir="rtl"
          label="سبب الغياب"
          variant="filled"
          className="w-full"
          sx={sameTextField}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <Button
          onClick={handleDone}
          sx={{ fontFamily: "cairo" }}
          className="!bg-mdDark"
          variant="contained"
        >
          {loading ? <MyLoading /> : "تأكيد"}
        </Button>
      </div>
    </div>
  );
}
