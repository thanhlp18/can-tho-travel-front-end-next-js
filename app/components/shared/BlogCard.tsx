import React from "react";
import Image from "next/image";
import { AiOutlineArrowRight } from "react-icons/ai";
import Tag from "../ui/Tag";
import Overlay from "../ui/Overlay";
import Link from "next/link";
type Props = {
  post: any;
};

export default function BlogCard({ post }: Props) {
  return (
    <article className="relative rounded-lg overflow-hidden">
      <div className="w-[1000px] h-[450px] relative">
        <Image
          src={post.image_path}
          alt={`image for ${post.title}`}
          fill
          objectFit="cover"
        />
        <Overlay />
      </div>

      <div className="absolute w-full h-full top-0 p-5 flex flex-col justify-between">
        <div>
          <Tag text={post.tags} />
          <h3 className="text-3xl font-extrabold uppercase text-white"></h3>
        </div>
      </div>

      <Link
        href={{ pathname: `blog/${post.id}`, query: { ...post } }}
        className="absolute bottom-0 right-0 bg-tertiary p-5 text-white rounded-tl-lg z-6 cursor-pointer"
      >
        <AiOutlineArrowRight size={30} />
      </Link>
    </article>
  );
}