"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { CarsInterface } from "../types/interfaces";

export type BillsDataType = {
  color: string | null;
  index: number;
  id: string;
  name: string;
  size: string | null;
  qty: number;
  unit_price: string;
  product: {
    name: string;
    id: string;
    material: string | null;
  };
};

type BillsValueType = {
  type: "order" | "return" | null;
  bill_id: string | null;
  car: CarsInterface | null;
  data?: BillsDataType[];
  totals: {
    totalPrice: string;
    tax: string;
    discount: string;
    additional_fees: number;
    paid_status: string;
    installment_type?: string;
    client_balance?: string;
    take_from_client_balance?: string;
    down_payment?: string;
    installment?: string;
    payment_method: string;
    client_depts: string | number;
    created_at?: Date;
  };
};

type BillsContextType = {
  bills: BillsValueType | null;
  setBills: (item: BillsValueType) => void;
  closeBills: () => void;
};

const BillsContext = createContext<BillsContextType | undefined>(undefined);

export const BillesProvider = ({ children }: { children: ReactNode }) => {
  const [bills, setBills] = useState<BillsValueType>({
    type: null,
    bill_id: null,
    car: null,
    data: [],
    totals: {
      totalPrice: "",
      tax: "",
      additional_fees: 0,
      discount: "",
      paid_status: "",
      installment_type: "",
      client_balance: "",
      take_from_client_balance: "",
      down_payment: "",
      installment: "",
      payment_method: "",
      client_depts: "",
    },
  });
  const closeBills = () => {
    setBills({
      type: null,
      bill_id: null,
      car: null,
      data: [],
      totals: {
        totalPrice: "",
        tax: "",
        additional_fees: 0,
        discount: "",
        paid_status: "",
        client_balance: "",
        take_from_client_balance: "",
        installment_type: "",
        down_payment: "",
        installment: "",
        payment_method: "",
        client_depts: "",
      },
    });
  };
  return (
    <BillsContext.Provider value={{ bills, setBills, closeBills }}>
      {children}
    </BillsContext.Provider>
  );
};

export const useBills = (): BillsContextType => {
  const context = useContext(BillsContext);
  if (!context) {
    throw new Error("useReturns must be used within a UserProvider");
  }
  return context;
};
