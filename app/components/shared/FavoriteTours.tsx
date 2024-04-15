"use client";

import { useEffect, useState } from "react";
import Button from "../ui/Button";
import useSWR from "swr";

import PostCard from "./PostCard";
import { convertToTourType } from "@/app/utils/convertToTourType";
import { API_TOUR_QUERY, API_TOUR_URL } from "@/app/constants/api";
import TourCard from "./TourCard";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function FavoritePost() {
  const [tourData, setTourData] = useState<TourType[]>([]);
  const { data, error, isLoading } = useSWR(
    `${API_TOUR_URL}?${API_TOUR_QUERY}`,
    fetcher
  );

  useEffect(() => {
    if (!isLoading)
      setTourData(data.map((post: any) => convertToTourType(post)));
  }, [isLoading]);

  console.log(data, error, isLoading);

  const favoriteTour = tourData.filter(
    (post: TourType) => post.isFavorite === true
  );

  const [visibleBlogs, setVisibleBlogs] = useState(2);

  const showMoreBlogs = () => {
    setVisibleBlogs((pre) => pre + 4);
  };

  if (favoriteTour.length === 0) return null;
  return (
    <section className="col-span-1" aria-labelledby="latest-post">
      <div className="w-full text-center">
        <h2
          id="latest-post"
          className="text-center text-2xl font-extrabold uppercase text-tertiary inline-block px mb-10"
        >
          Favorite Post
        </h2>
      </div>

      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-10">
        {favoriteTour.slice(0, visibleBlogs).map((tour, index) => (
          <TourCard key={index} tour={tour} className="col-span-1" />
        ))}
        {visibleBlogs < favoriteTour.length && (
          <div className="col-span-2 flex justify-center gap-10">
            <Button
              onClick={showMoreBlogs}
              text="Show more"
              aria="Show more blog post"
            />
            {visibleBlogs > 2 && (
              <Button
                onClick={() => setVisibleBlogs(2)}
                text="Show less"
                aria="Show less blog post"
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
