import FilterTours from "@/app/components/shared/FilterTours";
import Tours from "@/app/components/shared/Tours";
type searchParamsPropsTypes = {
  category: string;
  title: string;
};

export default function page({
  searchParams,
}: {
  searchParams: searchParamsPropsTypes;
}) {
  const { category, title } = searchParams;

  return (
    <div className="">
      <div className="lg:grid lg:grid-cols-3 gap-10 flex flex-col-reverse w-[95%] max-w-[1450px] mx-auto overflow-y-hidden h-fit mt-10  max-lg:space-y-7 ">
        <Tours filter={{ category: category, title: title }} />

        <FilterTours />
      </div>
    </div>
  );
}
