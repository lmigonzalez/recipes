import React from "react";
import Image from "next/image";
import Parse from "html-react-parser";
export async function generateMetadata({ params }: { params: { id: number } }) {
  const recipeInfo = await getRecipeById(params.id);
  function transformTitle() {
    let newTitle = recipeInfo?.title
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return newTitle;
  }

  return {
    title: `${transformTitle()} Recipe | Recipes`,
    description: `Learn how to make delicious ${recipeInfo?.title} with our easy-to-follow recipe. Discover the ingredients, step-by-step instructions, and cooking tips to create a mouthwatering dish. Explore more recipes on Recipes today!`,
  };
}

async function getRecipeById(id: number) {
  const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY as string,
      "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    },
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result as Recipe;
  } catch (err) {
    return null
  }
}

const Page = async ({ params }: { params: { id: number } }) => {
  const recipeInfo = await getRecipeById(params.id);
  if(!recipeInfo)return <p>Recipe Not Found</p>
 

  return (
    <main className="medium-width py-32">
      <article className="space-y-5">
        <Image
          src={recipeInfo.image}
          alt={recipeInfo.title}
          width={500}
          height={500}
        />
        <h1 className="text-3xl font-bold">{recipeInfo.title}</h1>

        <div className="">
          <h2 className="text-lg font-semibold">Ready in:</h2>
          <div className="flex items-center gap-2 bg-my_red py-2 px-4 rounded w-fit text-white font-medium text-xl">
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
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <p>{recipeInfo.readyInMinutes}</p>
          </div>
        </div>

        <div className="">
          {" "}
          <h2 className="text-lg font-semibold">Summary:</h2>{" "}
          {Parse(recipeInfo.summary)}
        </div>

        <div className="">
          <h2 className="text-lg font-semibold">Wine Pairing:</h2>
          <p>{recipeInfo.winePairing.pairingText}</p>

          <ul className="list-inside list-disc text-sky-800">
            {recipeInfo.winePairing.pairedWines.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
        </div>

        <div className="">
          <h2 className="text-lg font-semibold">Instructions:</h2>
          <div className="list-inside list-disc text-sky-800">
            {Parse(recipeInfo.instructions)}
          </div>
        </div>

        <table className="border max-w-[700px] divide-y divide-gray-200">
          <thead className="bg-my_red">
            <tr>
              <th className="px-6 py-3 text-left text-white font-medium text-md uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-white font-medium text-md uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-white font-medium text-md uppercase tracking-wider">
                Unit
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recipeInfo.extendedIngredients.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="px-6 py-2 whitespace-nowrap">
                    {item.originalName}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap">{item.amount}</td>
                  <td className="px-6 py-2 whitespace-nowrap">{item.unit}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </article>
    </main>
  );
};

export default Page;