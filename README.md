# Recipe Application Overview

In the recipe application, users can explore a plethora of recipes. Users can search for specific items like "Pasta" or "Tacos," and the application will display a list of related recipes. Moreover, users can save their favorite recipes for future reference, provided they sign in via Google. For those looking for culinary inspiration, the app also features a functionality to discover random recipes.

## Technical Stack

- **Frontend Development:** The web application is developed using Next.js 14, leveraging Typescript and Tailwind CSS to create a user interface that is both appealing and responsive, as well as accessible.
- **Backend Development:** Backend services are facilitated by Next.js 14 API, with MongoDB used for data storage. User authentication is managed through Next-Auth with Google login integration.
- **Recipe Data:** Recipe information is sourced from the Spoonacular API (<https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/>), which provides a range of endpoints to fetch various culinary data.
