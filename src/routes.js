import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";


const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/favorites",
    name: "favorites",
    component: () => import("./pages/FavoriteRecipes"),
  },
  {
    path: "/own",
    name: "own",
    component: () => import("./pages/OwnRecipes"),
  },
  {
    path: "/own/:recipeId",
    name: "ownrec",
    component: () => import("./pages/OwnRecipeView"),
  },
  {
    path: "/family",
    name: "family",
    component: () => import("./pages/FamilyRecipePage"),
  },
  {
    path: "/About",
    name: "about",
    component: () => import("./pages/About"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
