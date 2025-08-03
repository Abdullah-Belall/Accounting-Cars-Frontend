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
import { SearchProvider } from "./utils/contexts/search-results-contexts";
import { GET_TENANT_VARS_REQ } from "./utils/requests/client-side.requests";
import Header from "./components/header/header";
import { BaseLogosUrl } from "./utils/base";
import { PiListBold } from "react-icons/pi";
import { StockChecksProvider } from "./utils/contexts/stock-checks-contexts";
import { WorkerSalaryProvider } from "./utils/contexts/paying-salaries-context";

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
    const currentDomain = window.location.hostname;
    const fetchData = async () => {
      const response = await GET_TENANT_VARS_REQ({
        tenant_domain: process.env.NODE_ENV === "development" ? "localhost.com" : currentDomain,
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
        dir="rtl"
        className={`${cairo.className} antialiased bg-myLight !text-secDark ${
          !isLoginRoute && "mr-[0] md:mr-[240px] mt-[80px]"
        }`}
      >
        <>
          <div
            onClick={() => setOpenSidebar(false)}
            className={`${
              !openSidebar && "hidden"
            } w-full h-full fixed left-0 top-0 bg-transparent z-30`}
          ></div>
          <div
            onClick={() => setOpenSidebar(!openSidebar)}
            className={`!shadow-2xl ${
              openSidebar ? "right-[240px] !bg-white !text-mdDark" : "right-0"
            } ${
              isLoginRoute && "hidden"
            } z-30 backdrop-blur-[5px] duration-[.3s] fixed md:hidden z-10 top-[25%] text-lg cursor-pointer rounded-l-md bg-[#4950575d] p-2 text-myLight`}
          >
            <PiListBold />
          </div>
          <PopupProvider>
            <SearchProvider>
              <UserProvider>
                <ReturnsProvider>
                  <BillesProvider>
                    <StockChecksProvider>
                      <WorkerSalaryProvider>
                        <CustomSnackbar />
                        {!isLoginRoute && (
                          <SideBar open={openSidebar} onClose={() => setOpenSidebar(false)} />
                        )}
                        {!isLoginRoute && <Header logo={tenantsVars?.copmany_logo as string} />}
                        {children}
                      </WorkerSalaryProvider>
                    </StockChecksProvider>
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
