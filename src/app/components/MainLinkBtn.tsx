import React from "react";
import Link from "next/link";

interface Props {
  text: string;
  url: string;
}
const MainLinkBtn = ({ text, url }: Props) => {
  return (
    <div className="pt-2">
      <Link
        className="w-fit rounded-full px-8 py-2 overflow-hidden group bg-my_red  text-white hover:ring-2 hover:ring-offset-2 hover:ring-my_red transition-all ease-out duration-300"
        href={`/${url}`}
      >
        {text}
      </Link>
    </div>
  );
};

export default MainLinkBtn;
