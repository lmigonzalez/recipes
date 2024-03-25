import { Schema, model, models } from "mongoose";

const RecipeSchema = new Schema({
  recipeId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

let User;

if (models.User) {
  User = models.User;
} else {
  const UserSchema = new Schema(
    {
      email: {
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Please enter a valid email"],
      },
      username: {
        type: String,
        unique: [true, "Username already exists"],
        required: [true, "Please enter a valid username"],
      },
      savedRecipes: {
        type: [RecipeSchema],
        default: [],
      },
    },
    { timestamps: true }
  );

  User = model("User", UserSchema);
}

export default User;
