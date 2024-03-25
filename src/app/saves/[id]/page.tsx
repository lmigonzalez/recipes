import React from "react";
import type { Metadata } from "next";
import RecipeCard from "@/components/RecipeCard";

export const metadata: Metadata = {
  title: "Saved Recipes | Recipes",
  description: "Access all your saved recipes in one place on Recipes' Saved Recipes page. Keep track of your favorite dishes, create meal plans, and never lose a recipe again. Start building your personalized recipe collection today!",
};

export async function getSavedRecipes(id: number) {
  const url = `http://localhost:3000/api/users?id=${id}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
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
    <main className="medium-width">
      <h1 className="text-3xl font-medium text-center mb-10 underline decoration-wavy decoration-my_red underline-offset-8">
        Random Recipes
      </h1>
      <div className="grid md:grid-cols-3 gap-5">
        {recipes.length > 0 &&
          recipes.map((item, index) => {
            return <RecipeCard key={index} recipe={item} />;
          })}
      </div>
    </main>
  );
};

export default Page;
