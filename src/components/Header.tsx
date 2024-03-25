"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { LiteralUnion, ClientSafeProvider } from "next-auth/react";
import SearchBar from "./SearchBar";
import { BuiltInProviderType } from "next-auth/providers/index";
import { Session } from "next-auth";



const Header = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>,ClientSafeProvider> | null>(null);
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
          <ul className="flex items-center  gap-5">
            <li>
              <Link href={"/explore"}>Explore</Link>{" "}
            </li>
            <li>
              <Link
                href={
                  session? `/saves/${session?.user?.id}` : "/saves"
                }
              >
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
        </nav>
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
