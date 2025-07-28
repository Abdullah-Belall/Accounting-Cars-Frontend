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
import DeleteAlert from "../forms & alerts/delete-alert";
import { shortIdGenerator } from "@/app/utils/base";
import { CLIENT_COLLECTOR_REQ, DELETE_ORDER_REQ } from "@/app/utils/requests/client-side.requests";

export default function OrdersTable({
  title,
  data,
  refetch,
  isForSelect,
}: {
  title: string;
  data: OrderInterface[];
  refetch?: any;
  isForSelect?: boolean;
}) {
  const { closePopup, popupState } = usePopup();
  const { closeReturns } = useReturns();
  const headers = [
    "#",
    "العميل",
    "السيارة",
    "الطلبات",
    "الخصم",
    "الفاتورة",
    "من حساب العميل",
    "التكلفة",
    "طريقة الدفع",
    "حالة الدفع",
    "التاريخ",
    "العمليات",
  ];
  const columns = [
    { name: "order.short_id", slug: "رقم الفاتورة" },
    { name: "client.user_name", slug: "العميل" },
    { name: "car.mark", slug: "السيارة" },
  ];
  return (
    <>
      <MainTable
        title={title}
        headers={headers}
        filter={title === "فواتير المبيعات" ? [true, "orders", columns] : [false, "orders", []]}
      >
        {data?.map((row, index) => (
          <OrdersTableRow
            key={index}
            id={row.id}
            client={{
              client_id: row?.car?.client?.id as string,
              name: row?.car?.client?.user_name as string,
            }}
            car={row?.car}
            index={index + 1}
            earning={+row.total_price_after}
            payment_method={row?.payment?.payment_method}
            payment_status={row?.payment?.status}
            date={row?.created_at}
            tax={row?.tax}
            additional_fees={row?.additional_fees}
            discount={row?.discount}
            short_id={row?.short_id}
            installment_type={row?.payment?.installment_type}
            down_payment={row?.payment?.down_payment}
            client_balance={row?.payment?.client_balance}
            installment={row?.payment?.installment}
            next_payment_date={row?.payment?.next_payment_date}
            isForSelect={isForSelect}
            total_cost_price={row?.total_cost_price}
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
            onClose={() => {
              closePopup("ordersPopup");
              closeReturns();
            }}
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
      {popupState.deleteAlertPopup.isOpen && (
        <BlackLayer onClick={() => closePopup("deleteAlertPopup")}>
          <DeleteAlert
            action="حذف"
            name={`هذه الفاتورة ${shortIdGenerator(popupState.deleteAlertPopup.data?.short_id)}`}
            onConfirm={async () => {
              const response = await CLIENT_COLLECTOR_REQ(DELETE_ORDER_REQ, {
                id: popupState.deleteAlertPopup.data?.id,
              });
              if (response.done) {
                refetch();
                closePopup("deleteAlertPopup");
              }
            }}
            warning={`عند حذف هذه الفاتورة سيتم ارجاع المال المؤخوذ من حساب العميل الي حسابه مرة اخري وسيتم حذف كل الدفعات المدفوعة وايضا اي مرتجع خاص بالفاتورة وسيتم ارجاع الكميات الي المخزن ولا يمكن التراجع عن هذا الاجراء`}
          />
        </BlackLayer>
      )}
    </>
  );
}
