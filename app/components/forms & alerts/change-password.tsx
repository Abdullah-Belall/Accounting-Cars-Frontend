import { sameTextField } from "@/app/utils/base";
import { usePopup } from "@/app/utils/contexts/popup-contexts";
import {
  CLIENT_COLLECTOR_REQ,
  UPDATE_PASSWORD_REQ,
} from "@/app/utils/requests/client-side.requests";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ChangePassword() {
  const [showPass, setShowPass] = useState([false, false, false]);
  const handleShowPass = (num: number) => {
    const showPassClone = [...showPass];
    showPassClone.splice(num, 1, !showPass[num]);
    setShowPass(showPassClone);
  };
  const [data, setData] = useState({
    password: "",
    new_password: "",
    confirm_new_password: "",
  });
  const { openPopup } = usePopup();
  const openSnakeBar = (message: string) => {
    openPopup("snakeBarPopup", { message });
  };
  const handleData = (key: keyof typeof data, value: string) => {
    setData({ ...data, [key]: value });
  };
  const vaildation = () => {
    const { password, new_password, confirm_new_password } = data;
    if (password.length > 24 || password.length < 9) {
      openSnakeBar("كلمة السر غير صالحة.");
      return false;
    }
    if (new_password.length > 24 || new_password.length < 9) {
      openSnakeBar("يجب ان تكون كلمة السر اكثر من 8 حروف واقل من 25 حرف.");
      return false;
    }
    if (new_password !== confirm_new_password) {
      openSnakeBar("كلمة السر الجديدة غير متطابقة.");
      return false;
    }
    return true;
  };
  const handleDone = async () => {
    if (!vaildation()) return;
    const response = await CLIENT_COLLECTOR_REQ(UPDATE_PASSWORD_REQ, {
      password: data.password,
      new_password: data.new_password,
    });
    if (response.done) {
      openPopup("snakeBarPopup", { message: "تم تغيير كلمة السر بنجاح.", type: "success" });
      setData({
        password: "",
        new_password: "",
        confirm_new_password: "",
      });
    } else {
      openSnakeBar(response.message);
    }
  };
  return (
    <div className="w-full flex flex-col gap-[10px]">
      <div className="w-full relative">
        <TextField
          id="Glu"
          label="كلمة السر الحالية"
          variant="filled"
          type={showPass[0] ? "text" : "password"}
          className="w-full"
          sx={sameTextField}
          value={data.password}
          onChange={(e) => handleData("password", e.target.value)}
        />
        <p
          onClick={() => handleShowPass(0)}
          className={"absolute left-[12px] top-[50%] translate-y-[-50%] cursor-pointer"}
        >
          {showPass[0] ? <FaEyeSlash /> : <FaEye />}
        </p>
      </div>
      <div className="w-full relative">
        <TextField
          id="Glu"
          label="كلمة السر الجديدة"
          variant="filled"
          type={showPass[1] ? "text" : "password"}
          className="w-full"
          sx={sameTextField}
          value={data.new_password}
          onChange={(e) => handleData("new_password", e.target.value)}
        />
        <p
          onClick={() => handleShowPass(1)}
          className={"absolute left-[12px] top-[50%] translate-y-[-50%] cursor-pointer"}
        >
          {showPass[1] ? <FaEyeSlash /> : <FaEye />}
        </p>
      </div>
      <div className="w-full relative">
        <TextField
          id="Glu"
          label="تأكيد كلمة السر الجديدة"
          variant="filled"
          type={showPass[2] ? "text" : "password"}
          className="w-full"
          sx={sameTextField}
          value={data.confirm_new_password}
          onChange={(e) => handleData("confirm_new_password", e.target.value)}
        />
        <p
          onClick={() => handleShowPass(2)}
          className={"absolute left-[12px] top-[50%] translate-y-[-50%] cursor-pointer"}
        >
          {showPass[2] ? <FaEyeSlash /> : <FaEye />}
        </p>
      </div>
      <div className="mt-4 mx-auto">
        <Button
          onClick={handleDone}
          sx={{ fontFamily: "cairo" }}
          className="!bg-myDark !text-lg !px-8 !py-2"
          variant="contained"
        >
          تأكيد
        </Button>
      </div>
    </div>
  );
}
