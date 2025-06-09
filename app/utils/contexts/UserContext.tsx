"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { WorkersInterface } from "../types/interfaces";

type UserContextType = {
  user: WorkersInterface | null;
  setUser: (user: WorkersInterface | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<WorkersInterface | null>(null);
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
