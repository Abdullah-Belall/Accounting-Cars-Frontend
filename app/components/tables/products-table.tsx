import { usePopup } from "@/app/utils/contexts/popup-contexts";
import ProductsTableRows from "../products/products-rows";
import MainTable from "./main-table";
import BlackLayer from "../common/black-layer";
import SortsTable from "./sorts-table";
import { Button } from "@mui/material";
import { useState } from "react";
import AddSortForm from "../forms & alerts/add-sort-form";
import { ProductInterface } from "@/app/utils/types/interfaces";
import EditQtyPopup from "../forms & alerts/edit-qty";
import {
  CLIENT_COLLECTOR_REQ,
  DELETE_PRODUCT_REQ,
  UPDATE_SORT_REQ,
} from "@/app/utils/requests/client-side.requests";
import AddProductForm from "../forms & alerts/add-product-form";
import NoData from "../common/no-data";
import DeleteAlert from "../forms & alerts/delete-alert";

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
    "*",
    "الاسم",
    "الوصف",
    "الكمية",
    "الخامة",
    "عدد الاصناف",
    "ملاحظات",
    "تاريخ الانشاء",
    "العمليات",
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
  const handleDeleteProduct = async () => {
    const id = popupState.deleteAlertPopup.data.id;
    const response = await CLIENT_COLLECTOR_REQ(DELETE_PRODUCT_REQ, { id });
    if (response.done) {
      openPopup("snakeBarPopup", {
        message: "تم حذف المنتج بنجاح.",
        type: "success",
      });
      closePopup("deleteAlertPopup");
      refetch();
    } else {
      openPopup("snakeBarPopup", {
        message: response.message,
      });
    }
  };
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
          >
            <div className="w-full px-mainxs md:w-[768px]">
              <div className="relative rounded-xl shadow-md bg-myLight p-mainxl">
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
            </div>
          </BlackLayer>
        </>
      )}
      {addSort && popupState.addSortPopup.isOpen && (
        <>
          <BlackLayer onClick={() => setAddSort(false)}>
            <AddSortForm id={popupState.sortsPopup.data.id} onConfirm={onAddedSort} />
          </BlackLayer>
        </>
      )}
      {popupState.editSortPopup.isOpen && (
        <>
          <BlackLayer onClick={() => closePopup("editSortPopup")}>
            <AddSortForm
              id={undefined}
              onConfirm={onEditSortConfirm}
              isForEdit={popupState.editSortPopup.data}
            />
          </BlackLayer>
        </>
      )}
      {popupState.editQtyPopup.isOpen && (
        <>
          <BlackLayer onClick={() => closePopup("editQtyPopup")}>
            <EditQtyPopup
              latest_cost_unit_price={popupState.editQtyPopup.data.latest_cost_unit_price as number}
              OnConfirm={onQtyConfirm}
            />
          </BlackLayer>
        </>
      )}
      {popupState.editProductPopup.isOpen && (
        <>
          <BlackLayer onClick={() => closePopup("editProductPopup")}>
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
          </BlackLayer>
        </>
      )}
      {popupState.deleteAlertPopup.isOpen && (
        <>
          <BlackLayer onClick={() => closePopup("deleteAlertPopup")}>
            <DeleteAlert
              action={"حذف"}
              name={`المنتج ${popupState.deleteAlertPopup.data.name}`}
              onConfirm={handleDeleteProduct}
            />
          </BlackLayer>
        </>
      )}
    </>
  );
}
