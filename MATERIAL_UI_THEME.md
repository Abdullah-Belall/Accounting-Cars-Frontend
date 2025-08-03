# Material UI Theme Integration

## المشكلة

كانت مكونات Material UI لا تتأثر بالمتغيرات CSS المخصصة (`--mdDark`, `--myDark`, إلخ) وكانت تستخدم الألوان الافتراضية الخاصة بها.

## الحل

تم إنشاء نظام Theme مخصص لـ Material UI يستخدم المتغيرات CSS المخصصة.

## الملفات المضافة

### 1. `app/utils/theme.ts`

- يحتوي على دالة `createCustomTheme()` التي تنشئ theme ديناميكي
- يستخدم CSS variables للحصول على الألوان المخصصة
- يدعم SSR مع قيم افتراضية

### 2. `app/components/common/theme-provider.tsx`

- Theme Provider component
- يراقب تغييرات CSS variables ويحدث theme تلقائياً
- يغلف جميع مكونات Material UI

## التحديثات

### 1. `app/layout.tsx`

- تم إضافة `ThemeProvider` ليشمل جميع المكونات

### 2. `app/utils/base.ts`

- تم إزالة `sameTextField` لأننا نستخدم Theme بدلاً منه

### 3. `app/components/forms & alerts/add-address.tsx`

- تم إزالة استخدام `sameTextField`
- تم تبسيط مكونات TextField و Button

## كيفية الاستخدام

### قبل التحديث:

```tsx
import { TextField, Button } from "@mui/material";


<TextField
  variant="filled"
  sx={sameTextField}
/>
<Button sx={{ fontFamily: "cairo" }} variant="contained">
```

### بعد التحديث:

```tsx
import { TextField, Button } from "@mui/material";

<TextField variant="filled" />
<Button variant="contained">
```

## المميزات

1. **تطبيق تلقائي للألوان**: جميع مكونات Material UI تستخدم الألوان المخصصة تلقائياً
2. **دعم RTL**: تم تكوين Theme لدعم الاتجاه من اليمين لليسار
3. **خط Cairo**: جميع المكونات تستخدم خط Cairo تلقائياً
4. **تحديث ديناميكي**: عند تغيير CSS variables يتم تحديث Theme تلقائياً
5. **دعم SSR**: يعمل مع Server-Side Rendering

## المكونات المدعومة

- TextField (مع دعم RTL)
- Button
- Chip
- Checkbox
- Radio
- ListItemText
- Snackbar

## ملاحظات مهمة

- لا حاجة لاستخدام `sx` prop للألوان الأساسية
- يمكنك إضافة `sx` للتخصيصات الإضافية فقط
- جميع المكونات تستخدم الألوان المخصصة تلقائياً
