"use client";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CLIENT_COLLECTOR_REQ,
  GET_CATEGORIES_REQ,
} from "@/app/utils/requests/client-side.requests";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import CategoriesTable from "../../tables/categories-table";
import BlackLayer from "../../common/black-layer";
import PopupHolder from "../../common/popup-holder";
import AddCategoryForm from "../../forms & alerts/add-category-form";
import { useSearch } from "@/app/utils/contexts/search-results-contexts";

export default function CategoriesPage() {
  const [addCat, setCat] = useState(false);
  const router = useRouter();
  const { openPopup } = usePopup();
  const { fillSearch, getSearch } = useSearch();
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_CATEGORIES_REQ);
    console.log(response);
    if (response.done) {
      fillSearch("categories", { results: response.data.categories, total: response.data.total });
      setCat(false);
    } else {
      router.replace("/log-in");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="px-mainxs relative">
        <CategoriesTable data={getSearch("categories")?.results} refetch={fetchData} />
        <Button
          onClick={() => setCat(true)}
          sx={{ fontFamily: "cairo" }}
          className="!bg-mdDark !absolute !left-[12px] !top-0"
          variant="contained"
        >
          انشاء فئة
        </Button>
      </div>
      {addCat && (
        <>
          <BlackLayer onClick={() => setCat(false)} />
          <PopupHolder>
            <AddCategoryForm
              onCategoryAdded={() => {
                openPopup("snakeBarPopup", {
                  message: "تم انشاء فئة جديدة بنجاح.",
                  type: "success",
                });
                fetchData();
              }}
            />
          </PopupHolder>
        </>
      )}
    </>
  );
}
