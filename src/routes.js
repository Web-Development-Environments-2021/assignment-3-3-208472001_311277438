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
    component: () => import("./pages/About")
  },
  {
    path: "/CurrentStageGames",
    name: "CurrentStageGames",
    component: () => import("./pages/CurrentStageGames")
  },
  {
    path: "/Manager",
    name: "Manager",
    component: () => import("./pages/Manager")
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound
  }
];

export default routes;
