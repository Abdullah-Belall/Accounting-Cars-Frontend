"use client";
import { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Button } from "@mui/material";
import { cairo } from "@/app/utils/fonts/main.font";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SidebarItemInterface } from "@/app/utils/types/interfaces";

export default function SideBarList({ title, icon, affiliateLinks }: SidebarItemInterface) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List className="w-full !py-0" component="nav" aria-labelledby="nested-list-subheader">
      <ListItemButton
        className="group flex-row-reverse !justify-between hover:bg-[red]! !rounded-md !px-mainxs !text-secDark !text-[16px] !font-[500] !py-1 hover:bg-myHover!"
        onClick={handleClick}
      >
        <div className="flex !items-center gap-[5px] py-1">
          {title}
          {icon}
        </div>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse className="mt-mainxs" in={open} timeout="auto" unmountOnExit>
        <List className="w-full flex flex-col gap-mainxs" component="div" disablePadding>
          {affiliateLinks.map((e) => (
            <Link key={e.title} className="w-full" href={e.link}>
              <Button
                className={`${
                  path === e.link.split("?")[0] ? "!bg-[#f1f1f1]" : ""
                } w-full group !rounded-md !justify-end !pe-[32px] !text-secDark !text-[16px] !font-[500] !py-1 hover:bg-myHover!`}
                variant="text"
                sx={{ fontFamily: cairo.style.fontFamily }}
              >
                {e.title}
              </Button>
            </Link>
          ))}
        </List>
      </Collapse>
    </List>
  );
}
