"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type ReturnsDataType = {
  item_id: string;
  qty: number;
};

type ReturnsValueType = {
  isActive: boolean;
  data?: ReturnsDataType[];
};

type ReturnsContextType = {
  returns: ReturnsValueType | null;
  setReturns: (item: ReturnsValueType) => void;
  closeReturns: () => void;
};

const ReturnsContext = createContext<ReturnsContextType | undefined>(undefined);

export const ReturnsProvider = ({ children }: { children: ReactNode }) => {
  const [returns, setReturns] = useState<ReturnsValueType>({
    isActive: false,
    data: [],
  });
  const closeReturns = () => {
    setReturns({
      isActive: false,
      data: [],
    });
  };
  return (
    <ReturnsContext.Provider value={{ returns, setReturns, closeReturns }}>
      {children}
    </ReturnsContext.Provider>
  );
};

export const useReturns = (): ReturnsContextType => {
  const context = useContext(ReturnsContext);
  if (!context) {
    throw new Error("useReturns must be used within a UserProvider");
  }
  return context;
};
