"use client";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { createCustomTheme } from "@/app/utils/theme";
import { useEffect, useState } from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState(createCustomTheme());

  useEffect(() => {
    // إعادة إنشاء theme عند تغيير CSS variables
    const updateTheme = () => {
      setTheme(createCustomTheme());
    };

    // مراقبة تغييرات CSS variables
    const observer = new MutationObserver(() => {
      updateTheme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });

    // تحديث theme عند تحميل الصفحة
    updateTheme();

    return () => {
      observer.disconnect();
    };
  }, []);

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
