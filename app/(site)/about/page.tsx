import Overlay from "@/app/components/ui/Overlay";
import Image from "next/image";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="w-[95%] mx-auto max-w-[1450px]">
      <div className="relative h-[500px] w-full">
        <Image
          src="/assets/about.jpg"
          fill
          alt="about image"
          objectFit="cover"
        />
        <Overlay />
        <h1 className="text-white flex absolute w-full h-full justify-center items-center text-4xl font-extrabold uppercase">
          About us
        </h1>
      </div>
      <div className="leading-8 text-lg bg-white mt-[-80px] relative w-[90%] m-auto rounded-lg p-5 shadow-xl text-center max-md:mt-0 max-md:w-full max-md:bg-transparent max-md:shadow-none">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          sollicitudin, odio sit amet consectetur consectetur, metus est
          malesuada libero, nec fermentum nunc odio nec justo. Donec nec
          sollicitudin nunc. Nullam nec magna ac tortor posuere malesuada. In
          hac habitasse platea dictumst. Curabitur nec urna nec nunc malesuada
          bibendum. Integer nec dolor vitae libero ultricies tincidunt. Ut
          vehicula, mi ut fermentum ultricies, metus ligula fermentum eros, nec
          fermentum nunc odio nec justo. Donec nec sollicitudin nunc. Nullam nec
          magna ac tortor posuere malesuada. In hac habitasse platea dictumst.
          Curabitur nec urna nec nunc malesuada bibendum. Integer nec dolor
          vitae libero ultricies tincidunt. Ut vehicula, mi ut fermentum
          ultricies, metus ligula fermentum eros, nec fermentum nunc odio nec
          justo. Donec nec sollicitudin nunc. Nullam nec magna ac tortor posuere
          malesuada. In hac habitasse platea dictumst. Curabitur nec urna{" "}
        </p>

        <div className="w-full items-center flex justify-center">
          <Image
            src="/assets/signature.png"
            alt="signature"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
}
