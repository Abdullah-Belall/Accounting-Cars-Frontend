"use client";
import { CarsInterface } from "@/app/utils/types/interfaces";
import MainTable from "./main-table";
import NoData from "../common/no-data";
import CarsTableRow from "../cars/cars-table-row";

export default function CarsTable({
  data,
  title,
  order,
}: {
  data: CarsInterface[];
  title: string;
  order?: boolean;
}) {
  return (
    <>
      <MainTable
        title={title}
        headers={[
          "#",
          "العميل",
          "العلامة",
          "رقم اللوحة",
          "اللون",
          "النوع",
          "الفئة",
          "الموديل",
          "رقم الشاسية",
          "تاريخ الاضافة",
          "العمليات",
        ]}
        isPopup={order}
      >
        {data?.map((row, index) => (
          <CarsTableRow key={index} data={{ ...row, index }} isOrder={order} />
        ))}
      </MainTable>
      {data?.length === 0 && <NoData />}
    </>
  );
}
