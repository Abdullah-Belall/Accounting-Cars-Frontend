"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

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
  client: {
    name: string | null;
    id: string | null;
  };
  data?: BillsDataType[];
  totals: {
    totalPrice: string;
    tax: string;
    discount: string;
    paid_status: string;
    payment_method: string;
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
    client: {
      name: null,
      id: null,
    },
    data: [],
    totals: {
      totalPrice: "",
      tax: "",
      discount: "",
      paid_status: "",
      payment_method: "",
    },
  });
  const closeBills = () => {
    setBills({
      type: null,
      bill_id: null,
      client: {
        name: null,
        id: null,
      },
      data: [],
      totals: {
        totalPrice: "",
        tax: "",
        discount: "",
        paid_status: "",
        payment_method: "",
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
