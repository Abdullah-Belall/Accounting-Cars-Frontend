"use client";
import { Avatar } from "@mui/material";
import BasicList from "./header-list";
import { useEffect, useState } from "react";
import TransparentLayer from "../common/transparent-layer";
import {
  CLIENT_COLLECTOR_REQ,
  GET_MY_PROFILE_REQ,
} from "@/app/utils/requests/client-side.requests";
import { useUser } from "@/app/utils/contexts/UserContext";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/public/Logo.jpg";
import Link from "next/link";

export default function Header() {
  const router = useRouter();
  const [list, setList] = useState(false);
  const { user, setUser } = useUser();
  const path = usePathname();
  const handleClose = () => {
    setList(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await CLIENT_COLLECTOR_REQ(GET_MY_PROFILE_REQ);
      if (response.done) {
        setUser(response.data);
      } else {
        router.replace("/log-in");
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    setList(false);
  }, [path]);
  return (
    <header className="fixed z-20 left-0 top-0 bg-myLight w-full border-b border-b-mdLight shadow-b-md flex flex-row-reverse justify-between items-center">
      {list && (
        <>
          <TransparentLayer onClick={handleClose} />
          <div className="absolute top-[calc(100%+6px)] left-[5px]">
            <BasicList />
          </div>
        </>
      )}
      <Link href={"/"} className="font-bold mr-mainxxl">
        <Image width={70} height={70} src={logo} alt={"لوجو"} />
      </Link>
      <div
        onClick={() => setList(!list)}
        className={`${
          list ? "bg-myHover" : ""
        } cursor-pointer px-mainxxl py-mainxl flex flex-row-reverse gap-[10px] items-center hover:bg-myHover`}
      >
        <Avatar sx={{ bgcolor: "#ced4da", color: "#343a40" }}>{user?.user_name.slice(0, 1)}</Avatar>
        <div>{user?.user_name}</div>
      </div>
    </header>
  );
}
