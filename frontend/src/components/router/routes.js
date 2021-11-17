import Main from "../Main";
import Uptimes from "../Uptimes";
import Liteservers from "../Liteservers";
import DhtServers from "../DthServers";

export const publicRoutes = [
  { path: "/", component: Main, exact: true, text: "Main" },

  { path: "/uptimes", component: Uptimes, exact: true, text: "Uptimes" },
  {
    path: "/liteservers",
    component: Liteservers,
    exact: true,
    text: "Liteservers",
  },
  {
    path: "/dhtservers",
    component: DhtServers,
    exact: true,
    text: "DhtServers",
  },
];
