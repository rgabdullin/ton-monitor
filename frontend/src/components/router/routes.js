import Main from "../Main";
import NotMain from "../NotMain";

export const privateRoutes = [];

export const publicRoutes = [
  { path: "/main", component: Main, exact: true, text: "Main" },
  { path: "/notmain", component: NotMain, exact: true, text: "NotMain" },
];
