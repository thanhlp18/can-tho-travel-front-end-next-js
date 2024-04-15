import clsx from "clsx";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  aria: string;
  type?: "button" | "submit" | "reset";
  className?: string;
};

const Button = ({
  text,
  onClick,
  aria,
  type = "button",
  className,
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        "bg-primary py-1 px-4 rounded-lg hover:bg-primary/80 duration-500 inline-block text-white",
        className && className
      )}
      onClick={onClick}
      aria-label={aria}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
