import Main from "../Main";
import Uptimes from "../Uptimes";
import Liteservers from "../Liteservers";
import Validators from "../Validators";

export const publicRoutes = [
  { path: "/", component: Main, exact: true, text: "Main" },

  {
    path: "/liteservers",
    component: Liteservers,
    exact: true,
    text: "Liteservers",
  },
  {
    path: "/validators",
    component: Validators,
    exact: true,
    text: "Validators",
  },
];
