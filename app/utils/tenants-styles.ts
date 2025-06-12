const TenantsSTyles = [
  {
    tenant_id: "83e49b265497",
    common: {
      logoURL: "https://res.cloudinary.com/doy0la086/image/upload/logo_eizrnt.png",
      title: "AL MANAR",
    },
  },
];
export const getTenantsStyle = (domain: string) => {
  const allDomains = process.env.NEXT_PUBLIC_TENANTS_DOMAINS;
  const array = allDomains
    ?.split("&&")
    .map((e) => ({ tenant_id: e.split("!!")[0], domain: e.split("!!")[1] }));
  const tenant_id = array?.find((e) => e.domain === domain)?.tenant_id;
  return TenantsSTyles.find((e) => e.tenant_id === tenant_id);
};
