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
    path: "/CoachPage",
    name: "CoachPage",
    component: () => import("./pages/CoachPersonalPage")
  },
  {
    path: "/TeamPage",
    name: "TeamPage",
    component: () => import("./pages/TeamHomePage")
  },
  {
    path: "/Search",
    name: "Search",
    component: () => import("./pages/SearchPage")
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
