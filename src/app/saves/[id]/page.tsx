import React from "react";
import type { Metadata } from "next";
import RecipeCard from "@/components/RecipeCard";
import MainLinkBtn from "@/components/MainLinkBtn";
import { User } from "next-auth";
export const metadata: Metadata = {
  title: "Saved Recipes | Recipes",
  description:
    "Access all your saved recipes in one place on Recipes' Saved Recipes page. Keep track of your favorite dishes, create meal plans, and never lose a recipe again. Start building your personalized recipe collection today!",
};

async function getSavedRecipes(id: string) {
  const url = `https://recipes-seven-sand.vercel.app/api/users?id=${id}`;
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store", 
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json() as Recipe[];
    return result;
  } catch (err) {
    return []
  }
}

const Page = async (params: User) => {

  const recipes = await getSavedRecipes(params.id);

  return (
    <main className="medium-width py-32">
      <h1 className="text-3xl font-medium text-center mb-10 underline decoration-wavy decoration-my_red underline-offset-8">
        Your Saved Recipes
      </h1>
      <div className="grid md:grid-cols-3 gap-5">
        {recipes.length > 0 ? (
          recipes.map((item, index) => {
            return <RecipeCard key={index} recipeInfo={item} />;
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
