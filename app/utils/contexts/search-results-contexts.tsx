"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import {
  CategoryInterface,
  CostsInterface,
  OrderInterface,
  ProductInterface,
  ReturnDataInterface,
  SortInterface,
} from "../types/interfaces";

interface SearchContextsStateInterface {
  sorts: { results: SortInterface[] | null; total: number };
  products: { results: ProductInterface[] | null; total: number };
  costs: { results: CostsInterface[] | null; total: number };
  categories: { results: CategoryInterface[] | null; total: number };
  orders: { results: OrderInterface[] | null; total: number };
  returns: { results: ReturnDataInterface[] | null; total: number };
  categoryProducts: { results: ProductInterface[] | null; total: number };
  clients: { results: [] | null; total: number };
  workers: { results: [] | null; total: number };
}

interface SearchContextInterface {
  getSearch: (searchContextsName: keyof SearchContextsStateInterface) => {
    results: any;
    total: number;
  };
  fillSearch: (
    searchContextsName: keyof SearchContextsStateInterface,
    data: { results: any; total: number }
  ) => void;
  emptySearch: (searchContextsName: keyof SearchContextsStateInterface) => void;
}

const SearchContext = createContext<SearchContextInterface | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [search, setSearch] = useState<SearchContextsStateInterface>({
    sorts: { results: null, total: 0 },
    products: { results: null, total: 0 },
    costs: { results: null, total: 0 },
    categories: { results: null, total: 0 },
    orders: { results: null, total: 0 },
    returns: { results: null, total: 0 },
    categoryProducts: { results: null, total: 0 },
    clients: { results: null, total: 0 },
    workers: { results: null, total: 0 },
  });
  const getSearch = (searchContextsName: keyof SearchContextsStateInterface) => {
    return search[searchContextsName];
  };
  const fillSearch = (
    searchContextsName: keyof SearchContextsStateInterface,
    data: { results: any; total: number }
  ) => {
    setSearch((prev) => ({
      ...prev,
      [searchContextsName]: data,
    }));
  };
  const emptySearch = (searchContextsName: keyof SearchContextsStateInterface) => {
    setSearch((prev) => ({
      ...prev,
      [searchContextsName]: { results: null, total: 0 },
    }));
  };
  return (
    <SearchContext.Provider value={{ getSearch, fillSearch, emptySearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextInterface => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
