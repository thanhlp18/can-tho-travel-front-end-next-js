import clsx from "clsx";
import Link from "next/link";
import React from "react";

type routeProps = {
  route: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
};

export default function Route({ route, label, isActive, onClick }: routeProps) {
  return (
    <Link
      href={route}
      onClick={onClick}
      className={clsx(isActive && "text-primary ")}
    >
      {label}
    </Link>
  );
}
