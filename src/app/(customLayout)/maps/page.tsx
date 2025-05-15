import BreadCrumb from "../Components/BreadCrumb/BreadCrumb";
import Map from "../Components/Map/Map";

const page = () => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen">
      <BreadCrumb />
      <Map />
    </div>
  );
};

export default page;
