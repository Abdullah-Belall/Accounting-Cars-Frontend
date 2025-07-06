import { DropDownsInterface, PaidStatusEnum, PaymentMethodsEnum } from "./types/interfaces";

export const BaseWebsiteUrl = process.env.NEXT_PUBLIC_BASE_WEBSITE_URL || "http://localhost:3000";
export const BaseLogosUrl = `https://res.cloudinary.com/doy0la086/image/upload/`;
export const unCountedMessage = "هناك مشكلة ما, الرجاء المحاولة في وقت لاحق.";
export const formatDate = (input: string | Date) => {
  let date: Date;

  if (typeof input === "string") {
    const fixedString = input.replace(" ", "T"); // مع الـ offset
    date = new Date(fixedString);
  } else {
    date = new Date(input);
  }

  if (isNaN(date.getTime())) {
    return "تاريخ غير صالح";
  }

  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Cairo",
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const getPart = (type: string) => parts.find((p) => p.type === type)?.value || "";

  const hours = getPart("hour");
  const minutes = getPart("minute");
  const day = getPart("day");
  const month = getPart("month");
  const year = getPart("year");

  return `${day}-${month}-${year} ${hours}:${minutes}`;
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
  { value: PaidStatusEnum.INSTALLMENTS, label: "دفع بالأقساط" },
  { value: PaidStatusEnum.PENDING, label: "لم يدفع بعد" },
];
export const rolesArray = [
  { value: "boss", label: "نبض تك" },
  { value: "owner", label: "مالك" },
  { value: "reader", label: "مراقب" },
  { value: "admin", label: "موظف" },
];
export const periodsArray = [
  { value: "weekly", label: "اسبوع" },
  { value: "month", label: "شهري" },
  { value: "quarter", label: "ربع سنوي" },
  { value: "halfyear", label: "نصف سنوي" },
  { value: "year", label: "سنوي" },
];
