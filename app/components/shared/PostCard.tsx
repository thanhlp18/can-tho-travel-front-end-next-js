import React from "react";
import Image from "next/image";
import { AiOutlineArrowRight } from "react-icons/ai";
import Tag from "../ui/Tag";
import Overlay from "../ui/Overlay";
import Link from "next/link";
import clsx from "clsx";
import { Markup } from "interweave";

type BlogPostType = {
  id: string;
  title: string;
  featureImage: string;
  tags: string[];
  className?: string;
};

export default function PostCard({
  post,
  className,
}: {
  post: BlogPostType;
  className?: string;
}) {
  return (
    <article
      className={clsx(
        "relative rounded-lg overflow-hidden",
        className ? className : ""
      )}
    >
      <div className="w-[1000px] h-[450px] relative">
        <Image
          src={post.featureImage}
          alt={`image for ${post.title}`}
          fill
          objectFit="cover"
        />
        <Overlay />
      </div>

      <div className="absolute w-full h-full top-0 p-5 flex flex-col justify-between">
        <div>
          <div className="flex flex-row gap-2">
            {post.tags.map((tag, index) => (
              <Tag text={tag} key={index} />
            ))}
          </div>
          <h3 className="text-3xl font-extrabold uppercase text-white">
            {post.title}
          </h3>
        </div>
      </div>

      <Link
        href={{
          pathname: `posts/${post.id}`,
        }}
        className="absolute bottom-0 right-0 bg-tertiary p-5 text-white rounded-tl-lg z-6 cursor-pointer"
      >
        <AiOutlineArrowRight size={30} />
      </Link>
    </article>
  );
}
