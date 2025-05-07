import Link from "next/link";
import BreadCrumb from "../BreadCrumb/BreadCrumb";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <BreadCrumb />
      <Link href="/loading" className="px-4 py-2 rounded-lg bg-blue-300">
        Loading Page
      </Link>
      <Link href="/maps" className="px-4 py-2 rounded-lg bg-blue-300">
        Map
      </Link>
      <Link href="/breadcrumb" className="px-4 py-2 rounded-lg bg-blue-300">
        Breadcrumb
      </Link>
    </div>
  );
};

export default Home;
