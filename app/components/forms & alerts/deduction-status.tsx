"use client";
import { Button } from "@mui/material";
import { useState } from "react";
import { deductionStatusArr, getSlug } from "../../utils/base";
import { DeductionStatusEnum } from "@/app/utils/types/interfaces";
import SelectList from "../common/select-list";
import styles from "@/app/styles/drop-down.module.css";

export default function DeductionStatusForm({
  onDone,
  title,
  curr_status,
}: {
  onDone: (data: any) => void;
  title: string;
  curr_status: DeductionStatusEnum;
}) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<DeductionStatusEnum | undefined>(curr_status);
  const [dropDown, setDropDown] = useState(false);

  const handleDone = async () => {
    if (loading) return;
    setLoading(true);
    onDone({ data: { status } });
    setLoading(false);
  };
  return (
    <div className="mx-mainxs rounded-md shadow-md w-full min-[400px]:w-[384px] bg-myLight p-mainxl">
      <h2 className="text-lg text-center font-semibold mb-4">{title}</h2>
      <div className="space-y-4 flex flex-col gap-[15px]">
        <SelectList
          placeHolder="الحالة"
          select={status !== undefined ? getSlug(deductionStatusArr, status) : "الحالة"}
          onClick={() => setDropDown(true)}
          onBlur={() => setDropDown(false)}
          dropDown={dropDown}
        >
          {dropDown && (
            <>
              <ul
                className={
                  styles.list +
                  " w-full max-h-[120px] overflow-y-scroll z-10 rounded-md absolute left-0 top-[calc(100%+6px)] bg-anotherLight px-mainxs"
                }
              >
                {deductionStatusArr.map((e) => (
                  <li
                    key={e.value}
                    onClick={() => {
                      setStatus(e.value);
                      setDropDown(false);
                    }}
                    className="p-mainxs text-center border-b border-myLight cursor-pointer"
                  >
                    {e.lable}
                  </li>
                ))}
              </ul>
            </>
          )}
        </SelectList>
        <Button
          onClick={handleDone}
          sx={{ fontFamily: "cairo" }}
          className="!bg-mdDark"
          variant="contained"
        >
          تأكيد
        </Button>
      </div>
    </div>
  );
}
