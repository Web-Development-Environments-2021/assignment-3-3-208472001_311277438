import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage")
  },
  {
    path: "/BeforeSearch",
    name: "BeforeSearch",
    component: () => import("./pages/BeforeSearchPage")
  },
  {
    path: "/About",
    name: "About",
    component: () => import("./pages/AboutPage")
  },
  {
    path: "/CurrentStageGames",
    name: "CurrentStageGames",
    component: () => import("./pages/CurrentStageGamesPage")
  },
  {
    path: "/Manager",
    name: "Manager",
    component: () => import("./pages/ManagerPage")
  },
  {
    path: "/FavoriteGames",
    name: "FavoriteGames",
    component: () => import("./pages/FavoriteGamesPage")
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound
  }
];

export default routes;
