import connectDB from "../../../config/database";
import User from "../../../models/User";
import { NextResponse } from "next/server";
export const GET = async (request, route) => {
  console.log(request.nextUrl.searchParams.get("id"));
  const userId = request.nextUrl.searchParams.get("id");
  try {
    await connectDB();
    const user = await User.findById(userId);

    // Modify the key from recipeId to id in each object
    const recipes = user.savedRecipes.map((recipe) => {
      return {
        id: recipe.recipeId,
        image: recipe.image,
        title: recipe.title,
      };
    });

    return NextResponse.json(recipes, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 404 });
  }
};

export const PATCH = async (request) => {
  const { userId, recipeId, title, image } = await request.json();
  try {
    await connectDB();
    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          savedRecipes: { recipeId: recipeId, title: title, image: image },
        },
      },
      { new: true }
    );
    console.log(user);
    return new Response("Updatedddd", { status: 200 });
  } catch (e) {
    return new Response("error", { status: 500 });
  }
};
