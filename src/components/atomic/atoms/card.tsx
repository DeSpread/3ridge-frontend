import clsx from "clsx";
import { HtmlHTMLAttributes, PropsWithChildren } from "react";

export const Card = ({
  className,
  onClick,
  children,
  ...rest
}: PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>>) => {
  return (
    <div
      className={clsx([
        "cursor-pointer rounded-lg bg-neutral-800 p-6 transition duration-300 ease-out",
        "border-3 border-solid border-neutral-700 hover:border-secondary-main",
        className,
      ])}
      onClick={onClick}
      {...rest}
    >
      {children}
    </div>
  );
};
