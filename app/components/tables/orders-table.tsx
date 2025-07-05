import { usePopup } from "@/app/utils/contexts/popup-contexts";
import OrdersTableRow from "../orders/orders-table-row";
import MainTable from "./main-table";
import BlackLayer from "../common/black-layer";
import OrderItemsPopUp from "../orders/order-items-popup";
import { OrderInterface } from "@/app/utils/types/interfaces";
import EditOrderPopup from "../forms & alerts/edit-order";
import NoData from "../common/no-data";
import { useReturns } from "@/app/utils/contexts/returns-contexts";
import InstallmentsPopUp from "../orders/installments-popup";

export default function OrdersTable({
  title,
  tableFor,
  data,
  refetch,
}: {
  title: string;
  tableFor: "client" | "overview";
  data: OrderInterface[];
  refetch?: any;
}) {
  const { closePopup, popupState } = usePopup();
  const { closeReturns } = useReturns();
  const headers = [
    "*",
    "العميل",
    "الطلبات",
    "الفاتورة",
    "ضريبة القيمة المضافة",
    "الخصم",
    "المصروف الاضافي",
    "الفاتورة بعد الضريبة والخصم",
    "طريقة الدفع",
    "حالة الدفع",
    "التاريخ",
    "العمليات",
  ];
  if (tableFor === "client") {
    headers.splice(1, 1);
  }
  const columns = [
    { name: "order.short_id", slug: "رقم الفاتورة" },
    { name: "client.user_name", slug: "العميل" },
  ];
  console.log(data);
  return (
    <>
      <MainTable
        title={title}
        headers={headers}
        filter={[tableFor === "client" ? false : true, "orders", columns]}
      >
        {data?.map((row, index) => (
          <OrdersTableRow
            key={index}
            id={row.id}
            client={{ client_id: row?.client?.id, name: row?.client?.user_name }}
            index={index + 1}
            earning={+row.total_price}
            payment_method={row.payment.payment_method}
            payment_status={row.payment.status}
            date={row.created_at}
            tableFor={tableFor}
            tax={row.tax}
            additional_fees={row.additional_fees}
            discount={row.discount}
            short_id={row.short_id}
            installment_type={row.payment.installment_type}
            down_payment={row.payment.down_payment}
            installment={row.payment.installment}
            next_payment_date={row.payment.next_payment_date}
          />
        ))}
      </MainTable>
      {data?.length === 0 && <NoData />}
      {popupState.ordersPopup.isOpen && (
        <BlackLayer
          onClick={() => {
            closePopup("ordersPopup");
            closeReturns();
          }}
        >
          <OrderItemsPopUp
            refetchOrders={refetch}
            index={popupState.ordersPopup.data.index}
            id={popupState.ordersPopup.data.id}
          />
        </BlackLayer>
      )}
      {popupState.editOrderPopup.isOpen && (
        <BlackLayer onClick={() => closePopup("editOrderPopup")}>
          <EditOrderPopup refetch={refetch} />
        </BlackLayer>
      )}
      {popupState.installmentsPopup.isOpen && (
        <BlackLayer onClick={() => closePopup("installmentsPopup")}>
          <InstallmentsPopUp />
        </BlackLayer>
      )}
    </>
  );
}
