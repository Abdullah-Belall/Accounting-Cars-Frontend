"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface PopupState {
  isOpen: boolean;
  data: any;
}

interface PopupContextState {
  sortsPopup: PopupState;
  ordersPopup: PopupState;
  makeOrderPopup: PopupState;
  snakeBarPopup: PopupState;
  editPhonePopup: PopupState;
  deleteAlertPopup: PopupState;
  editCategoryPopup: PopupState;
  editQtyPopup: PopupState;
  editProductPopup: PopupState;
  addSortPopup: PopupState;
  editSortPopup: PopupState;
  editOrderPopup: PopupState;
  returnsItemsPopup: PopupState;
}

interface PopupContextType {
  popupState: PopupContextState;
  openPopup: (popupName: keyof PopupContextState, data?: any) => void;
  closePopup: (popupName: keyof PopupContextState) => void;
  closeOrderPopup: (popupName: keyof PopupContextState) => void;
  closeSnakeBarPopup: (popupName: keyof PopupContextState) => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const PopupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [popupState, setPopupState] = useState<PopupContextState>({
    sortsPopup: { isOpen: false, data: null },
    ordersPopup: { isOpen: false, data: null },
    addSortPopup: { isOpen: false, data: null },
    editCategoryPopup: { isOpen: false, data: null },
    editOrderPopup: { isOpen: false, data: null },
    editSortPopup: { isOpen: false, data: null },
    deleteAlertPopup: { isOpen: false, data: null },
    editProductPopup: { isOpen: false, data: null },
    editQtyPopup: { isOpen: false, data: null },
    makeOrderPopup: { isOpen: false, data: { product_sorts: [], client: null } },
    editPhonePopup: { isOpen: false, data: null },
    snakeBarPopup: { isOpen: false, data: { message: "" } },
    returnsItemsPopup: { isOpen: false, data: null },
  });

  const openPopup = (popupName: keyof PopupContextState, data: any) => {
    setPopupState((prev) => ({
      ...prev,
      [popupName]: {
        isOpen: true,
        data: { ...prev[popupName].data, ...data },
      },
    }));
  };

  const closePopup = (popupName: keyof PopupContextState) => {
    setPopupState((prev) => ({
      ...prev,
      [popupName]: { isOpen: false, data: null },
    }));
  };
  const closeOrderPopup = (popupName: keyof PopupContextState) => {
    setPopupState((prev) => ({
      ...prev,
      [popupName]: { isOpen: false, data: { product_sorts: [], client: null } },
    }));
  };
  const closeSnakeBarPopup = (popupName: keyof PopupContextState) => {
    setPopupState((prev) => ({
      ...prev,
      [popupName]: { isOpen: false, data: { message: "" } },
    }));
  };

  return (
    <PopupContext.Provider
      value={{ popupState, openPopup, closePopup, closeOrderPopup, closeSnakeBarPopup }}
    >
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = (): PopupContextType => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopup must be used within a PopupProvider");
  }
  return context;
};
