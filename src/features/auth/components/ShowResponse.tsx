import { MessageCircleMore } from "lucide-react";
import React from "react";
import { BiErrorCircle } from "react-icons/bi";

const ShowResponse = ({
  type,
  text,
}: {
  type: "error" | "message";
  text: string;
}) => {
  return (
    <div>
      {type === "error" ? (
        <div className="flex items-center gap-2 rounded-xl bg-red-500/10 p-2 pl-4 text-sm text-red-600">
          <BiErrorCircle className="size-5" />
          {text}
        </div>
      ) : (
        <div className="flex items-center gap-2 rounded-xl bg-green-500/10 p-2 pl-4 text-sm text-green-600">
          <MessageCircleMore className="size-5" />
          {text}
        </div>
      )}
    </div>
  );
};

export default ShowResponse;
