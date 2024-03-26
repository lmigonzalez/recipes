import React from "react";
import type { Metadata } from "next";
import RecipeCard from "@/components/RecipeCard";
import MainLinkBtn from "@/components/MainLinkBtn";
export const metadata: Metadata = {
  title: "Saved Recipes | Recipes",
  description:
    "Access all your saved recipes in one place on Recipes' Saved Recipes page. Keep track of your favorite dishes, create meal plans, and never lose a recipe again. Start building your personalized recipe collection today!",
};

async function getSavedRecipes(id: number) {
  const url = `recipes-seven-sand.vercel.app/api/users?id=${id}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
}

interface RecipeProps {
  id: number;
  title: string;
  image: string;
}

const Page = async ({ params }: { params: { id: number } }) => {
  const recipes: RecipeProps[] = await getSavedRecipes(params.id);

  return (
    <main className="medium-width py-32">
      <h1 className="text-3xl font-medium text-center mb-10 underline decoration-wavy decoration-my_red underline-offset-8">
        Your Saved Recipes
      </h1>
      <div className="grid md:grid-cols-3 gap-5">
        {recipes.length > 0 ? (
          recipes.map((item, index) => {
            return <RecipeCard key={index} recipe={item} />;
          })
        ) : (
          <div className="flex justify-center items-center flex-col md:col-span-3 mt-10">
            <p>You currently have no saved recipes.</p>
            <MainLinkBtn text="Explore Recipes" url="explore" />
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;
