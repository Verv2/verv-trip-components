import { Spinner } from "./Spinner";

const Loading = () => {
  return (
    <div className="bg-blue-500/10 h-screen w-full fixed inset-0 z-[999] backdrop-blur-md flex justify-center items-center">
      <Spinner size="large">
        <h2 className="text-2xl font-semibold mt-4">
          Please hold while we secure this room
        </h2>
      </Spinner>
    </div>
  );
};

export default Loading;
