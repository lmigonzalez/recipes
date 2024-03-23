import React from "react";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
const Header = () => {
  return (
    <header className="fixed bg-my_silver w-full z-50 shadow-xl">
      <div className="">
        <nav className="flex justify-between py-2 px-6">
          <Link href={"/"}>
            <Image src={"/recipes-logo.webp"} alt="" width={50} height={50} />
          </Link>
          <ul className="flex items-center  gap-5">
            <li>
              <Link href={"/explore"}>Explore</Link>{" "}
            </li>
            <li>
              <Link href={"/about"}>About</Link>{" "}
            </li>
            <li>
              <Link href={"/login"}>Login</Link>{" "}
            </li>
          </ul>
        </nav>
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
