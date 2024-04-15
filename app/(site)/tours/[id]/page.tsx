"use client";
import Tag from "@/app/components/ui/Tag";
import {
  API_POST_QUERY,
  API_POST_URL,
  API_TOUR_QUERY,
  API_TOUR_URL,
} from "@/app/constants/api";
import { convertToBlogPostType } from "@/app/utils/convertToBlogPostType";
import { convertToTourType } from "@/app/utils/convertToTourType";
import { Markup } from "interweave";
import Image from "next/image";

import { useEffect, useState } from "react";
import {
  FaSquareFacebook,
  FaSquareInstagram,
  FaSquareSnapchat,
  FaSquareXTwitter,
} from "react-icons/fa6";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const initialBlogPost: TourType = {
  id: "",
  title: "",
  summary: "",
  content: "",
  price: "",
  category: "",
  featureImage: "",
  startTime: "",
  endTime: "",
  attractions: [],
  isFavorite: false,
};
export default function Page({ params }: { params: { id: string } }) {
  const [tour, setTourData] = useState<TourType>(initialBlogPost);
  const { data, error, isLoading } = useSWR(
    `${API_TOUR_URL}${params.id}?${API_TOUR_QUERY}`,
    fetcher
  );
  useEffect(() => {
    if (!isLoading) setTourData(convertToTourType(data));
  }, [isLoading, data]);
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="w-[95%[ mx-auto max-w-[1450px]">
      <div className="w-full h-[400px] relative mb-5">
        <Image
          fill
          alt="image for blog"
          src={tour?.featureImage}
          objectFit="cover"
        />
      </div>
      <div className="flex flex-row gap-2">
        <Tag text={tour.category} />
      </div>
      <h2 className="text-4xl font-extrabold uppercase text-tertiary my-3">
        {tour.title}
      </h2>

      <div className="flex md:gap-20 gap-5 relative mt-10 md:flex-row flex-col">
        <aside className="md:sticky md:top-3 md:h-screen">
          <span className="uppercase text-2xl font-extrabold text-tertiary">
            Share:{" "}
          </span>
          <div className="flex text-3xl gap-5 text-gray-400 mt-2 [&>*]:border ">
            <FaSquareFacebook />
            <FaSquareInstagram />
            <FaSquareXTwitter />
            <FaSquareSnapchat />
          </div>
        </aside>

        <article className="text-xl flex flex-col gap-5">
          <h3 className="text-3xl text-primary font-extrabold uppercase ">
            tour information
          </h3>
          <div className="grid grid-cols-2 gap-10">
            <div className="col-span-1 max-sm:col-span-2">
              <table className="w-full border-collapse table-auto">
                <tbody>
                  <tr className="border border-gray-200">
                    <td className="py-2 px-4 text-gray-600 font-bold">Price</td>
                    <td className="border py-2 px-4">{tour.price} $</td>
                  </tr>
                  <tr className="border border-gray-200">
                    <td className="py-2 px-4 text-gray-600 font-bold">
                      Start Time
                    </td>
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
            </div>
            <div className="col-span-1 max-sm:col-span-2">
              {tour.attractions.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-xl font-extrabold uppercase text-tertiary mb-2">
                    Attractions
                  </h3>
                  <ul className="grid grid-cols-2 gap-4">
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
          <div>
            <h3 className="text-3xl text-primary font-extrabold uppercase ">
              tour CONTENT
            </h3>
            {tour.content && <Markup content={tour.content} allowAttributes />}
          </div>
        </article>
      </div>
    </div>
  );
}
