import SearchInput from "../filtaraion/search-input/search-input";

export default function MainTable({
  title,
  children,
  headers,
  filter,
}: {
  title: string;
  headers: string[];
  filter?: [boolean, string, { name: string; slug: string }[]];
  children: React.ReactNode;
}) {
  const header = headers.map((e, i) => (
    <th key={i} className="px-4 py-3 text-center sticky top-0 bg-myHover z-10">
      {e}
    </th>
  ));

  return (
    <div>
      <div className="relative">
        <h1 className="mb-2 w-fit text-lg font-semibold text-myDark text-nowrap ml-auto">
          {title}
        </h1>
        <div dir="rtl" className="flex items-center justify-between mb-2">
          {filter?.[0] && (
            <>
              <SearchInput searchin={filter[1]} columns={filter[2]} />
              {/* <AppliedFilters /> */}
            </>
          )}
        </div>
        {/* <div className="absolute left-[20px] bottom-[-8px] w-[200px] h-[40px] bg-[red] rounded-t-md"></div> */}
      </div>
      <div className="overflow-x-auto">
        <div className="custom-scrollbar max-h-[calc(100dvh-170px)] overflow-y-auto rounded-xl border border-mdLight">
          <table className="w-full text-right border-collapse bg-myHover text-secDark">
            <thead>
              <tr className="text-sm">{header}</tr>
            </thead>
            <tbody className="text-sm divide-y divide-mdLight">{children}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
