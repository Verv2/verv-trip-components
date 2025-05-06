import Link from "next/link";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Link href="/loading" className="px-4 py-2 rounded-lg bg-blue-300">
        Loading Page
      </Link>
      <Link href="/maps" className="px-4 py-2 rounded-lg bg-blue-300">
        Map
      </Link>
    </div>
  );
};

export default Home;
