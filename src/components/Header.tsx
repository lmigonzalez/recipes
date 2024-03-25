"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { LiteralUnion, ClientSafeProvider } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";
import SearchBar from "./SearchBar";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);
  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();

      setProviders(res);
    };
    setAuthProviders();
  }, []);

  return (
    <header className="fixed bg-my_silver w-full z-50 shadow-xl">
      <div className="">
        <nav className="flex justify-between py-2 px-6">
          <Link href={"/"}>
            <Image
              src={"/recipes-logo.webp"}
              alt="Recipes - Your Ultimate Cooking Companion"
              width={50}
              height={50}
            />
          </Link>
          <ul className="hidden md:flex items-center  gap-5">
            <li>
              <Link
                className="flex justify-center items-center gap-2 bg-white px-3 py-0.5 rounded-full shadow-sm hover:bg-my_red hover:text-white transition-all"
                href={"/explore"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
                  />
                </svg>
                Explore
              </Link>{" "}
            </li>
            <li>
              <Link
                className="flex justify-center items-center gap-2 bg-white px-3 py-0.5 rounded-full shadow-sm hover:bg-my_red hover:text-white transition-all"
                href={session ? `/saves/${session?.user?.id}` : "/saves"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
                Saves
              </Link>{" "}
            </li>
            <li>
              {session ? (
                <button
                  onClick={() => signOut()}
                  className="bg-red-700 rounded text-white font-medium py-1 px-5"
                >
                  Sign Out
                </button>
              ) : (
                providers &&
                Object.values(providers).map((provider, index) => (
                  <button
                    key={index}
                    onClick={() => signIn(provider.id)}
                    className="bg-sky-700 rounded text-white font-medium py-1 px-5"
                  >
                    Sign In
                  </button>
                ))
              )}
            </li>
          </ul>
          <MobileMenu />
        </nav>
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
