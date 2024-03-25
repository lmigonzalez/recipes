import React from "react";
import RecipeCard from "@/components/RecipeCard";

export async function getRandomRecipes() {
  const url =
    "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?tags=vegetarian%2Cdessert&number=9";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY || "",
      "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
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

interface IngredientProps {
  id: number;
  name: string;
  amount: number;
  unit: string;
}

interface RecipeProps {
  id: number;
  title: string;
  readyInMinutes: number;
  image: string;
  summary: string;
  occasions: string[];
  extendedIngredients: IngredientProps[];
}

const Explore = async () => {
  const { recipes }: { recipes: RecipeProps[] } = await getRandomRecipes();
  return (
    <main className="py-32 medium-width">
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

export default Explore;
