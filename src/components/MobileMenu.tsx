"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { LiteralUnion, ClientSafeProvider } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";
const MobileMenu = () => {
  const path = usePathname();
  const [showMenu, setShowMenu] = useState(true);
  const { data: session } = useSession();
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    setShowMenu(false);
  }, [path]);

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();

      setProviders(res);
    };
    setAuthProviders();
  }, []);
  return (
    <div className="relative block md:hidden z-[60]">
      <div className="absolute right-0">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className={`w-12 h-12 bg-white rounded-full z-50 relative border shadow-md`}
        >
          <div
            className={`transition-all duration-200 w-6 h-[3px] bg-my_red rounded-full absolute  ${
              showMenu
                ? "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45"
                : "top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3"
            }`}
          ></div>

          <div
            className={`transition-all duration-200 w-8 h-[3px] bg-my_red rounded-full  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
              showMenu ? "hidden" : "absolute"
            }`}
          ></div>

          <div
            className={`transition-all duration-200 w-6 h-[3px] bg-my_red rounded-full absolute  ${
              showMenu
                ? "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-45"
                : "top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-2/3"
            }`}
          ></div>
        </button>
      </div>
      {showMenu && (
        <div className="fixed w-full h-full top-0 left-0 bg-black bg-opacity-40 flex justify-end">
          <ul className="flex justify-center flex-col items-center gap-5 font-semibold w-3/5 bg-sky-700 text-white text-xl">
            <li>
              <Link href={"/explore"}>Explore</Link>{" "}
            </li>
            <li>
              <Link href={session ? `/saves/${session?.user?.id}` : "/saves"}>
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
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
