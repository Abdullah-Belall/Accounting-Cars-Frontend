import { sameTextField } from "@/app/utils/base";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import MyLoading from "../common/loading";

export default function AddEquipment({ onDone }: { onDone: (data: any) => Promise<void> }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    qty: "",
    unit_price: "",
  });
  const { openPopup } = usePopup();
  const handleData = (key: keyof typeof data, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };
  const vaildation = () => {
    const { name, qty, unit_price } = data;
    if (name.trim().length === 0) {
      openPopup("snakeBarPopup", { message: "يجب ادخال اسم للمعدة للمتابعة." });
      return false;
    } else if (qty && Number(qty) <= 0) {
      openPopup("snakeBarPopup", { message: "يجب ادخل كمية صحيحة للمتابعة" });
      return false;
    } else if (unit_price && Number(unit_price) <= 0) {
      openPopup("snakeBarPopup", { message: "يجب ادخل تكلفة وحدة صحيحة للمتابعة" });
      return false;
    }
    return true;
  };
  const handleDone = async () => {
    if (!vaildation()) return;
    setLoading(true);
    await onDone({
      ...data,
      qty: Number(data.qty),
      unit_price: Number(data.unit_price),
    });
    setLoading(false);
  };
  return (
    <div className="mx-mainxs rounded-md shadow-md w-full min-[400px]:w-[384px] bg-myLight p-mainxl">
      <h2 className="text-lg text-center font-semibold mb-4">اضافة معدة جديدة</h2>
      <div className="flex flex-col gap-2">
        <TextField
          id="Glu"
          dir="rtl"
          label="الاسم"
          variant="filled"
          className="w-full"
          sx={sameTextField}
          value={data.name}
          onChange={(e) => handleData("name", e.target.value)}
        />
        <div className="flex gap-2">
          <TextField
            id="Glu"
            dir="rtl"
            label="الكمية"
            variant="filled"
            className="w-full"
            sx={sameTextField}
            value={data.qty}
            onChange={(e) => handleData("qty", e.target.value)}
          />{" "}
          <TextField
            id="Glu"
            dir="rtl"
            label="تكلفة الوحدة"
            variant="filled"
            className="w-full"
            sx={sameTextField}
            value={data.unit_price}
            onChange={(e) => handleData("unit_price", e.target.value)}
          />
        </div>
        <Button
          onClick={handleDone}
          sx={{ fontFamily: "cairo" }}
          className="!bg-mdDark"
          variant="contained"
        >
          {loading ? <MyLoading /> : "اضافة معدة"}
        </Button>
      </div>
    </div>
  );
}
