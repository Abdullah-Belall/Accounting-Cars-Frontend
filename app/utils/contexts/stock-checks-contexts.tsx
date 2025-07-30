"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type StockCheck = {
  sort_id: string;
  qty: number;
};

type StockChecksContextType = {
  data: StockCheck[];
  findAll: () => StockCheck[];
  findOne: (sort_id: string) => StockCheck | undefined;
  add: (item: StockCheck) => void;
  deleteBySortId: (sort_id: string) => void;
  clear: () => void;
};

const StockChecksContext = createContext<StockChecksContextType | undefined>(undefined);

export const StockChecksProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<StockCheck[]>([]);

  const findAll = () => data;

  const findOne = (sort_id: string) => data.find((item) => item.sort_id === sort_id);

  const add = (item: StockCheck) => {
    setData((prev) => [...prev, item]);
  };

  const deleteBySortId = (sort_id: string) => {
    setData((prev) => prev.filter((item) => item.sort_id !== sort_id));
  };
  const clear = () => {
    setData([]);
  };

  return (
    <StockChecksContext.Provider value={{ data, findAll, findOne, add, deleteBySortId, clear }}>
      {children}
    </StockChecksContext.Provider>
  );
};

export const useStockChecks = () => {
  const context = useContext(StockChecksContext);
  if (!context) {
    throw new Error("useStockChecks لازم تستخدمه جوه StockChecksProvider");
  }
  return context;
};
