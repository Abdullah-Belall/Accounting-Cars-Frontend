import NoData from "../common/no-data";
import HomeTableRow from "../home/home-table-row";
import MainTable from "./main-table";

export default function HomeTable() {
  return (
    <>
      <MainTable
        title="النتائج العامة للأشهر السابقة"
        headers={[
          "الزبائن الجدد",
          "المنتجات المرتجعة",
          "المنتجات المباعة",
          "إجمالي الأرباح",
          "الشهر",
        ]}
      >
        {data.map((row, index) => (
          <HomeTableRow
            key={index}
            clients={row.clients}
            returned={row.returned}
            sold={row.sold}
            total={row.total}
            month={row.month}
          />
        ))}
      </MainTable>
      {data.length === 0 && <NoData />}
    </>
  );
}

const data = [
  { clients: 12, returned: 5, sold: 150, total: 24000, month: "يناير" },
  { clients: 20, returned: 3, sold: 200, total: 35000, month: "فبراير" },
  { clients: 18, returned: 6, sold: 170, total: 28500, month: "مارس" },
  { clients: 22, returned: 12, sold: 210, total: 32400, month: "ابريل" },
  { clients: 25, returned: 4, sold: 230, total: 39000, month: "مايو" },
  { clients: 30, returned: 2, sold: 260, total: 42000, month: "يونيو" },
  { clients: 28, returned: 5, sold: 240, total: 40500, month: "يوليو" },
  { clients: 35, returned: 6, sold: 300, total: 48000, month: "أغسطس" },
  { clients: 40, returned: 3, sold: 350, total: 52000, month: "سبتمبر" },
];
