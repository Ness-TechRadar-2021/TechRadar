import Dashboard from "@material-ui/icons/Dashboard";
import DataUsageIcon from "@material-ui/icons/DataUsage";
import Blips from "./Blips/Blips";
import Projects from "./Projects/Projects";

const dashboardRoutes = [
  {
    path: "/blips",
    name: "Blips",
    icon: DataUsageIcon,
    component: Blips,
    layout: "/admin",
  },
  {
    path: "/projects",
    name: "Projects",
    icon: Dashboard,
    component: Projects,
    layout: "/admin",
  },
  // {
  //   path: "/",
  //   name: "Dashboard",
  //   icon: Dashboard,
  //   // component: Home,
  //   // layout: "/"
  // }
];

export default dashboardRoutes;
