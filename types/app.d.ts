interface IngredientProps {
  id: number;
  name: string;
  amount: number;
  unit: string;
  originalName: string
}

interface Recipe {
  title: string;
  readyInMinutes: number;
  image: string;
  summary: string;
  winePairing: { pairedWines: string[]; pairingText: string };
  instructions: string;
  extendedIngredients: IngredientProps[];
  id: number;  
  occasions: string[];
}

interface SearchResult  {
    id: string,
    title: string,
    image: string,
    imageType: string,
    nutrition: {nutrients:IngredientProps[]}
  }