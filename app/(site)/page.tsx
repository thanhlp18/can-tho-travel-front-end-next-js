import React from "react";
import Hero from "../components/shared/Hero";
import LatestPost from "../components/shared/LatestPost";
import { FaV } from "react-icons/fa6";
import FavoritePost from "../components/shared/FavoriteTours";
type Props = {};

export default function page({}: Props) {
  return (
    <>
      <Hero />
      <div className="grid grid-cols-1 lg:gap-10 w-[95%] mx-auto max-w-[1450px] overflow-y-hidden h-fit mt-10">
        <LatestPost />
        <FavoritePost />
      </div>
    </>
  );
}
