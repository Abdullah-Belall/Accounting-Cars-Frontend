export default function TransparentLayer({ onClick }: any) {
  return <div onClick={onClick} className="w-full h-full fixed left-0 top-0"></div>;
}
