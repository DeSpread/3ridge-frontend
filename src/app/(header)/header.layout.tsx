import Image from "next/image";

import Nav from "./nav";

export default function Header() {
  return (
    <nav className="flex h-16 items-center justify-between border-0 border-b border-solid border-b-neutral-700 bg-neutral-900 pl-4 pr-6">
      <div className="flex items-start">
        <div className="relative aspect-[1/0.393] w-28 sm:w-32">
          <Image
            src={
              "https://3ridge.s3.ap-northeast-2.amazonaws.com/logo/02_svg/3ridge_logo_white.svg"
            }
            alt={""}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="relative aspect-square w-7">
          <Image
            src={
              "https://3ridge.s3.ap-northeast-2.amazonaws.com/logo/02_svg/beta.svg"
            }
            alt={""}
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
      <Nav />
    </nav>
  );
}
