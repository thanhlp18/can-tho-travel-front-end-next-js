"use client";
import {
  FaSquareXTwitter,
  FaSquareFacebook,
  FaSquareSnapchat,
  FaSquareInstagram,
} from "react-icons/fa6";
import useMenuActive from "@/app/hooks/useMenuActive";
import { navLinks } from "@/app/constants";
import Route from "../ui/Route";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full py-5 mt-5 bg-tertiary">
      <div className="w-[95%] mx-auto max-w-[1450px]">
        <div className="py-5 border-b border-gray-300 border-opacity-20 flex justify-between items-center max-md:flex-col max-md:gap-8">
          <div className="flex-1">
            <Link href={"/"}>
              <h1 className="text-3xl font-extrabold text-light">
                Explore <span className="text-primary"> X </span>
              </h1>
            </Link>
          </div>

          <ul className="flex items-center justify-center gap-16 flex-1 text-white max-md:flex-col max-md:gap-5">
            {navLinks.map((link, index) => {
              return (
                <li key={index}>
                  <Route route={link.route} label={link.label} />
                </li>
              );
            })}
          </ul>

          <div className="flex gap-5 text-white flex-1 justify-end text-2xl">
            <FaSquareFacebook />
            <FaSquareInstagram />
            <FaSquareXTwitter />
            <FaSquareSnapchat />
          </div>
        </div>

        <div className="w-full text-center mt-3 text-sm text-white">
          <span>All Rights Reserved ExploreX.com</span>
        </div>
      </div>
    </div>
  );
}