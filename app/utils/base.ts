import { DropDownsInterface, PaidStatusEnum, PaymentMethodsEnum } from "./types/interfaces";

export const BaseWebsiteUrl = process.env.NEXT_PUBLIC_BASE_WEBSITE_URL || "http://localhost:3000";
export const unCountedMessage = "هناك مشكلة ما, الرجاء المحاولة في وقت لاحق.";
export const formatDate = (inputDate: Date) => {
  const date = new Date(inputDate);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${hours}:${minutes} ${day}-${month}-${year}`;
};
export const getSlug = (arr: any, value: string) => {
  return arr.find((e: any) => e.value === value)?.label;
};
export const sameTextField = {
  "& .MuiFilledInput-root": {
    fontFamily: "cairo",
    "&:before": {
      borderBottomColor: "#495057",
    },
    "&:hover:not(.Mui-disabled):before": {
      borderBottomColor: "#495057",
    },
    "&:after": {
      borderBottomColor: "#495057",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#495057",
    fontFamily: "cairo",
    right: 16,
    left: "auto",
    transformOrigin: "top right",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#212529",
    right: 16,
    left: "auto",
    transformOrigin: "top right",
  },
  "& .MuiInputLabel-root.MuiFormLabel-filled": {
    right: 16,
    left: "auto",
    transformOrigin: "top right",
  },
  "& .MuiFilledInput-input": {
    caretColor: "#212529",
    textAlign: "right",
    fontSize: "14px",
  },
};
export const taxArray = [
  {
    value: "",
    label: "بدون ضريبة",
  },
  {
    value: "13%",
    label: "13%",
  },
  {
    value: "14%",
    label: "14%",
  },
];
export const methodsArray: DropDownsInterface[] = [
  { value: PaymentMethodsEnum.CASH, label: "كاش" },
  { value: PaymentMethodsEnum.BANK_TRANSFER, label: "تحويل بنكي" },
  { value: PaymentMethodsEnum.VF_CASH, label: "فودافون كاش" },
];

export const paidStatusArray: DropDownsInterface[] = [
  { value: PaidStatusEnum.PAID, label: "دفع الأن" },
  { value: PaidStatusEnum.PENDING, label: "لم يدفع بعد" },
];
