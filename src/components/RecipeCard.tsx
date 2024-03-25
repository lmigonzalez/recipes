"use client";
import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
interface RecipeProps {
  id: number;
  image: string;
  title: string;
}

const RecipeCard: FC<{ recipe: RecipeProps }> = ({ recipe }) => {
  const { data: session }: any = useSession();

  async function saveRecipe() {
    const data = {
      userId: session?.user?.id,
      recipeId: recipe.id,
      title: recipe.title,
      image: recipe.image,
    };

    try {
      const response = await fetch("/api/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="hover:shadow-2xl rounded-md transition-all h-[300px] bg-my_black relative">
      <button
        onClick={saveRecipe}
        className="absolute right-2 top-2 bg-white rounded-full p-2 shadow-lg hover:bg-sky-200 transition-all"
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
          src={`${recipe.image}`}
          alt={recipe.title}
          width={300}
          height={200}
          className="w-full rounded-t-md"
        />
        <div className=" text-white p-2 rounded-b-md  h-fit">
          <Link href={`/recipe/${recipe.id}`}>
            <h3 className="font-medium mb-2 hover:text-my_red transition-colors">
              {" "}
              {recipe.title}
            </h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
