"use client";
import { cairo } from "@/app/utils/fonts/main.font";
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import { Button } from "@mui/material";
import SideBarList from "./side-bar-list";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { FaClipboardCheck, FaPeopleCarryBox, FaPerson } from "react-icons/fa6";
import { FaIdCardAlt } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { FiCodesandbox } from "react-icons/fi";
import Link from "next/link";
import { RiBillLine } from "react-icons/ri";
import styles from "@/app/styles/tables-scroll.module.css";

export default function SideBar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const path = usePathname();
  const dataItems = useMemo(
    () =>
      sideBarItems.map((item, index) => (
        <SideBarList
          key={index}
          title={item.title}
          icon={item.icon}
          affiliateLinks={item.affiliateLinks}
          onClose={onClose}
        />
      )),
    []
  );

  return (
    <aside
      className={
        styles.list +
        ` ${open ? "right-0" : "right-[-250px]"} duration-[.3s] z-30 md:z-[1] md:right-0 overflow-y-scroll flex flex-col gap-2 px-mainxs pb-[20px] pt-[80px] fixed top-0 w-[240px] h-dvh bg-myLight border-l-3 border-[#eee]`
      }
    >
      <Link className="w-full" onClick={onClose} href={"/"}>
        <Button
          className={`${
            path === "/" ? "!bg-[#f1f1f1]" : ""
          } group w-full !rounded-md !text-end !px-mainxs !flex !gap-[5px] !items-center !justify-start !text-secDark !text-[16px] !font-[500] !py-1 hover:bg-myHover!`}
          variant="text"
          sx={{ fontFamily: cairo.style.fontFamily }}
        >
          <HomeFilledIcon fontSize="small" className="opacity-50 group-hover:opacity-100" />
          الواجهة الرئيسية
        </Button>
      </Link>
      <Link className="w-full" onClick={onClose} href={"/categories"}>
        <Button
          className={`${
            path === "/categories" ? "!bg-[#f1f1f1]" : ""
          } group w-full !rounded-md !text-end !px-mainxs !flex !gap-[5px] !items-center !justify-start !text-secDark !text-[16px] !font-[500] !py-1 hover:bg-myHover!`}
          variant="text"
          sx={{ fontFamily: cairo.style.fontFamily }}
        >
          <BiCategory className="opacity-50 group-hover:opacity-100" />
          الفئات
        </Button>
      </Link>
      {dataItems}
    </aside>
  );
}
//
const sameClass = "opacity-50 group-hover:opacity-100";
const sideBarItems = [
  {
    title: "الفواتير",
    icon: <RiBillLine className={sameClass} />,
    affiliateLinks: [
      {
        title: "فواتير المصاريف",
        link: "/expenses?searchin=expenses",
      },
      {
        title: "فواتير التكاليف",
        link: "/products/costs?searchin=costs",
      },
      {
        title: "فواتير المبيعات",
        link: "/orders?searchin=orders",
      },
      {
        title: "فواتير المرتجعات",
        link: "/returns?searchin=returns",
      },
      {
        title: "انشاء فاتورة",
        link: "/products/sorts?searchin=sorts",
      },
    ],
  },
  {
    title: "الجرود",
    icon: <FaClipboardCheck className={sameClass} />,
    affiliateLinks: [
      {
        title: "كل الجرود",
        link: "/stock-checks?searchin=stock-checks",
      },
      {
        title: "انشاء جرد",
        link: "/stock-checks/add",
      },
    ],
  },
  {
    title: "المنتجات",
    icon: <FiCodesandbox className={sameClass} />,
    affiliateLinks: [
      {
        title: "كل المنتجات",
        link: "/products?searchin=products",
      },
      {
        title: "اضافة منتج",
        link: "/products/add-product",
      },
    ],
  },
  {
    title: "العملاء",
    icon: <FaPerson className={sameClass} />,
    affiliateLinks: [
      {
        title: "كل العملاء",
        link: "/clients?searchin=clients",
      },
      {
        title: "اضافة عميل",
        link: "/clients/add-client",
      },
    ],
  },
  {
    title: "الموردين",
    icon: <FaPeopleCarryBox className={sameClass} />,
    affiliateLinks: [
      {
        title: "كل الموردين",
        link: "/suppliers?searchin=suppliers",
      },
    ],
  },
  {
    title: "الموظفين",
    icon: <FaIdCardAlt className={sameClass} />,
    affiliateLinks: [
      {
        title: "كل الموظفين",
        link: "/workers?searchin=workers",
      },
      {
        title: "اضافة موظف",
        link: "/workers/add-worker",
      },
    ],
  },
];
