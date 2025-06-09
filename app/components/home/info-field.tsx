export default function InfoField({
  title,
  total,
  uom,
}: {
  title: string;
  total: number;
  uom?: string;
}) {
  const formattedTotal = total?.toLocaleString();

  return (
    <div
      dir="rtl"
      className="flex flex-col bg-myHover border border-mdLight rounded-md w-full px-[15px] py-[30px] shadow-md"
    >
      <h1 className="font-semibold">
        {formattedTotal} {uom ?? ""}
      </h1>
      {title}
    </div>
  );
}
