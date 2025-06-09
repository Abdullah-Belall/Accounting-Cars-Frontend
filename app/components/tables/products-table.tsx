import { usePopup } from "@/app/utils/contexts/popup-contexts";
import ProductsTableRows from "../products/products-rows";
import MainTable from "./main-table";
import BlackLayer from "../common/black-layer";
import PopupHolder from "../common/popup-holder";
import SortsTable from "./sorts-table";
import { Button } from "@mui/material";
import { useState } from "react";
import AddSortForm from "../forms & alerts/add-sort-form";
import { ProductInterface } from "@/app/utils/types/interfaces";
import EditQtyPopup from "../forms & alerts/edit-qty";
import { CLIENT_COLLECTOR_REQ, UPDATE_SORT_REQ } from "@/app/utils/requests/client-side.requests";
import AddProductForm from "../forms & alerts/add-product-form";
import NoData from "../common/no-data";

export default function ProductsTable({
  title,
  cat,
  data,
  refetch,
  isForCategory,
}: {
  data: ProductInterface[];
  title: string;
  cat?: "الفئة";
  refetch: any;
  isForCategory: boolean;
}) {
  const { popupState, closePopup, openPopup } = usePopup();
  const openSnakeBar = (message: string) => {
    openPopup("snakeBarPopup", { message });
  };
  const [addSort, setAddSort] = useState(false);
  const headers = [
    "العمليات",
    "تاريخ الانشاء",
    "ملاحظات",
    "عدد الاصناف",
    "الخامة",
    "الكمية",
    "الوصف",
    "الاسم",
    "*",
  ];
  if (cat) {
    headers.splice(6, 0, cat);
  }
  const onAddedSort = () => {
    popupState.addSortPopup.data.refetchOnAdded();
    refetch();
    openPopup("snakeBarPopup", {
      message: "تم اضافة صنف جديد بنجاح.",
      type: "success",
    });
    setAddSort(false);
  };
  const editQtyData = popupState.editQtyPopup.data;
  const onQtyConfirm = async (data: { qty: number; costPrice: number }) => {
    const response = await CLIENT_COLLECTOR_REQ(UPDATE_SORT_REQ, {
      id: editQtyData.id,
      data,
    });
    if (response.done) {
      closePopup("editQtyPopup");
      openPopup("snakeBarPopup", {
        message: "تم تحديث كمية الصنف بنجاح.",
        type: "success",
      });
      editQtyData.refetchOnEdit();
      refetch();
    } else {
      openSnakeBar(response.message);
    }
  };
  const onEditSortConfirm = () => {
    popupState.editSortPopup.data.refetchOnEdit();
    openPopup("snakeBarPopup", {
      message: "تم تعديل الصنف بنجاح.",
      type: "success",
    });
    closePopup("editSortPopup");
  };
  const columns = [
    { name: "product.name", slug: "الأسم" },
    { name: "product.desc", slug: "الوصف" },
    { name: "cat.name", slug: "الفئة" },
    { name: "product.material", slug: "الخامة" },
    { name: "product.note", slug: "الملاحظات" },
  ];
  console.log(data);
  return (
    <>
      <MainTable title={title} headers={headers} filter={[!isForCategory, "products", columns]}>
        {data?.map((row, index) => (
          <ProductsTableRows
            key={index}
            index={index + 1}
            id={row.id}
            name={row.name}
            desc={row.desc}
            category={row?.category}
            qty={row.qty}
            material={row.material}
            sorts_count={row.sorts_count}
            note={row.note}
            created_at={row.created_at}
          />
        ))}
      </MainTable>
      {data?.length === 0 && <NoData />}
      {popupState.sortsPopup.isOpen && (
        <>
          <BlackLayer
            onClick={() => {
              closePopup("sortsPopup");
              closePopup("addSortPopup");
            }}
          />
          <PopupHolder>
            <div className="relative rounded-xl shadow-md min-w-[520px] bg-myLight p-mainxl">
              <SortsTable
                title={popupState.sortsPopup.data.name}
                id={popupState.sortsPopup.data.id}
              />
              <Button
                onClick={() => setAddSort(true)}
                sx={{ fontFamily: "cairo" }}
                className="!bg-mdDark !absolute !left-[18px] !top-[12px]"
                variant="contained"
              >
                اضافة صنف
              </Button>
            </div>
          </PopupHolder>
        </>
      )}
      {addSort && popupState.addSortPopup.isOpen && (
        <>
          <BlackLayer onClick={() => setAddSort(false)} />
          <PopupHolder>
            <AddSortForm id={popupState.sortsPopup.data.id} onConfirm={onAddedSort} />
          </PopupHolder>
        </>
      )}
      {popupState.editSortPopup.isOpen && (
        <>
          <BlackLayer onClick={() => closePopup("editSortPopup")} />
          <PopupHolder>
            <AddSortForm
              id={undefined}
              onConfirm={onEditSortConfirm}
              isForEdit={popupState.editSortPopup.data}
            />
          </PopupHolder>
        </>
      )}
      {popupState.editQtyPopup.isOpen && (
        <>
          <BlackLayer onClick={() => closePopup("editQtyPopup")} />
          <PopupHolder>
            <EditQtyPopup OnConfirm={onQtyConfirm} title={editQtyData.title} />
          </PopupHolder>
        </>
      )}
      {popupState.editProductPopup.isOpen && (
        <>
          <BlackLayer onClick={() => closePopup("editProductPopup")} />
          <PopupHolder>
            <AddProductForm
              isForEdit={{
                ...popupState.editProductPopup.data,
                refetch: () => {
                  refetch();
                  openPopup("snakeBarPopup", {
                    message: "تم تعديل منتج بنجاح.",
                    type: "success",
                  });
                },
              }}
            />
          </PopupHolder>
        </>
      )}
    </>
  );
}
