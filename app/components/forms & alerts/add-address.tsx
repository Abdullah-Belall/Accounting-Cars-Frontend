"use client";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import SelectList from "../common/select-list";
import styles from "@/app/styles/drop-down.module.css";
import { sameTextField } from "@/app/utils/base";

export default function AddAddressForm() {
  const [data, setData] = useState({
    govenorate: null,
    city: null,
    street: null,
    more_info: null,
    addressFor: null,
  });
  const [dropDown, setDropDown] = useState(false);
  const [dropDownSlug, setDropDownSlug] = useState<null | string>(null);
  const handleData = (keyName: string, value: string) => {
    setData({ ...data, [keyName]: value });
    setDropDownSlug(value === "admin" ? "موظف" : "مالك");
    setDropDown(false);
  };
  const dropDownOpthions = GovernoratesArray.map((e) => (
    <li
      key={e.govenorate}
      onClick={() => handleData("govenorate", e.govenorate)}
      className="p-mainxs text-center border-b border-myLight cursor-pointer"
    >
      {e.slug}
    </li>
  ));
  return (
    <div className="rounded-md shadow-md min-w-[320px] bg-myLight p-mainxl">
      <h2 className="text-lg text-center font-semibold mb-4">إضافة عنوان جديد</h2>
      <div className="space-y-4 flex flex-col gap-[15px]">
        <TextField
          id="Glu"
          dir="rtl"
          label="عنوان"
          placeholder="المنزل,العمل..."
          variant="filled"
          className="w-full"
          sx={sameTextField}
        />
        <SelectList
          placeHolder="المحافظة"
          select={dropDownSlug}
          onClick={() => setDropDown(true)}
          onBlur={() => setDropDown(false)}
          dropDown={dropDown}
        >
          {dropDown && (
            <>
              <ul
                className={
                  styles.list +
                  " w-full max-h-[220px] overflow-y-scroll z-10 rounded-md absolute left-0 top-[calc(100%+6px)] bg-anotherLight px-mainxs"
                }
              >
                {dropDownOpthions}
              </ul>
            </>
          )}
        </SelectList>

        <TextField
          id="Glu"
          dir="rtl"
          label="الشارع"
          variant="filled"
          className="w-full"
          sx={sameTextField}
        />
        <TextField
          id="Glu"
          dir="rtl"
          label="تفاصيل اضافية"
          variant="filled"
          sx={{
            ...sameTextField,
            "& .MuiFilledInput-root": {
              fontFamily: "cairo",
              height: "120px !important",
              "&:before": {
                borderBottomColor: "#495057",
              },
              "&:hover:not(.Mui-disabled):before": {
                borderBottomColor: "#495057",
              },
              "&:after": {
                borderBottomColor: "#495057",
              },
            },
          }}
        />
        <Button sx={{ fontFamily: "cairo" }} className={"!bg-mdDark"} variant="contained">
          اضافة
        </Button>
      </div>
    </div>
  );
}

export const GovernoratesArray = [
  { govenorate: "Cairo", slug: "القاهرة" },
  { govenorate: "Giza", slug: "الجيزة" },
  { govenorate: "Alexandria", slug: "الإسكندرية" },
  { govenorate: "Qalyubia", slug: "القليوبية" },
  { govenorate: "Dakahlia", slug: "الدقهلية" },
  { govenorate: "Sharqia", slug: "الشرقية" },
  { govenorate: "Beheira", slug: "البحيرة" },
  { govenorate: "KafrElSheikh", slug: "كفر الشيخ" },
  { govenorate: "Gharbia", slug: "الغربية" },
  { govenorate: "Monufia", slug: "المنوفية" },
  { govenorate: "Damietta", slug: "دمياط" },
  { govenorate: "PortSaid", slug: "بورسعيد" },
  { govenorate: "Ismailia", slug: "الإسماعيلية" },
  { govenorate: "Suez", slug: "السويس" },
  { govenorate: "NorthSinai", slug: "شمال سيناء" },
  { govenorate: "SouthSinai", slug: "جنوب سيناء" },
  { govenorate: "RedSea", slug: "البحر الأحمر" },
  { govenorate: "Fayoum", slug: "الفيوم" },
  { govenorate: "BeniSuef", slug: "بني سويف" },
  { govenorate: "Minya", slug: "المنيا" },
  { govenorate: "Assiut", slug: "أسيوط" },
  { govenorate: "Sohag", slug: "سوهاج" },
  { govenorate: "Qena", slug: "قنا" },
  { govenorate: "Luxor", slug: "الأقصر" },
  { govenorate: "Aswan", slug: "أسوان" },
  { govenorate: "NewValley", slug: "الوادي الجديد" },
  { govenorate: "Matrouh", slug: "مطروح" },
];
