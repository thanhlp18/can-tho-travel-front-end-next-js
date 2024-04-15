import FilterPosts from "@/app/components/shared/FilterPosts";
import Posts from "@/app/components/shared/Posts";
type searchParamsPropsTypes = {
  tags: string;
  title: string;
};

export default function page({
  searchParams,
}: {
  searchParams: searchParamsPropsTypes;
}) {
  const { tags, title } = searchParams;

  return (
    <div className="">
      <div className="grid lg:grid-cols-3 lg:gap-10 grid-cols-1 w-[95%] max-w-[1450px] mx-auto overflow-y-hidden h-fit mt-10  max-lg:space-y-7">
        <Posts filter={{ tags: tags, title: title }} />
        <FilterPosts />
      </div>
    </div>
  );
}
