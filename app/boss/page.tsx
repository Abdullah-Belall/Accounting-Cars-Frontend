"use client";
import { useEffect, useState } from "react";
import { CLIENT_COLLECTOR_REQ, GET_ALL_TENANTS_REQ } from "../utils/requests/client-side.requests";
import { useRouter } from "next/navigation";
import NoData from "../components/common/no-data";
import MainTable from "../components/tables/main-table";
import { BaseLogosUrl, formatDate } from "../utils/base";
import { Button } from "@mui/material";
import { CiEdit } from "react-icons/ci";
import TenantForm from "../components/boss/tenant-form";

export default function Boss() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [tenantId, setTenantId] = useState();
  const [openTenant, setOpenTenant] = useState([
    false,
    {
      tenant_domain: "",
      phone: "",
      user_name: "",
      password: "",
      title: "",
      logo: "",
      telegram_chat_id: "",
    },
  ]);

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
              telegram_chat_id: "",
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
          "العمليات",
          "تاريخ الاضافة",
          "معرف التليجرام",
          "رقم هاتف",
          "اللوجو",
          "الدومين",
          "اسم الشركة",
          "المعرف",
          "#",
        ]}
      >
        {data?.map((row: any, index) => (
          <tr key={index}>
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
                      telegram_chat_id: row.telegram_chat_id || "",
                    },
                  ]);
                  setTenantId(row?.tenant_id);
                }}
                className="w-fit mx-auto text-xl hover:text-orange-600 cursor-pointer text-anotherDark"
              >
                <CiEdit />
              </p>
            </td>
            <td className="px-4 py-2 text-center">{formatDate(row?.created_at)}</td>
            <td className="px-4 py-2 text-center">{row.telegram_chat_id ?? "لا يوجد"}</td>
            <td className={`px-4 py-2 text-center`}>
              {row?.phone?.trim().length > 0 ? row?.phone?.trim() : "لا يوجد"}
            </td>
            <td className={`px-4 py-2 text-center`}>
              <a
                className="hover:underline"
                href={BaseLogosUrl + row?.company_logo}
                target="_blank"
              >
                {row?.company_logo}
              </a>
            </td>
            <td className={`px-4 py-2 text-center`}>
              <a className="hover:underline" href={`https://${row?.domain}`} target="_blank">
                {row?.domain}
              </a>
            </td>
            <td className={`px-4 py-2 text-center`}>{row?.company_title}</td>
            <td className={`px-4 py-2 text-center`}>{row?.tenant_id}</td>
            <td className={`px-4 py-2 text-center`}>{index + 1}</td>
          </tr>
        ))}
      </MainTable>
      {data?.length === 0 && <NoData />}
      {openTenant[0] && (
        <TenantForm
          id={tenantId}
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
                telegram_chat_id: "",
              },
            ])
          }
          payload={openTenant[1] as any}
          fetchData={fetchData}
        />
      )}
    </div>
  );
}
