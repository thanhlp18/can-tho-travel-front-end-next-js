import React from "react";
import Image from "next/image";
import { AiOutlineArrowRight } from "react-icons/ai";
import Tag from "../ui/Tag";
import Link from "next/link";
import clsx from "clsx";
import Map from "../ui/Map";

export default function AttractionCard({
  attraction,
  className,
}: {
  attraction: AttractionType;
  className?: string;
}) {
  return (
    <article
      className={clsx(
        "relative rounded-lg overflow-hidden bg-white border shadow cursor-pointer justify-start flex flex-col",
        className ? className : ""
      )}
    >
      <div className="w-full h-[300px] relative">
        <Image
          src={attraction.image}
          alt={`image for ${attraction.name}`}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="p-5 flex flex-col gap-5 flex-1">
        <div>
          <h3 className="font-bold text-xl uppercase text-tertiary line-clamp-2">
            {attraction.name}
          </h3>
          <p className="text-gray-600 line-clamp-3">{attraction.address}</p>
        </div>
      </div>
      <div className="max-h-96">
        <Map attraction={attraction} />
      </div>
      <Link
        href={`/attractions/${attraction.id}`}
        className="absolute bottom-0 right-0 bg-tertiary p-5 text-white rounded-tl-lg z-6 cursor-pointer"
      >
        <AiOutlineArrowRight size={30} />
      </Link>
    </article>
  );
}
