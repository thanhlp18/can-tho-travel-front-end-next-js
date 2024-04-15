import React from "react";

type InputProps = {
  type: "text" | "date";
  placeholder?: string;
  name: string;
};

export default function Input({ type, placeholder, name }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      className="px-1 py-3 border-gray-300 w-full rounded-md text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-primary outline-none"
    />
  );
}
