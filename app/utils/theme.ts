import { createTheme } from "@mui/material/styles";

// دالة لإنشاء theme ديناميكي يستخدم CSS variables
export const createCustomTheme = () => {
  // الحصول على قيم CSS variables
  const getCSSVariable = (variableName: string) => {
    if (typeof window !== "undefined") {
      return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
    }
    // قيم افتراضية للـ SSR
    const defaultValues: { [key: string]: string } = {
      "--mdDark": "#495057",
      "--myDark": "#212529",
      "--myLight": "#f8f9fa",
      "--myHover": "#f1f1f1",
      "--background": "#e3e3e3",
      "--foreground": "#adb5bd",
    };
    return defaultValues[variableName] || "#495057";
  };

  const mdDark = getCSSVariable("--mdDark");
  const myDark = getCSSVariable("--myDark");
  const myLight = getCSSVariable("--myLight");
  const myHover = getCSSVariable("--myHover");

  return createTheme({
    direction: "rtl",
    palette: {
      primary: {
        main: mdDark,
        contrastText: myLight,
      },
      secondary: {
        main: myDark,
        contrastText: myLight,
      },
      text: {
        primary: mdDark,
        secondary: myDark,
      },
      background: {
        default: myLight,
        paper: myLight,
      },
      action: {
        hover: myHover,
      },
    },
    typography: {
      fontFamily: "cairo, Arial, sans-serif",
      allVariants: {
        fontFamily: "cairo, Arial, sans-serif",
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiFilledInput-root": {
              fontFamily: "cairo",
              "&:before": {
                borderBottomColor: mdDark,
              },
              "&:hover:not(.Mui-disabled):before": {
                borderBottomColor: mdDark,
              },
              "&:after": {
                borderBottomColor: mdDark,
              },
            },
            "& .MuiInputLabel-root": {
              color: mdDark,
              fontFamily: "cairo",
              caretColor: `${mdDark} !important`,
              right: 16,
              left: "auto",
              transformOrigin: "top right",
              "&.Mui-focused": {
                color: `${mdDark} !important`,
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: `${mdDark} !important`,
              caretColor: `${mdDark} !important`,
              right: 16,
              left: "auto",
              transformOrigin: "top right",
            },
            "& .MuiInputLabel-root.MuiFormLabel-filled": {
              right: 16,
              left: "auto",
              caretColor: `${mdDark} !important`,
              transformOrigin: "top right",
              color: mdDark,
            },
            "& .MuiFilledInput-input": {
              caretColor: mdDark,
              textAlign: "right",
              fontSize: "14px",
            },
            "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiFormLabel-filled": {
              color: `${mdDark} !important`,
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontFamily: "cairo",
            textTransform: "none",
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontFamily: "cairo",
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            "&.Mui-checked": {
              color: mdDark,
            },
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            "&.Mui-checked": {
              color: mdDark,
            },
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          root: {
            "& .MuiTypography-root": {
              fontFamily: "cairo",
            },
          },
        },
      },
      MuiSnackbar: {
        styleOverrides: {
          root: {
            "& .MuiSnackbarContent-root": {
              backgroundColor: "transparent !important",
              boxShadow: "none !important",
            },
          },
        },
      },
    },
  });
};
