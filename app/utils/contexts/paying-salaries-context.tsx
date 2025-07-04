"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type workerSalary = {
  worker_id: string;
  salary: number;
};

type WorkerSalaryContextType = {
  data: workerSalary[];
  findAll: () => workerSalary[];
  findOne: (worker_id: string) => workerSalary | undefined;
  add: (item: workerSalary) => void;
  addMany: (items: workerSalary[]) => void;
  deleteByWorkerId: (worker_id: string) => void;
  deleteAll: () => void;
};

const WorkerSalaryContext = createContext<WorkerSalaryContextType | undefined>(undefined);

export const WorkerSalaryProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<workerSalary[]>([]);

  const findAll = () => data;

  const findOne = (worker_id: string) => data.find((item) => item?.worker_id === worker_id);

  const add = (item: workerSalary) => {
    setData((prev) => [...prev, item]);
  };
  const addMany = (items: workerSalary[]) => {
    setData((prev) => [...prev, ...items]);
  };

  const deleteByWorkerId = (worker_id: string) => {
    setData((prev) => prev.filter((item) => item?.worker_id !== worker_id));
  };
  const deleteAll = () => {
    setData([]);
  };

  return (
    <WorkerSalaryContext.Provider
      value={{ data, findAll, findOne, add, deleteByWorkerId, deleteAll, addMany }}
    >
      {children}
    </WorkerSalaryContext.Provider>
  );
};

export const useWorkerSalary = () => {
  const context = useContext(WorkerSalaryContext);
  if (!context) {
    throw new Error("useWorkerSalary لازم تستخدمه جوه WorkerSalaryProvider");
  }
  return context;
};
