import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { makeStyles } from "@material-ui/core/styles";
import Sidebar from "./Sidebar";
import routes from "./routes";
import styles from "./style/adminStyle";
import bgImage from "./style/images/sidebar-1.jpg";
import View from "./Blips/View/View";
import EditF from "./Blips/EditForm/EditForm";
import Form from "./Blips/form/form";
import ViewProject from "./Projects/View/ViewProject";
import Footer from "./components/Footer/Footer";

let ps;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    {/* <Redirect from="/admin" to="/admin/dashboard" /> */}
  </Switch>
);

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const classes = useStyles();
  const mainPanel = React.createRef();
  const [image] = React.useState(bgImage);
  const [color] = React.useState("green");
  const [mobileOpen, setMobileOpen] = React.useState();

  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
    if (window.innerWidth < 960) {
      setMobileOpen(true);
    }
  };

  const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
  };

  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={"Tech Radar"}
        image={image}
        color={color}
        {...rest}
        handleDrawerToggle={handleDrawerToggle}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Route path="/blips/edit/:id" exact component={EditF} />
        <Route path="/blips/view/:id" exact component={View} />
        <Route path="/blips/new" exact component={Form} />
        {/* <Route path="/blips/edit/:id" exact component={EditF} /> */}
        <Route path="/projects/view/:id" exact component={ViewProject} />
        {/* <Route path="/blips/new" exact component={Form} /> */}

        <div className={classes.content}>
          <div className={classes.container}>{switchRoutes}</div>
        </div>

        <Footer vis={mobileOpen}/>
      </div>
    </div>
  );
}
