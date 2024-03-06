import React from "react";

const Priority = ({ variant, bgColor }) => {
  return (
    <>
      {variant !== 0 ? (
        <div
          className={`flex gap-1 items-center ${
            bgColor ? "bg-zinc-700/60 px-4 h-9 rounded-md" : ""
          }`}
        >
          <i
            className={`fa-solid fa-exclamation ${
              variant === 3
                ? "text-red-500"
                : variant === 2
                ? "text-yellow-400"
                : variant === 1
                ? "text-green-500"
                : ""
            }`}
          ></i>
          <i
            className={`fa-solid fa-exclamation ${
              variant === 3
                ? "text-red-500"
                : variant === 2
                ? "text-yellow-400"
                : variant === 1
                ? "text-white/50"
                : ""
            }`}
          ></i>
          <i
            className={`fa-solid fa-exclamation ${
              variant === 3
                ? "text-red-500"
                : variant === 2
                ? "text-white/50"
                : variant === 1
                ? "text-white/50"
                : ""
            }`}
          ></i>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Priority;
