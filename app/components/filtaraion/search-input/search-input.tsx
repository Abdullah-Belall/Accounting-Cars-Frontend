"use client";
import { useSearch } from "@/app/utils/contexts/search-results-contexts";
import { CLIENT_COLLECTOR_REQ, SEARCH_REQ } from "@/app/utils/requests/client-side.requests";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import styles from "@/app/styles/drop-down.module.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

export default function SearchInput({
  searchin,
  columns,
}: {
  searchin: string;
  columns?: { name: string; slug: string }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState("");
  const { fillSearch } = useSearch();
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const column = current.get("column") || "";
  const [debounce, setDebounce] = useState<NodeJS.Timeout>();
  const handleInp = (value: string) => {
    if (debounce) {
      clearTimeout(debounce);
    }
    const timer = setTimeout(() => {
      setValue(value);
    }, 1000);
    setDebounce(timer);
  };
  useEffect(() => {
    const fetchData = async () => {
      const currentSearchin = current.get("searchin");
      const bodyObj: any = {
        searchin: currentSearchin,
        searchwith: value,
        column: current.get("column"),
      };
      if (value === "") {
        delete bodyObj.searchwith;
        delete bodyObj.column;
      }
      const response = await CLIENT_COLLECTOR_REQ(SEARCH_REQ, bodyObj);
      console.log(response);
      if (response.done) {
        fillSearch(currentSearchin as any, response.data);
      } else {
        console.log("problema");
      }
    };
    fetchData();
  }, [value, column]);
  useEffect(() => {
    const searchinValue = current.get("searchin");
    if (!searchinValue || searchinValue === "") {
      current.set("searchin", searchin);
      router.replace(`?${current.toString()}`);
    }
  }, [searchParams, router, searchin]);
  const [openDropDown, setOpenDropDown] = useState(false);

  const dropDownOpthions = [{ name: "", slug: "بحث عام" }, ...(columns || [])]?.map(
    (e, i, curr) => (
      <li
        key={i}
        onClick={() => {
          if (e.name === "") {
            current.delete("column");
          } else {
            current.set("column", e.name);
          }
          router.replace(`?${current.toString()}`);
          setOpenDropDown(false);
        }}
        className={`${
          i < curr.length - 1 ? "border-foreground" : "border-transparent"
        } p-mainxs text-center text-[12px] border-b cursor-pointer`}
      >
        {e.slug}
      </li>
    )
  );
  const getColumnSlug = () => {
    return columns?.find((e) => e.name === current.get("column"))?.slug;
  };
  return (
    <div dir="rtl" className="min-w-xs">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <IoSearchOutline />
        </div>
        <label htmlFor="default-search" className="relative">
          <input
            dir="rtl"
            type="search"
            id="default-search"
            className="bg-myHover block w-full px-4 py-2 ps-10 text-sm rounded-lg border border-foreground focus:border-mdDark outline-0"
            placeholder="بحث"
            onChange={(e) => handleInp(e.target.value)}
          />
          {columns && columns?.length > 0 && (
            <div className="absolute left-[2px] rounded-l-xl top-[50%] translate-y-[-50%] z-20 w-[100px]">
              <button onBlur={() => setOpenDropDown(false)} className="w-full relative mb-0">
                <div
                  onClick={() => setOpenDropDown(!openDropDown)}
                  className={`w-full bg-myHover text-mdDark cursor-pointer flex justify-between items-center p-1 pr-3 border-r-2 border-foreground`}
                >
                  <p className="text-[12px]">{getColumnSlug() ?? "بحث عام"}</p>
                  {openDropDown ? (
                    <FaChevronUp className="text-[12px]" />
                  ) : (
                    <FaChevronDown className="text-[12px]" />
                  )}
                </div>
                {openDropDown && (
                  <>
                    <ul
                      className={
                        styles.list +
                        " w-full max-h-[120px] shadow-md overflow-y-scroll z-20 rounded-md absolute left-0 top-[calc(100%+6px)] bg-myHover px-mainxs"
                      }
                    >
                      {dropDownOpthions}
                    </ul>
                  </>
                )}
              </button>
            </div>
          )}
        </label>
      </div>
    </div>
  );
}
