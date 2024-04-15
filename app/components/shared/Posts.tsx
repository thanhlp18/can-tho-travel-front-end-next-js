"use client";

import { useEffect, useState } from "react";
import Button from "../ui/Button";

import PostCard from "./PostCard";
import useSWR from "swr";
import { convertToBlogPostType } from "@/app/utils/convertToBlogPostType";

type postsProps = {
  filter: {
    tags?: string;
    title?: string;
  };
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Posts({ filter }: postsProps) {
  const [blogData, setBlogData] = useState<BlogPostType[]>([]);
  const [visibleBlogs, setVisibleBlogs] = useState(5);
  const { data, error, isLoading } = useSWR(
    "http://20.75.72.148/wp-json/wp/v2/posts?acf_format=standard&_fields=id,title,acf,content,tags,author,date",
    fetcher
  );
  let allTagLabels = [];

  useEffect(() => {
    if (!isLoading) {
      setBlogData(data.map((post: any) => convertToBlogPostType(post)));
      let addedLabel: string[] = [];

      // Loop through each item in the response data
      for (let i = 0; i < data.length; i++) {
        // Check if the "tags" array exists and it is not empty
        if (data[i].acf.tags && data[i].acf.tags.length > 0) {
          // Loop through each tag in the "tags" array
          for (let j = 0; j < data[i].acf.tags.length; j++) {
            // Extract the label of the tag and push it to the allTagLabels array
            if (!addedLabel.includes(data[i].acf.tags[j].slug)) {
              addedLabel.push(data[i].acf.tags[j].slug);
              allTagLabels.push({
                label: data[i].acf.tags[j].name,
                value: data[i].acf.tags[j].slug,
              });
            }
          }
        }
      }
      localStorage.removeItem("allPostTagLabels");
      localStorage.setItem("allPostTagLabels", JSON.stringify(allTagLabels));
    }
  }, [isLoading]);

  const filteredData = blogData
    .filter((post) => {
      if (filter.tags && filter.tags.length > 0) {
        for (let i = 0; i < post.tags.length; i++) {
          if (filter.tags.toLowerCase().includes(post.tags[i].toLowerCase())) {
            return true;
          }
        }
        return false;
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
    <section className="col-span-1 lg:col-span-2" aria-labelledby="latest-post">
      <div className="w-full text-center">
        <h2
          id="all-posts"
          className="text-center text-2xl font-extrabold uppercase text-tertiary inline-block px mb-10"
        >
          All Posts
        </h2>
      </div>

      <div className="flex flex-col gap-10 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {filteredData.slice(0, visibleBlogs).map((post, index) => (
            <PostCard key={index} post={post} />
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
