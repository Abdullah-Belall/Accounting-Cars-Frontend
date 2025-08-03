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
import Link from "next/link";
import { BaseLogosUrl } from "@/app/utils/base";
// import axios from "axios";

export default function Header({ logo }: { logo: string }) {
  const router = useRouter();
  const [list, setList] = useState(false);
  // const [isAllowed, setIsAllowd] = useState(true);
  const { user, setUser } = useUser();
  const path = usePathname();
  const handleClose = () => {
    setList(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await CLIENT_COLLECTOR_REQ(GET_MY_PROFILE_REQ, {
        domain: window.location.pathname,
      });
      if (response.done) {
        setUser(response.data);
      } else {
        router.replace("/log-in");
      }
    };
    fetchData();
  }, []);
  // useEffect(() => {
  //   const isAllowed: any = async () => {
  //     const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL + "/api";
  //     try{
  //       const response = await axios.post(BASE_URL + '/tenants/check-independent-tenant', {tenant_id: user?.tenant_id})
  //       setIsAllowd(response.data?.allowed)
  //     } catch (err) {
  //       console.error(err);
  //       setIsAllowd(false)
  //     }
  //   }
  //   if(window.location.hostname === 'localhost' && user) {
  //     isAllowed()
  // }
  // }, [user])
  // useEffect(() => {
  //   if(!isAllowed) {
  //     router.replace('log-in')
  //   }
  // }, [isAllowed]);
  useEffect(() => {
    setList(false);
  }, [path]);
  return (
    <header className="fixed z-[21] left-0 top-0 bg-myLight w-full border-b border-b-mdLight shadow-b-md flex flex-row-reverse justify-between items-center">
      {list && (
        <>
          <TransparentLayer onClick={handleClose} />
          <div className="absolute top-[calc(100%+6px)] left-[5px]">
            <BasicList />
          </div>
        </>
      )}
      <div
        onClick={() => setList(!list)}
        className={`${
          list ? "bg-myHover" : ""
        } cursor-pointer px-mainxxl py-mainxl flex flex-row-reverse gap-[10px] items-center hover:bg-myHover`}
      >
        <div>{user?.user_name}</div>
        <Avatar sx={{ bgcolor: "#ced4da", color: "#343a40" }}>{user?.user_name.slice(0, 1)}</Avatar>
      </div>
      <Link href={"/"} className="font-bold mr-mainxxl">
        <Image width={70} height={70} src={`${BaseLogosUrl}${logo}`} alt={"لوجو"} />
      </Link>
    </header>
  );
}
