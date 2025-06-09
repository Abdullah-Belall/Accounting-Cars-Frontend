"use client";
import { CategoryInterface } from "@/app/utils/types/interfaces";
import CategoriesTableRow from "../categories/categories-rows";
import MainTable from "./main-table";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import BlackLayer from "../common/black-layer";
import PopupHolder from "../common/popup-holder";
import AddCategoryForm from "../forms & alerts/add-category-form";
import DeleteAlert from "../forms & alerts/delete-alert";
import {
  CLIENT_COLLECTOR_REQ,
  DELETE_CATEGORY_REQ,
} from "@/app/utils/requests/client-side.requests";
import NoData from "../common/no-data";

export default function CategoriesTable({
  data,
  refetch,
}: {
  data: CategoryInterface[];
  refetch: any;
}) {
  const { popupState, closePopup, openPopup } = usePopup();
  const updateCatData = popupState.editCategoryPopup.data;
  const deleteCatData = popupState.deleteAlertPopup.data;
  const onDelele = async () => {
    const response = await CLIENT_COLLECTOR_REQ(DELETE_CATEGORY_REQ, { id: deleteCatData.id });
    console.log(response);
    if (response.done) {
      openPopup("snakeBarPopup", {
        message: "تم حذف فئة بنجاح.",
        type: "success",
      });
      closePopup("deleteAlertPopup");
      refetch();
    }
  };
  const columns = [
    { name: "category.name", slug: "الأسم" },
    { name: "category.desc", slug: "الوصف" },
  ];
  return (
    <>
      <MainTable
        title={"كل الفئات"}
        headers={["العمليات", "تاريخ الانشاء", "عدد المنتجات التابعة", "الوصف", "الاسم", "*"]}
        filter={[true, "categories", columns]}
      >
        {data?.map((row, index) => (
          <CategoriesTableRow
            key={index}
            index={index + 1}
            title={row.name}
            desc={row.desc ?? "لا يوجد"}
            product_count={row.products_count}
            date={row.created_at}
            id={row.id}
          />
        ))}
      </MainTable>
      {data?.length === 0 && <NoData />}
      {popupState.editCategoryPopup.isOpen && (
        <>
          <BlackLayer onClick={() => closePopup("editCategoryPopup")} />
          <PopupHolder>
            <AddCategoryForm
              onCategoryAdded={undefined}
              isForEdit={{
                id: updateCatData?.id,
                name: updateCatData.title,
                desc: updateCatData.desc,
                onEdited: () => {
                  openPopup("snakeBarPopup", {
                    message: "تم تعديل فئة بنجاح.",
                    type: "success",
                  });
                  closePopup("editCategoryPopup");
                  refetch();
                },
              }}
            />
          </PopupHolder>
        </>
      )}
      {popupState.deleteAlertPopup.isOpen && (
        <>
          <BlackLayer onClick={() => closePopup("deleteAlertPopup")} />
          <PopupHolder>
            <DeleteAlert action={"حذف"} name={`فئة ${deleteCatData?.title}`} onConfirm={onDelele} />
          </PopupHolder>
        </>
      )}
    </>
  );
}
