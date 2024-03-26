import React from "react";
import type { Metadata } from "next";
import RecipeCard from "@/components/RecipeCard";

export const metadata: Metadata = {
  title: "Explore Random Recipes | Recipes",
  description: "Discover new and exciting random recipes on Recipes' Explore page. Explore a diverse collection of dishes ranging from appetizers to desserts. Get inspired and try something delicious today!",
};


async function fetchRandomRecipes() {
  const url =
    "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?tags=vegetarian%2Cdessert&number=9";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY as string,
      "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    },
    cache: "no-store",
  };
  try {
    const response = await fetch(url, options);
    const {recipes} = await response.json()  ;
    return recipes as Recipe[]; 
  } catch (err) {
    return []
  }
}

const Page = async () => {
  const  recipes  = await fetchRandomRecipes();

  return (
    <main className="py-32 medium-width">
      <h1 className="text-3xl font-medium text-center mb-10 underline decoration-wavy decoration-my_red underline-offset-8">
        Random Recipes
      </h1> 

      <div className="grid md:grid-cols-3 gap-5">        
         { recipes.map((item, index) => {
            return <RecipeCard key={index} recipeInfo={item} />;
          })}
      </div>
    </main>
  );
};

export default Page;
