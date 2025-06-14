export default function PopupHolder({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full min-[400px]:w-fit px-mainxs z-30 fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
      {children}
    </div>
  );
}
