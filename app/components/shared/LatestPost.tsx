"use client";

import { useState } from "react";
import { blogData } from "@/app/constants/blogData";
import BlogCard from "./BlogCard";
import Button from "../ui/Button";

import React from "react";

export default function LatestPost() {
  const latestPost = blogData.filter((post) => post.latestPost === true);

  const [visibleBlogs, setVisibleBlogs] = useState(5);

  const showMoreBlogs = () => {
    setVisibleBlogs((pre) => pre + 3);
  };

  return (
    <section className="col-span-2" aria-labelledby="latest-post">
      <div className="w-full text-center">
        <h2
          id="latest-post"
          className="text-center text-2xl font-extrabold uppercase text-tertiary inline-block px mb-10"
        >
          Latest Post
        </h2>
      </div>

      <div className="flex flex-col gap-10 h-full">
        {latestPost.slice(0, visibleBlogs).map((post, index) => (
          <BlogCard key={index} post={post} />
        ))}
        {visibleBlogs < latestPost.length && (
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
