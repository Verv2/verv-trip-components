"use client";
import { useState } from "react";
import Loading from "../Components/Loading/Loading";
import BreadCrumb from "../Components/BreadCrumb/BreadCrumb";

const LoadingPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFetchData = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen space-y-3">
        <h1>This is loading page</h1>
        <BreadCrumb />
        <button
          onClick={handleFetchData}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
        >
          Book a room
        </button>
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

export default LoadingPage;
