"use client";

import { useEffect, useState } from "react";
import Button from "../ui/Button";

import useSWR from "swr";
import TourCard from "./TourCard";
import { API_TOUR_QUERY, API_TOUR_URL } from "@/app/constants/api";
import { convertToTourType } from "@/app/utils/convertToTourType";

type toursProps = {
  filter: {
    category?: string;
    title?: string;
  };
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Tours({ filter }: toursProps) {
  const [toursData, setToursData] = useState<TourType[]>([]);
  const { data, error, isLoading } = useSWR(
    `${API_TOUR_URL}?${API_TOUR_QUERY}`,
    fetcher
  );

  let allTagLabels = [];

  useEffect(() => {
    if (!isLoading) {
      setToursData(data.map((tour: any) => convertToTourType(tour)));
      let addedLabel: string[] = [];
      // Loop through each item in the response data
      for (let i = 0; i < data.length; i++) {
        // Check if the "category" array exists and it is not empty
        if (data[i].acf.category) {
          if (!addedLabel.includes(data[i].acf.category.slug)) {
            addedLabel.push(data[i].acf.category.slug);
            allTagLabels.push({
              label: data[i].acf.category.name,
              value: data[i].acf.category.slug,
            });
          }
        }
      }
      localStorage.removeItem("allTourTagLabels");
      localStorage.setItem("allTourTagLabels", JSON.stringify(allTagLabels));
    }
  }, [isLoading, data]);

  const [visibleBlogs, setVisibleBlogs] = useState(5);
  const filteredData = toursData
    .filter((post) => {
      if (filter.category) {
        console.log(filter.category);
        console.log(post.category.toLowerCase().replaceAll(" ", "-"));
        console.log(
          filter.category.toLowerCase() ===
            post.category.toLowerCase().replaceAll(" ", "-")
        );
        if (
          filter.category.toLowerCase() ===
          post.category.toLowerCase().replaceAll(" ", "-")
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    })
    .filter((post) => {
      if (filter.title) {
        return post.title.toLowerCase().includes(filter.title.toLowerCase());
      } else {
        return true;
      }
    });

  const showMoreBlogs = () => {
    setVisibleBlogs((pre) => pre + 3);
  };
  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="col-span-2" aria-labelledby="latest-post">
      <div className="w-full text-center">
        <h2
          id="all-posts"
          className="text-center text-2xl font-extrabold uppercase text-tertiary inline-block px mb-10 max-md:mb-4"
        >
          All tours
        </h2>
      </div>

      <div className="flex flex-col gap-10 h-full">
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
          {filteredData.slice(0, visibleBlogs).map((tour, index) => (
            <TourCard key={index} tour={tour} />
          ))}
        </div>
        {visibleBlogs < filteredData.length && (
          <div className="flex justify-center">
            <Button
              onClick={showMoreBlogs}
              text="Show more"
              aria="Show more blog post"
            />
          </div>
        )}
      </div>
    </section>
  );
}
