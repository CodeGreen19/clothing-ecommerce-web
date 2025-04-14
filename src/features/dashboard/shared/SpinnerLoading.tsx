import { RotateCw } from "lucide-react";

const SpinnerLoading = () => {
  return (
    <>
      <div className="m-auto mt-5 flex w-[80] justify-center rounded-md p-4 text-center text-sm text-pink-500">
        <RotateCw className="animate-spin" />
      </div>
    </>
  );
};

export default SpinnerLoading;
