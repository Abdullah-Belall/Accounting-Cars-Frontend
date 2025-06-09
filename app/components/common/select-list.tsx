"use client";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

export default function SelectList({
  children,
  onClick,
  onBlur,
  dropDown,
  select,
  placeHolder,
}: Readonly<{
  children: React.ReactNode;
  onClick: any;
  onBlur: any;
  dropDown: boolean;
  select: string | null;
  placeHolder: string;
}>) {
  return (
    <button onBlur={onBlur} className="w-full relative mb-0">
      <div
        onClick={dropDown ? onBlur : onClick}
        className={`${
          dropDown ? "border-myDark bg-anotherLight" : "bg-transparent border-mdDark"
        } w-full rounded-t-sm border-b cursor-pointer flex flex-row-reverse justify-between items-center px-mainxs py-mainxl`}
      >
        <p>{select ?? placeHolder}</p>
        {dropDown ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {children}
    </button>
  );
}
