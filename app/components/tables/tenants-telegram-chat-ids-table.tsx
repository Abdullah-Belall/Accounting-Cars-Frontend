import { TenantChatIdInterface } from "@/app/utils/types/interfaces";
import MainTable from "./main-table";
import NoData from "../common/no-data";
import TenantsTelegramChatIdsTableRow from "../tenants/tenants-telegram-chat-ids-table-row";

export default function TenantsTelegramChatIdsTable({ data }: { data: TenantChatIdInterface[] }) {
  const headers = ["#", "رقم الدردشة", "تاريخ الانشاء", "العمليات"];

  return (
    <div className="px-mainxs">
      <MainTable title={"كل ارقام الدردشات"} headers={headers} isPopup={true}>
        {data?.map((row, index) => (
          <TenantsTelegramChatIdsTableRow key={row.id} index={index} data={row} />
        ))}
      </MainTable>
      {data?.length === 0 && <NoData />}
    </div>
  );
}
