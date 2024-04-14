import React from "react";

type Props = {};

export default function Overlay({}: Props) {
  return (
    <div className="bg-black/10 w-full h-full absolute top-0 z-1 hover:bg-white/10 duration-500 cursor-pointer"></div>
  );
}
