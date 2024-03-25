import connectDB from "../../../config/database";
import User from "../../../models/User";
import { NextResponse } from "next/server";
export const GET = async (request) => {
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
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return new Response("User not found", { status: 404 });
    }

    const recipeExists = existingUser.savedRecipes.some(
      (recipe) => recipe.recipeId === recipeId
    );
    if (recipeExists) {
      // If recipe already exists, remove it
      await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { savedRecipes: { recipeId: recipeId } } },
        { new: true }
      );
      return new Response("Recipe removed", { status: 200 });
    } else {
      // If recipe doesn't exist, add it
      await User.findOneAndUpdate(
        { _id: userId },
        {
          $push: {
            savedRecipes: { recipeId: recipeId, title: title, image: image },
          },
        },
        { new: true }
      );
      return new Response("Recipe added", { status: 200 });
    }
  } catch (e) {
    console.error(e);
    return new Response("Error", { status: 500 });
  }
};
