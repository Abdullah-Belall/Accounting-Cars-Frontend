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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [tenantsVars, setTenantsVars] = useState<{
    company_title: string;
    copmany_logo: string;
  }>();
  const isLoginRoute = pathname === "/log-in";
  useEffect(() => {
    const fetchData = async () => {
      const response = await GET_TENANT_VARS_REQ({ tenant_domain: window.location.hostname });
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
          <PopupProvider>
            <SearchProvider>
              <UserProvider>
                <ReturnsProvider>
                  <BillesProvider>
                    <CustomSnackbar />
                    {!isLoginRoute && <SideBar />}
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
