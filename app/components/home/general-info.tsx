import { CalcsInterface } from "@/app/utils/types/interfaces";
import InfoField from "./info-field";

export default function GeneralInfo({ data }: { data: CalcsInterface }) {
  return (
    <section className="w-full flex flex-col items-end">
      <h1 className="font-bold mb-[15px]">التحاليل العامة</h1>
      <div dir="rtl" className="w-full flex gap-[10px] justify-center items-center">
        <InfoField
          title={"اجمالي تكاليف بضاعة المخزون الحالية"}
          total={data?.totalCostsPrice}
          uom={`ج.م`}
        />
        <InfoField
          title={"اجمالي اسعار بضاعة المخزون الحالية"}
          total={data?.totalSortsPrices}
          uom={`ج.م`}
        />
      </div>
    </section>
  );
}
