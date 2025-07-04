"use client";
import { useEffect, useState } from "react";
import {
  CLIENT_COLLECTOR_REQ,
  DELETE_EXPENSE_REQ,
  GET_ALL_EXPENSES_REQ,
} from "@/app/utils/requests/client-side.requests";
import { useRouter } from "next/navigation";
import { useSearch } from "@/app/utils/contexts/search-results-contexts";
import ExpensesTable from "../../tables/expenses-table";
import { Button } from "@mui/material";
import ExpenseForm from "../../forms & alerts/add-expense";
import BlackLayer from "../../common/black-layer";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import DeleteAlert from "../../forms & alerts/delete-alert";

export default function ExpensesPage() {
  const router = useRouter();
  const { popupState, closePopup, openPopup } = usePopup();
  const openSnakeBar = (message: string) => {
    openPopup("snakeBarPopup", { message });
  };
  const [openExpense, setOpenExpense] = useState(false);
  const [editExpense, setEditExpense] = useState<{
    title: string;
    isForEdit?: { id: string; name: string; amount: number; note: string };
  }>();
  const { fillSearch, getSearch } = useSearch();
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_ALL_EXPENSES_REQ);

    if (response.done) {
      fillSearch("expenses", { results: response.data?.expenses, total: response.data?.total });
    } else {
      router.replace("/log-in");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const deleteExpense = async () => {
    const response = await CLIENT_COLLECTOR_REQ(DELETE_EXPENSE_REQ, {
      id: popupState?.deleteAlertPopup?.data?.id,
    });
    if (response.done) {
      fetchData();
      closePopup("deleteAlertPopup");
      openPopup("snakeBarPopup", {
        message: "تم اضافة صنف جديد بنجاح.",
        type: "success",
      });
    } else {
      openSnakeBar(response.message);
    }
  };

  const data = getSearch("expenses").results;
  return (
    <>
      <div className="px-mainxs relative">
        <ExpensesTable
          data={data}
          forEdit={(data: any) => {
            setOpenExpense(true);
            setEditExpense(data);
          }}
        />
        <Button
          onClick={() => setOpenExpense(true)}
          sx={{ fontFamily: "cairo" }}
          className="!bg-mdDark !absolute !left-[12px] !top-0"
          variant="contained"
        >
          انشاء مصروف
        </Button>
      </div>
      {openExpense && (
        <BlackLayer
          onClick={() => {
            setOpenExpense(false);
            setEditExpense(undefined);
          }}
        >
          <ExpenseForm
            title={editExpense?.title ?? "انشاء مصروف جديد"}
            onDone={() => {
              fetchData();
              setOpenExpense(false);
              setEditExpense(undefined);
            }}
            isForEdit={
              editExpense?.isForEdit
                ? {
                    ...editExpense.isForEdit,
                    amount: editExpense.isForEdit.amount.toString(),
                  }
                : undefined
            }
          />
        </BlackLayer>
      )}
      {popupState.deleteAlertPopup.isOpen && (
        <BlackLayer onClick={() => closePopup("deleteAlertPopup")}>
          <DeleteAlert
            action={"حذف"}
            name={`مصروف ${popupState?.deleteAlertPopup?.data?.name}`}
            onConfirm={deleteExpense}
          />
        </BlackLayer>
      )}
    </>
  );
}
