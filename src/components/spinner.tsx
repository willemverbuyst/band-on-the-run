"use client";

import { BallTriangle } from "react-loader-spinner";

export default function Spinner() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#06b6d4"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
