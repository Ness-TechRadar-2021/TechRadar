import Dashboard from "@material-ui/icons/Dashboard";
import DataUsageIcon from "@material-ui/icons/DataUsage";
import Blips from "../Blips/Blips";
import Projects from "../Projects/Projects";
import DashboardPage from '../Dashboard/Dashboard';
import HomeIcon from '@material-ui/icons/Home';

const dashboardRoutes = [
  {
    path: "",
    name: "Dashboard",
    icon: HomeIcon,
    component: DashboardPage,
    layout: "/"
  },
  {
    path: "blips",
    name: "Blips",
    icon: DataUsageIcon,
    component: Blips,
    layout: "/",
  },
  {
    path: "projects",
    name: "Projects",
    icon: Dashboard,
    component: Projects,
    layout: "/",
  },
];

export default dashboardRoutes;
