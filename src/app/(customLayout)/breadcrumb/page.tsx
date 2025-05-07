import Link from "next/link";
import BreadCrumb from "../Components/BreadCrumb/BreadCrumb";

const page = () => {
  return (
    <div className="mt-14 mx-10 space-y-3">
      <h2>This is Breadcrumb page</h2>
      <BreadCrumb />
      <div className="flex items-center justify-center">
        <Link
          href="/breadcrumb/page-1"
          className="px-4 py-2 rounded-lg bg-blue-300"
        >
          Page 1
        </Link>
      </div>
    </div>
  );
};

export default page;
