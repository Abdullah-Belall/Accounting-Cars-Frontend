"use client";
import "./globals.css";
import { cairo } from "./utils/fonts/main.font";
import SideBar from "./components/side-bar/side-bar";
import { usePathname } from "next/navigation";
import { PopupProvider } from "./utils/contexts/popup-contexts";
import CustomSnackbar from "./components/common/custom-snakebar";
import { UserProvider } from "./utils/contexts/UserContext";
import { useEffect, useState } from "react";
import { ReturnsProvider } from "./utils/contexts/returns-contexts";
import { BillesProvider } from "./utils/contexts/bills-contexts";
import ReturnsItemsPopupCus from "./components/popup-return-layout/return-cus-popup";
import { SearchProvider } from "./utils/contexts/search-results-contexts";
import { GET_TENANT_VARS_REQ } from "./utils/requests/client-side.requests";
import Header from "./components/header/header";
import { BaseLogosUrl } from "./utils/base";
import { PiListBold } from "react-icons/pi";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [tenantsVars, setTenantsVars] = useState<{
    company_title: string;
    copmany_logo: string;
  }>();
  const isLoginRoute = pathname === "/log-in";
  useEffect(() => {
    const fetchData = async () => {
      const response = await GET_TENANT_VARS_REQ({
        tenant_domain:
          process.env.NODE_ENV === "development" ? "localhost.com" : window.location.hostname,
      });
      if (response.done) {
        setTenantsVars(response.data);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (!tenantsVars) return;
    document.title = tenantsVars.company_title;
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = `${BaseLogosUrl}${tenantsVars.copmany_logo}`;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [tenantsVars]);

  return (
    <html lang="en">
      <body
        className={`${cairo.className} antialiased bg-myLight !text-secDark ${
          !isLoginRoute ? "mr-[0] md:mr-[240px] mt-[80px]" : ""
        }`}
      >
        <>
          <div
            onClick={() => setOpenSidebar(false)}
            className={`${!openSidebar && "hidden"} w-full h-full fixed left-0 top-0 bg-transparent z-30`}
          ></div>
          <div
            onClick={() => setOpenSidebar(!openSidebar)}
            className={`${openSidebar ? "right-[240px]" : "right-0"} z-30 duration-[.3s] absolute md:hidden z-10 top-[25%] text-lg cursor-pointer rounded-l-md bg-myLight p-2 text-myDark shadow-lg`}
          >
            <PiListBold />
          </div>
          <PopupProvider>
            <SearchProvider>
              <UserProvider>
                <ReturnsProvider>
                  <BillesProvider>
                    <CustomSnackbar />
                    {!isLoginRoute && <SideBar open={openSidebar} />}
                    {!isLoginRoute && <Header logo={tenantsVars?.copmany_logo as string} />}
                    {children}
                    <ReturnsItemsPopupCus />
                  </BillesProvider>
                </ReturnsProvider>
              </UserProvider>
            </SearchProvider>
          </PopupProvider>
        </>
      </body>
    </html>
  );
}
