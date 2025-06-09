"use client";
import Snackbar from "@mui/material/Snackbar";
import Slide, { SlideProps } from "@mui/material/Slide";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import { Alert } from "@mui/material";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

const Msg = ({ msg, type }: { msg: string; type: "success" | "error" }) => {
  return (
    <Alert
      severity={type}
      dir="rtl"
      sx={{
        "& .MuiAlert-icon": {
          margin: "0 0 0 6px",
        },
      }}
      style={{ fontFamily: "cairo" }}
    >
      {msg}
    </Alert>
  );
};

export default function CustomSnackbar() {
  const { popupState, closeSnakeBarPopup } = usePopup();
  const handleClose = () => {
    console.log("custom close");
    closeSnakeBarPopup("snakeBarPopup");
  };

  return (
    <div>
      <Snackbar
        open={popupState.snakeBarPopup.isOpen}
        onClose={handleClose}
        slots={{ transition: SlideTransition }}
        message={
          <Msg
            msg={popupState.snakeBarPopup.data.message}
            type={popupState.snakeBarPopup.data.type ?? "error"}
          />
        }
        key={popupState.snakeBarPopup.data.message + Date.now()}
        autoHideDuration={3000}
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: "transparent !important",
            boxShadow: "none !important",
          },
        }}
      />
    </div>
  );
}

// MuiPaper-root MuiPaper-elevation MuiPaper-elevation6 MuiSnackbarContent-root css-1wckuhe-MuiPaper-root-MuiSnackbarContent-root
