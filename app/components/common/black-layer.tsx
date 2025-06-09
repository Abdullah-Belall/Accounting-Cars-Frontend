"use client";
export default function BlackLayer({ onClick }: any) {
  return (
    <div onClick={onClick} className="w-full h-full fixed left-0 top-0 bg-[#00000066] z-30"></div>
  );
}
