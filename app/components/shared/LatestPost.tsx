"use client";

import { useEffect, useState } from "react";
import Button from "../ui/Button";
import useSWR from "swr";

import PostCard from "./PostCard";
import { convertToBlogPostType } from "@/app/utils/convertToBlogPostType";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function LatestPost() {
  const [blogData, setBlogData] = useState([]);
  const { data, error, isLoading } = useSWR(
    "http://20.75.72.148/wp-json/wp/v2/posts?acf_format=standard&_fields=id,title,acf,content,tags,author,date",
    fetcher
  );

  useEffect(() => {
    if (!isLoading)
      setBlogData(data.map((post: any) => convertToBlogPostType(post)));
  }, [isLoading]);

  console.log(data, error, isLoading);

  const latestPost = blogData.sort((a: BlogPostType, b: BlogPostType) => {
    return (
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
  });

  const [visibleBlogs, setVisibleBlogs] = useState(2);

  const showMoreBlogs = () => {
    setVisibleBlogs((pre) => pre + 4);
  };

  return (
    <section className="col-span-1" aria-labelledby="latest-post">
      <div className="w-full text-center">
        <h2
          id="latest-post"
          className="text-center text-2xl font-extrabold uppercase text-tertiary inline-block px mb-10"
        >
          Latest Post
        </h2>
      </div>

      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-10">
        {latestPost.slice(0, visibleBlogs).map((post, index) => (
          <PostCard key={index} post={post} className="col-span-1" />
        ))}
        {visibleBlogs < latestPost.length && (
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
