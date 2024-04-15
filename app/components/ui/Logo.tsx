import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href={"/"}>
      <h1 className="text-3xl font-extrabold text-secondary">
        <span className="text-primary"> Can Tho </span> Vivu
      </h1>
    </Link>
  );
}
