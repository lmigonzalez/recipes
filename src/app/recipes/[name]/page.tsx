import React from "react";
import RecipeCard from "@/components/RecipeCard";
export async function generateMetadata({ params }: { params: { name: string } }) {
  function transformTitle() {
    let newTitle = params.name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return newTitle;
  }

  return {
    title: `${transformTitle()} Recipe | Recipes`,
    description: `Learn how to make delicious ${params.name} with our easy-to-follow recipe. Discover the ingredients, step-by-step instructions, and cooking tips to create a mouthwatering dish. Explore more recipes on Recipes today!`,
  };
}



async function getRecipes(name: string) {
  const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=${name}&cuisine=italian&excludeCuisine=greek&diet=vegetarian&intolerances=gluten&equipment=pan&includeIngredients=tomato%2Ccheese&excludeIngredients=eggs&type=main%20course&instructionsRequired=true&fillIngredients=false&addRecipeInformation=false&titleMatch=Crock%20Pot&maxReadyTime=20&ignorePantry=true&sort=calories&sortDirection=asc&minCarbs=10&maxCarbs=100&minProtein=10&maxProtein=100&minCalories=50&maxCalories=800&minFat=10&maxFat=100&minAlcohol=0&maxAlcohol=100&minCaffeine=0&maxCaffeine=100&minCopper=0&maxCopper=100&minCalcium=0&maxCalcium=100&minCholine=0&maxCholine=100&minCholesterol=0&maxCholesterol=100&minFluoride=0&maxFluoride=100&minSaturatedFat=0&maxSaturatedFat=100&minVitaminA=0&maxVitaminA=100&minVitaminC=0&maxVitaminC=100&minVitaminD=0&maxVitaminD=100&minVitaminE=0&maxVitaminE=100&minVitaminK=0&maxVitaminK=100&minVitaminB1=0&maxVitaminB1=100&minVitaminB2=0&maxVitaminB2=100&minVitaminB5=0&maxVitaminB5=100&minVitaminB3=0&maxVitaminB3=100&minVitaminB6=0&maxVitaminB6=100&minVitaminB12=0&maxVitaminB12=100&minFiber=0&maxFiber=100&minFolate=0&maxFolate=100&minFolicAcid=0&maxFolicAcid=100&minIodine=0&maxIodine=100&minIron=0&maxIron=100&minMagnesium=0&maxMagnesium=100&minManganese=0&maxManganese=100&minPhosphorus=0&maxPhosphorus=100&minPotassium=0&maxPotassium=100&minSelenium=0&maxSelenium=100&minSodium=0&maxSodium=100&minSugar=0&maxSugar=100&minZinc=0&maxZinc=100&offset=0&number=10&limitLicense=false&ranking=2`;
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
  } catch (error) {
    console.error(error);
  }
}

interface ResultsProps {
  id: number;
  title: string;
  image: string;
}

const Page = async ({ params }: { params: { name: string } }) => {
  const { results }: { results: ResultsProps[] } = await getRecipes(
    params.name
  );

  function transformText(text: string) {
    
    let newTitle = text
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return newTitle;
  }


  return (
    <main className="medium-width py-32">
      <h1 className="text-3xl font-medium text-center mb-10 underline decoration-wavy decoration-my_red underline-offset-8">
        Recipes For {transformText(params.name)}
      </h1>

      <div className="grid md:grid-cols-3 gap-5">
        {results.length > 0 ? (
          results.map((item, index) => {
            return <RecipeCard key={index} recipe={item} />;
          })
        ) : (
          <div className="col-span-3 text-center text-lg text-my_red">
            <p>
              We were unable to locate a recipe under that name. Please consider
              searching for an alternative recipe.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;
