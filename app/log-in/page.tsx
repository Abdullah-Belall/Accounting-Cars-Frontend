"use client";
import { Button, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { usePopup } from "../utils/contexts/popup-contexts";
import { LOGIN_REQ } from "../utils/requests/client-side.requests";
import { useRouter } from "next/navigation";
import { sameTextField, unCountedMessage } from "../utils/base";

export default function LogIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [data, setData] = useState({
    user_name: "",
    password: "",
  });
  const { openPopup } = usePopup();
  const openSnakeBar = (message: string) => {
    openPopup("snakeBarPopup", { message });
  };
  const handleData = (
    key: keyof typeof data,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({ ...data, [key]: e.target.value });
  };
  const vaildation = () => {
    const { user_name, password } = data;
    if (user_name.length < 2) {
      openSnakeBar("اسم المستخدم غير صالح.");
      return false;
    }
    if (password.length < 9 || password.length > 24) {
      openSnakeBar("كلمة السر غير صحيحة.");
      return false;
    }
    return true;
  };
  const handleDone = async () => {
    if (loading) return;
    if (!vaildation()) return;
    setLoading(true);
    const response = await LOGIN_REQ(data);
    console.log(response);
    setLoading(false);
    if (response.done) {
      router.replace("/");
    } else {
      openSnakeBar(response?.message || unCountedMessage);
    }
  };
  return (
    <div className="bg-mdDark w-full h-dvh flex justify-center items-center">
      <div className="rounded-md shadow-lg min-w-[320px] bg-myLight p-mainxl flex flex-col justify-center items-center gap-[20px]">
        <h1 className="font-semibold text-[25px]">تسجيل الدخول</h1>
        <div className="w-full flex flex-col gap-[15px]">
          <TextField
            id="Glu"
            dir="rtl"
            label="اسم المستخدم"
            variant="filled"
            className="w-full"
            sx={sameTextField}
            value={data.user_name}
            onChange={(e) => handleData("user_name", e)}
          />
          <div className="w-full relative">
            <TextField
              id="Glu"
              label="كلمة السر"
              variant="filled"
              type={showPass ? "text" : "password"}
              className="w-full"
              sx={sameTextField}
              value={data.password}
              onChange={(e) => handleData("password", e)}
            />
            <p
              onClick={() => setShowPass(!showPass)}
              className={"absolute left-[12px] top-[50%] translate-y-[-50%] cursor-pointer"}
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </p>
          </div>
        </div>
        <Button
          onClick={handleDone}
          sx={{ fontFamily: "cairo" }}
          className="!bg-mdDark"
          variant="contained"
        >
          تسجيل الدخول
        </Button>
      </div>
    </div>
  );
}
