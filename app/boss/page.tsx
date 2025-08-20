"use client";
import { useEffect, useState } from "react";
import { CLIENT_COLLECTOR_REQ, GET_ALL_TENANTS_REQ } from "../utils/requests/client-side.requests";
import { useRouter } from "next/navigation";
import NoData from "../components/common/no-data";
import MainTable from "../components/tables/main-table";
import { BaseLogosUrl, formatDate, notFoundSlug } from "../utils/base";
import { Button } from "@mui/material";
import { CiEdit } from "react-icons/ci";
import TenantForm from "../components/boss/tenant-form";
import { usePopup } from "../utils/contexts/popup-contexts";
import BlackLayer from "../components/common/black-layer";
import { TbCircleXFilled } from "react-icons/tb";
import TenantsTelegramChatIdsTable from "../components/tables/tenants-telegram-chat-ids-table";
import AddTenantChatIdForm from "../components/forms & alerts/add-tenant-chat-id-form";

export default function Boss() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [tenantId, setTenantId] = useState<string | null>(null);
  const { popupState, openPopup, closePopup } = usePopup();
  const [openTenant, setOpenTenant] = useState([
    false,
    {
      tenant_domain: "",
      phone: "",
      user_name: "",
      password: "",
      title: "",
      logo: "",
      bill_path: "",
      theme: "",
    },
  ]);
  const [addChatId, setAddChatId] = useState(false);
  const fetchData = async () => {
    const response = await CLIENT_COLLECTOR_REQ(GET_ALL_TENANTS_REQ);
    if (response.done) {
      setData(response.data?.tenants);
    } else {
      router.replace("/");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="w-full px-mainxs relative">
        <Button
          onClick={() =>
            setOpenTenant([
              true,
              {
                tenant_domain: "",
                phone: "",
                user_name: "",
                password: "",
                title: "",
                logo: "",
                bill_path: "",
                theme: "",
              },
            ])
          }
          sx={{ fontFamily: "cairo" }}
          className="!bg-mdDark !absolute !left-[12px] !top-0 cursor-pointer z-20"
          variant="contained"
        >
          اضافة مستأجر جديد
        </Button>
        <MainTable
          title="كل المستأجرين"
          headers={[
            "#",
            "المعرف",
            "اسم الشركة",
            "الدومين",
            "الفاتورة",
            "اللوجو",
            "الالوان",
            "رقم هاتف",
            "تاريخ الاضافة",
            "العمليات",
          ]}
        >
          {data?.map((row: any, index) => (
            <tr key={index}>
              <td className={`px-4 py-2 text-center`}>{index + 1}</td>
              <td
                onClick={() =>
                  openPopup("tenantChatIds", { chat_ids: row.chat_ids, tenant_id: row.tenant_id })
                }
                className={`px-4 py-2 text-center`}
              >
                <p className="cursor-pointer font-semibold hover:no-underline underline w-fit mx-auto">
                  {row?.tenant_id}
                </p>
              </td>
              <td className={`px-4 py-2 text-center`}>{row?.company_title}</td>
              <td className={`px-4 py-2 text-center`}>{row?.domain}</td>
              <td className={`px-4 py-2 text-center`}>{notFoundSlug(row?.bill_path)}</td>
              <td className={`px-4 py-2 text-center`}>
                <a
                  className="hover:underline"
                  href={BaseLogosUrl + row?.company_logo}
                  target="_blank"
                >
                  {row?.company_logo}
                </a>
              </td>
              <td className={`px-4 py-2 text-center`}>{notFoundSlug(row?.theme)}</td>
              <td className={`px-4 py-2 text-center`}>
                {row?.phone?.trim().length > 0 ? row?.phone?.trim() : "لا يوجد"}
              </td>
              <td className="px-4 py-2 text-center">{formatDate(row?.created_at)}</td>
              <td className="px-4 py-2 text-center">
                <p
                  onClick={() => {
                    setOpenTenant([
                      true,
                      {
                        tenant_domain: row?.domain,
                        phone: row?.phone || "",
                        user_name: "",
                        password: "",
                        title: row?.company_title,
                        logo: row?.company_logo,
                        bill_path: row.bill_path || "",
                        theme: row.theme || "",
                      },
                    ]);
                    setTenantId(row?.tenant_id);
                  }}
                  className="w-fit mx-auto text-xl hover:text-orange-600 cursor-pointer text-anotherDark"
                >
                  <CiEdit />
                </p>
              </td>
            </tr>
          ))}
        </MainTable>
        {data?.length === 0 && <NoData />}
        {openTenant[0] && (
          <TenantForm
            id={tenantId as string}
            closePopup={() =>
              setOpenTenant([
                false,
                {
                  tenant_domain: "",
                  phone: "",
                  user_name: "",
                  password: "",
                  title: "",
                  logo: "",
                  bill_path: "",
                  theme: "",
                },
              ])
            }
            payload={openTenant[1] as any}
            fetchData={fetchData}
          />
        )}
      </div>
      {popupState.tenantChatIds.isOpen && (
        <BlackLayer onClick={() => closePopup("tenantChatIds")}>
          <div className="w-full sm:w-[640px] px-mainxs">
            <div className={"relative bg-myLight rounded-xl shadow-md p-mainxs"}>
              <button
                onClick={() => closePopup("tenantChatIds")}
                className="flex justify-center items-center w-[25px] h-[25px] bg-background rounded-[50%] z-[5] cursor-pointer absolute right-[-10px] top-[-10px] "
              >
                <TbCircleXFilled className="min-w-[30px] min-h-[30px]" />
              </button>
              <Button
                onClick={() => setAddChatId(true)}
                sx={{ fontFamily: "cairo" }}
                className="!bg-mdDark !absolute !left-[17px] !top-[8px] !z-[2]"
                variant="contained"
              >
                اضافة معرف تليجرام
              </Button>
              <TenantsTelegramChatIdsTable data={popupState.tenantChatIds.data?.chat_ids || []} />
            </div>
          </div>
        </BlackLayer>
      )}
      {addChatId && (
        <BlackLayer onClick={() => setAddChatId(false)}>
          <AddTenantChatIdForm
            onDone={() => {
              setAddChatId(false);
              closePopup("tenantChatIds");
              fetchData();
            }}
            tenantId={popupState.tenantChatIds.data?.tenant_id as string}
          />
        </BlackLayer>
      )}
      {popupState.editTenantChatId.isOpen && (
        <BlackLayer onClick={() => closePopup("editTenantChatId")}>
          <AddTenantChatIdForm
            onDone={() => {
              closePopup("editTenantChatId");
              closePopup("tenantChatIds");
              fetchData();
            }}
            tenantId={popupState.editTenantChatId.data?.tenant_id as string}
            isForEdit={popupState.editTenantChatId.data}
          />
        </BlackLayer>
      )}
    </>
  );
}
