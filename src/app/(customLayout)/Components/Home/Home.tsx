import Link from "next/link";
import BreadCrumb from "../BreadCrumb/BreadCrumb";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 w-[200px] m-auto text-center">
      <BreadCrumb />
      <Link href="/loading" className="w-full px-4 py-2 rounded-lg bg-blue-300">
        Loading Page
      </Link>
      <Link href="/maps" className="w-full px-4 py-2 rounded-lg bg-blue-300">
        Map
      </Link>
      <Link
        href="/breadcrumb"
        className="w-full px-4 py-2 rounded-lg bg-blue-300"
      >
        Breadcrumb
      </Link>
      <Link
        href="/calendar"
        className="w-full px-4 py-2 rounded-lg bg-blue-300"
      >
        Calendar
      </Link>
    </div>
  );
};

export default Home;
