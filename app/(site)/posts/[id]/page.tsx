"use client";
import Tag from "@/app/components/ui/Tag";
import { API_POST_QUERY, API_POST_URL } from "@/app/constants/api";
import { convertToBlogPostType } from "@/app/utils/convertToBlogPostType";
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
const initialBlogPost: BlogPostType = {
  id: "",
  title: "",
  content: "",
  featureImage: "",
  tags: [],
  author: "",
  publishDate: "",
  attractions: [],
  tours: [],
};
export default function Page({ params }: { params: { id: string } }) {
  const [post, setBlogData] = useState<BlogPostType>(initialBlogPost);
  const { data, error, isLoading } = useSWR(
    `${API_POST_URL}${params.id}?${API_POST_QUERY}`,
    fetcher
  );
  useEffect(() => {
    if (!isLoading) setBlogData(convertToBlogPostType(data));
  }, [isLoading, data]);
  console.log(post);
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="w-[95%[ mx-auto max-w-[1450px]">
      <div className="w-full h-[400px] relative mb-5">
        <Image
          fill
          alt="image for blog"
          src={post?.featureImage}
          objectFit="cover"
        />
      </div>
      <div className="flex flex-row gap-2">
        {post.tags.map((tag, index) => (
          <Tag text={tag} key={index} />
        ))}
      </div>
      <h2 className="text-4xl font-extrabold uppercase text-tertiary my-3">
        {post.title}
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
          <div className="grid grid-cols-2">
            <div className="col-span-1 max-sm:col-span-2">
              {post.attractions.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-xl font-extrabold uppercase text-tertiary mb-2">
                    Attractions
                  </h3>
                  <ul className="grid grid-cols-2 gap-4">
                    {post.attractions.map((attraction, index) => (
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
            <div className="col-span-1 max-sm:col-span-2">
              {post.tours.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-xl font-extrabold uppercase text-tertiary mb-2">
                    Our tours
                  </h3>
                  <ul className="grid grid-cols-2 gap-4">
                    {post.tours.map((tour, index) => (
                      <li key={index} className="flex items-start">
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

                        <span> {tour}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-3xl text-primary font-extrabold uppercase ">
              POST CONTENT
            </h3>
            {post.content && <Markup content={post.content} allowAttributes />}
          </div>
          <div className=" flex gap-5 items-center">
            <div className="flex gap-1 flex-col">
              <span>{post.author}</span>
              <span>{post.publishDate}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
