"use client";
import "./globals.css";
import { cairo } from "./utils/fonts/main.font";
import SideBar from "./components/side-bar/side-bar";
import Header from "./components/header/header";
import { usePathname } from "next/navigation";
import { PopupProvider } from "./utils/contexts/popup-contexts";
import CustomSnackbar from "./components/common/custom-snakebar";
import { UserProvider } from "./utils/contexts/UserContext";
import { useEffect } from "react";
import { ReturnsProvider } from "./utils/contexts/returns-contexts";
import { BillesProvider } from "./utils/contexts/bills-contexts";
import ReturnsItemsPopupCus from "./components/popup-return-layout/return-cus-popup";
import { SearchProvider } from "./utils/contexts/search-results-contexts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLoginRoute = pathname === "/log-in";
  useEffect(() => {
    document.title = "AL MANAR";

    const link = document.createElement("link");
    link.rel = "icon";
    link.href = "/logo.png";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <html lang="en">
      <body
        className={`${cairo.className} antialiased bg-myLight !text-secDark ${
          !isLoginRoute ? "mr-[240px] mt-[80px]" : ""
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
                    {!isLoginRoute && <Header />}
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
