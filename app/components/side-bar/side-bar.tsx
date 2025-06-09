"use client";
import { cairo } from "@/app/utils/fonts/main.font";
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import { Button } from "@mui/material";
import SideBarList from "./side-bar-list";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { FaPerson } from "react-icons/fa6";
import { FaIdCardAlt } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { FiCodesandbox } from "react-icons/fi";
import Link from "next/link";
import { RiBillLine } from "react-icons/ri";

export default function SideBar() {
  const path = usePathname();
  const dataItems = useMemo(
    () =>
      sideBarItems.map((item, index) => (
        <SideBarList
          key={index}
          title={item.title}
          icon={item.icon}
          affiliateLinks={item.affiliateLinks}
        />
      )),
    []
  );

  return (
    <aside className="overflow-y-scroll flex flex-col gap-2 px-mainxs pb-[20px] pt-[80px] fixed right-0 top-0 w-[240px] h-dvh bg-myLight border-l-3 border-[#eee]">
      <Link className="w-full" href={"/"}>
        <Button
          className={`${
            path === "/" ? "!bg-[#f1f1f1]" : ""
          } group w-full !rounded-md !text-start !px-mainxs !flex !gap-[5px] !items-center !justify-end !text-secDark !text-[16px] !font-[500] !py-1 hover:bg-myHover!`}
          variant="text"
          sx={{ fontFamily: cairo.style.fontFamily }}
        >
          الواجهة الرئيسية
          <HomeFilledIcon fontSize="small" className="opacity-50 group-hover:opacity-100" />
        </Button>
      </Link>
      <Link className="w-full" href={"/categories"}>
        <Button
          className={`${
            path === "/categories" ? "!bg-[#f1f1f1]" : ""
          } group w-full !rounded-md !text-start !px-mainxs !flex !gap-[5px] !items-center !justify-end !text-secDark !text-[16px] !font-[500] !py-1 hover:bg-myHover!`}
          variant="text"
          sx={{ fontFamily: cairo.style.fontFamily }}
        >
          الفئات
          <BiCategory className="opacity-50 group-hover:opacity-100" />
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
