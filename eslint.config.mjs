import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      // "@typescript-eslint/no-unused-vars": "off", // تعطيل التحقق من المتغيرات غير المستخدمة
      // "@typescript-eslint/no-unused-expressions": "off", // تعطيل التحقق من التعبيرات غير المستخدمة
      "react-hooks/exhaustive-deps": "off", // تعطيل تحذيرات تبعيات useEffect
    },
  },
];

export default eslintConfig;
