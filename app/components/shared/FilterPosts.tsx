"use client";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useEffect, useState } from "react";

type TagType = {
  label: string;
  value: string;
};

export default function FilterPosts() {
  const router = useRouter();
  const [allTagLabels, setAllTagLabels] = useState<TagType[]>([
    {
      label: "No Tag",
      value: "notag",
    },
  ]);
  const [selectedTag, setSelectedTag] = useState<string[]>([]);
  function handleSearch(e: any) {
    e.preventDefault();
    const searchQuery = e.target[0]?.value;
    const tag = selectedTag.join(",");
    if (searchQuery || tag) {
      router.push(
        `/posts?title=${searchQuery ? searchQuery : ""}&tags=${tag ? tag : ""}
        `
      );
    } else {
      router.push("/posts");
    }
    e.target.reset();
  }

  useEffect(() => {
    setAllTagLabels([
      ...allTagLabels,
      ...JSON.parse(localStorage.getItem("allPostTagLabels") ?? "[]"),
    ]);
  }, []);

  console.log(selectedTag);
  return (
    <section aria-labelledby="top-post">
      <div className="w-full text-center">
        <h2
          id="top-post"
          className="text-center text-2xl font-extrabold uppercase text-tertiary inline-block px-2 mb-10"
        >
          FILTER
        </h2>
      </div>
      <div className="flex h-full flex-col gap-12 items-center">
        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-3 w-full flex-1 px-2"
        >
          <Input placeholder="Search title" type="text" name="searchQuery" />
          <div className="flex flex-row gap-4">
            {allTagLabels.map((tag: TagType, index) => (
              <Button
                text={tag.label}
                aria="Search for blog post"
                key={index}
                className={
                  selectedTag.includes(tag.value)
                    ? "bg-primary"
                    : "bg-secondary"
                }
                onClick={() => {
                  if (selectedTag.includes(tag.value)) {
                    setSelectedTag(selectedTag.filter((t) => t !== tag.value));
                  } else {
                    setSelectedTag([...selectedTag, tag.value]);
                  }
                }}
              />
            ))}
          </div>

          <Button text="Search" aria="Search for blog post" type="submit" />
        </form>
      </div>
    </section>
  );
}
