import React from "react";
import Image from "next/image";
import { AiOutlineArrowRight } from "react-icons/ai";
import Tag from "../ui/Tag";
import Overlay from "../ui/Overlay";
import Link from "next/link";
import clsx from "clsx";
import { Markup } from "interweave";
import Button from "../ui/Button";

export default function TourCard({
  tour,
  className,
}: {
  tour: TourType;
  className?: string;
}) {
  return (
    <article
      className={clsx(
        "relative rounded-lg overflow-hidden bg-white border shadow cursor-pointer justify-start flex flex-col",
        className ? className : ""
      )}
    >
      <div className="w-[1000px] h-[400px] relative">
        <Image
          src={tour.featureImage}
          alt={`image for ${tour.title}`}
          fill
          objectFit="cover"
        />
        <Overlay />
      </div>

      <div className="w-full h-fit p-5 flex flex-col gap-5 ">
        <div>
          <Tag text={tour.category} />
          <h3 className="line-clamp-3 font-bold uppercase text-tertiary">
            {tour.title}
          </h3>
          <div className="col-span-1 max-sm:col-span-2">
            {tour.attractions.length > 0 && (
              <div className="mt-2">
                <h3 className="text-sm font-bold uppercase text-tertiary mb-2">
                  Attractions
                </h3>
                <ul className="">
                  {tour.attractions.map((attraction, index) => (
                    <li key={index} className="flex items-center">
                      <span>
                        <svg
                          className="w-4 h-4 mr-2 text-primary"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M9 5l7 7-7 7"></path>
                        </svg>
                      </span>

                      <span> {attraction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <table className="w-full border-collapse table-auto">
          <tbody>
            <tr className="border border-gray-200">
              <td className="py-2 px-4 text-gray-600 font-bold">Price</td>
              <td className="border py-2 px-4">{tour.price} $</td>
            </tr>
            <tr className="border border-gray-200">
              <td className="py-2 px-4 text-gray-600 font-bold">Start Time</td>
              <td className="border py-2 px-4">{tour.startTime}</td>
            </tr>
            <tr>
              <td className="border py-2 px-4 text-gray-600 font-bold">
                End Time
              </td>
              <td className="border py-2 px-4">{tour.endTime}</td>
            </tr>
          </tbody>
        </table>

        <Link
          href={{
            pathname: `tours/${tour.id}`,
          }}
          className="flex justify-end w-full"
        >
          <Button text="Book Now" aria="book-tour-now" className="!p-2" />
        </Link>
      </div>
    </article>
  );
}
