type tagProps = {
  text: string;
};

export default function Tag({ text }: tagProps) {
  return (
    <>
      <span className="uppercase bg-primary py-1 px-3 text-white inline-block rounded-sm text-sm self-center my-2">
        {text}
      </span>
    </>
  );
}
