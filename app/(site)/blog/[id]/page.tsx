import React from "react";

type searchParamsTypes = {
  id: string;
  title: string;
  image_path: string;
  paragraph: string;
  featured: boolean;
  topPost: boolean;
  tags: string;
  authorName: string;
  publishDate: string;
  authorImage: string;
};

type Props = {
  searchParams: searchParamsTypes;
};

export default function page({ searchParams }: Props) {
  const post = searchParams;
  return <div>{post.title}</div>;
}
