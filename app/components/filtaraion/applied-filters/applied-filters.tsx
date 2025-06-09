"use client";
import { Chip } from "@mui/material";

export default function AppliedFilters() {
  return (
    <div
      dir="rtl"
      className="w-fit py-1 bg-myHover border border-foreground flex items-center gap-4 rounded-lg px-5"
    >
      <h1 className="font-semibold">التصفيات | </h1>
      <ul dir="rtl" className="flex flex-wrap gap-2">
        <Chip
          className="!flex !flex-row-reverse !text-xs"
          style={{ fontFamily: "cairo" }}
          label="تصاعدي"
          onClick={() => ""}
          onDelete={() => ""}
        />
      </ul>
    </div>
  );
}
