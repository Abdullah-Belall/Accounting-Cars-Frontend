import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function UserCard({
  username,
  role,
  id,
  type,
}: {
  username: string;
  role: string;
  id?: string;
  type: string;
}) {
  return (
    <div className={`w-[calc(25%-8px)] p-6 bg-myHover border border-mdLight rounded-md shadow-sm`}>
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-myDark">{username}</h5>
      </a>
      <p className="mb-3 font-normal text-mdDark">{role}</p>
      <Link
        href={`/${type}/${id}`}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-md bg-myDark"
      >
        عرض المزيد من المعلومات <FaArrowLeft className="mr-2" />
      </Link>
    </div>
  );
}
