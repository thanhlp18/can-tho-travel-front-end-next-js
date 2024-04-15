"use client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { Wrapper } from "@googlemaps/react-wrapper";
import AttractionCard from "./AttractionCard";
import { convertToAttractions } from "@/app/utils/convertToAttractions";
import {
  API_ATTRACTION_QUERY,
  API_ATTRACTION_URL,
  API_POST_QUERY,
} from "@/app/constants/api";

interface AttractionProps {
  attractions?: AttractionType[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Attraction: React.FC<AttractionProps> = ({}) => {
  const { data, error, isLoading } = useSWR(
    `${API_ATTRACTION_URL}?${API_ATTRACTION_QUERY}`,
    fetcher
  );
  const [attractions, setAttractions] = useState<AttractionType[]>([]);
  const [selectedAttraction, setSelectedAttraction] =
    useState<AttractionType | null>(null);

  const handleMarkerClick = (attraction: AttractionType) => {
    setSelectedAttraction(attraction);
  };

  useEffect(() => {
    if (!isLoading) {
      setAttractions(data.map((data: any) => convertToAttractions(data)));
      console.log(data);
    }
  }, [isLoading, data]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="attraction-container">
      <div className="attraction-list">
        <div className="w-full text-center">
          <h2
            id="all-posts"
            className="text-center text-2xl font-extrabold uppercase text-tertiary inline-block px mb-10"
          >
            Attractions
          </h2>
        </div>

        <ul className="grid xl:grid-cols-4 gap-4 md:grid-cols-2 grid-cols-1">
          {attractions.map((attraction) => (
            <AttractionCard key={attraction.id} attraction={attraction} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Attraction;
