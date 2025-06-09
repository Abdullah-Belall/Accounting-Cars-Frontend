"use client";
import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import SelectList from "../common/select-list";
import styles from "@/app/styles/drop-down.module.css";
import {
  ADD_PRODUCT_REQ,
  CLIENT_COLLECTOR_REQ,
  GET_CATEGORIES_REQ,
  UPDATE_PRODUCT_REQ,
} from "@/app/utils/requests/client-side.requests";
import { CategoryInterface } from "@/app/utils/types/interfaces";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { useRouter } from "next/navigation";
import { sameTextField } from "@/app/utils/base";

export default function AddProductForm({
  isForEdit,
}: {
  isForEdit?: {
    id: string;
    title: string;
    desc: string;
    material: string;
    note: string;
    refetch: any;
  };
}) {
  const [data, setData] = useState({
    name: isForEdit ? isForEdit.title ?? "" : "",
    desc: isForEdit ? isForEdit.desc ?? "" : "",
    category: "الفئة",
    material: isForEdit ? isForEdit.material ?? "" : "",
    note: isForEdit ? isForEdit.note ?? "" : "",
  });
  const [dropDown, setDropDown] = useState(false);
  const { openPopup, closePopup } = usePopup();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const openSnakeBar = (message: string) => {
    openPopup("snakeBarPopup", { message });
  };
  const handleData = (keyName: keyof typeof data, value: string) => {
    setData({ ...data, [keyName]: value });
    setDropDown(false);
  };
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_CATEGORIES_REQ);
    console.log(response);
    if (response.done) {
      setCategories(response.data.categories);
    }
  };
  useEffect(() => {
    if (!isForEdit) {
      fetchData();
    }
  }, [isForEdit]);
  const dropDownOpthions = categories.map((e) => (
    <li
      key={e.id}
      onClick={() => handleData("category", e.name + `###` + e.id)}
      className="p-mainxs text-center border-b border-myLight cursor-pointer"
    >
      {e.name}
    </li>
  ));
  const validation = () => {
    const { name, category, material } = data;
    if (!name) {
      openSnakeBar("يجب تحديد اسم للمتابعة.");
      return false;
    }
    if (name.length < 2) {
      openSnakeBar("يجب ان يكون الأسم حرفين علي الأقل.");
      return false;
    }
    if (!isForEdit) {
      if (!category || category === "الفئة" || category === "") {
        openSnakeBar("يجب تحديد فئة للمتابعة.");
        return false;
      }
    }
    if (!material) {
      openSnakeBar("يجب تحديد خامة للمتابعة.");
      return false;
    }
    if (material.length < 2) {
      openSnakeBar("يجب ان تكون الخامة حرفين علي الأقل.");
      return false;
    }
    return true;
  };
  const handleDone = async () => {
    if (!validation()) return;
    if (loading) return;
    const finalObj: any = {
      ...data,
      desc: data.desc === "" ? null : data.desc,
      note: data.note === "" ? null : data.note,
      categoryId: data.category?.split("###")[1] as string,
    };
    delete finalObj.category;
    if (isForEdit) {
      delete finalObj.categoryId;
    }
    setLoading(true);
    const response = await CLIENT_COLLECTOR_REQ(
      isForEdit ? UPDATE_PRODUCT_REQ : ADD_PRODUCT_REQ,
      isForEdit ? { id: isForEdit.id, data: finalObj } : finalObj
    );
    setLoading(false);
    if (response.done) {
      openPopup("snakeBarPopup", { message: "تم اضافة منتج جديد بنجاح.", type: "success" });
      if (isForEdit) {
        closePopup("editProductPopup");
        isForEdit.refetch();
      } else {
        router.push("/products?searchin=products");
      }
    } else {
      openSnakeBar(response.message);
    }
  };
  return (
    <div className="rounded-md shadow-md min-w-md bg-myLight p-mainxl">
      <h2 className="text-lg text-center font-semibold mb-4">
        {isForEdit ? "تعديل منتج" : "اضافة منتج جديد"}
      </h2>
      <div className="space-y-4 flex flex-col gap-[15px]">
        <TextField
          id="Glu"
          dir="rtl"
          label="اسم المنتج"
          variant="filled"
          className="w-full"
          sx={sameTextField}
          value={data.name}
          onChange={(e) => handleData("name", e.target.value)}
        />
        <TextField
          id="Glu"
          dir="rtl"
          label="وصف المنتج"
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
          value={data.desc}
          onChange={(e) => handleData("desc", e.target.value)}
        />
        {!isForEdit && (
          <SelectList
            placeHolder="الفئة"
            select={data.category?.split("###")[0] as string}
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
                  {dropDownOpthions}
                </ul>
              </>
            )}
          </SelectList>
        )}

        <TextField
          id="Glu"
          dir="rtl"
          label="الخامة"
          variant="filled"
          className="w-full"
          sx={sameTextField}
          value={data.material}
          onChange={(e) => handleData("material", e.target.value)}
        />
        <TextField
          id="Glu"
          dir="rtl"
          label="ملحوظة اضافية"
          variant="filled"
          className="w-full"
          sx={sameTextField}
          value={data.note}
          onChange={(e) => handleData("note", e.target.value)}
        />
        <Button
          onClick={handleDone}
          sx={{ fontFamily: "cairo" }}
          className={"!bg-mdDark"}
          variant="contained"
        >
          اضافة
        </Button>
      </div>
    </div>
  );
}
