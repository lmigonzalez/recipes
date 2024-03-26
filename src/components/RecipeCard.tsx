"use client";
import React, { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";


const RecipeCard: FC<{ recipeInfo: Recipe | SearchResult }> = ({ recipeInfo }) => {
  const [showLoginWindow, setShowLoginWindow] = useState(false);

  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  async function saveRecipe() {
 
    if (!session) {
      setShowLoginWindow(true);

      return;
    }
    const data = {
      userId: session?.user?.id,
      recipeId: recipeInfo.id,
      title: recipeInfo.title,
      image: recipeInfo.image,
    };

    try {
      await fetch("/api/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (pathname.includes("/saves")) {

        router.refresh();
      }
    } catch (err) {
     return null
    }
  }

  return (
    <div className="hover:shadow-2xl rounded-md transition-all bg-my_black relative">
      {showLoginWindow && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 backdrop-blur-sm z-[100] flex justify-center items-center">
          <div className="bg-white p-4 rounded-xl shadow-lg text-center">
            <p className="text-md font-medium">
              Please log in to save recipes.
            </p>
            <div className="flex gap-4 mt-5">
              <button
                className="w-fit rounded-full px-8 py-2 overflow-hidden group bg-red-700  text-white hover:ring-2 hover:ring-offset-2 hover:ring-my_red transition-all ease-out duration-300"
                onClick={() => setShowLoginWindow(false)}
              >
                Cancel
              </button>
              <button
                onClick={() => signIn()}
                className="w-fit rounded-full px-8 py-2 overflow-hidden group bg-green-700 text-white hover:ring-2 hover:ring-offset-2 hover:ring-my_red transition-all ease-out duration-300"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={saveRecipe}
        className="absolute right-2 top-2 bg-my_red rounded-full p-2 shadow-lg hover:bg-red-600 text-white transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      </button>
      <div className="">
        <Image
          src={`${recipeInfo.image}`}
          alt={recipeInfo.title}
          width={300}
          height={200}
          className="w-full rounded-t-md"
        />
        <div className=" text-white p-2 rounded-b-md  h-fit">
          <Link href={`/recipe/${recipeInfo.id}`}>
            <h3 className="font-medium mb-2 hover:text-my_red transition-colors">
              {" "}
              {recipeInfo.title}
            </h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
