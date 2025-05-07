import BreadCrumb from "@/app/(customLayout)/Components/BreadCrumb/BreadCrumb";

import React from "react";

const page = () => {
  return (
    <div className="mt-14 mx-10 space-y-3">
      <BreadCrumb />
      <div className="flex items-center justify-center">
        <h2>This is final page</h2>
      </div>
    </div>
  );
};

export default page;
