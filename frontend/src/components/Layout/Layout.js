import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { makeStyles } from "@material-ui/core/styles";
import Sidebar from "../Sidebar/Sidebar";
import routes from "../../routes/routes";
import styles from "../../style/adminStyle";
import bgImage from "../../style/images/sidebar-1.jpg";
import View from "../../Blips/View/View";
import EditF from "../../Blips/EditForm/EditForm";
import Form from "../../Blips/form/form";
import ViewProject from "../../Projects/View/ViewProject";
import Footer from "../Footer/Footer";
import NewProject from "../../Projects/NewProject/NewProject";
import EditProject from "../../Projects/EditProject/EditProject";
import Blips from "../../Blips/Blips";
import Projects from "../../Projects/Projects";
import Dashboard from "../../Dashboard/Dashboard";
import Header from "../Header/Header";
import Login from "../Login/Login";
import axios from "../../axios/axios";

let ps;

// const switchRoutes = (
//   <Switch>
//     {routes.map((prop, key) => {
//       if (prop.layout === "/admin") {
//         return (
//           <Route
//             path={prop.layout + prop.path}
//             component={prop.component}
//             key={key}
//           />
//         );
//       }
//       return null;
//     })}
//     {/* <Redirect from="/admin" to="/admin/dashboard" /> */}
//   </Switch>
// );

const useStyles = makeStyles(styles);

export default function Layout({ ...rest }) {
  // const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const classes = useStyles();
  const mainPanel = React.createRef();
  const [image] = React.useState(bgImage);
  const [color] = React.useState("green");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  // const handleFixedClick = () => {
  //   if (fixedClasses === "dropdown") {
  //     setFixedClasses("dropdown show");
  //   } else {
  //     setFixedClasses("dropdown");
  //   }
  // };

  useEffect(() => {
    if (currentUser) {
      axios
        .post("/auth/token/" + currentUser.accessToken, currentUser.accessToken)
        .then((response) => {
          console.log(response);
          if (response.status === 403) {
            localStorage.removeItem("user");
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    } else {
      setMobileOpen(true);
    }
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
        <Header />

        {currentUser ? (
          <Switch>
            <Route exact path="/blips/edit/:id" exact component={EditF} />
            <Route path="/blips/new" exact component={Form} />
            <Route path="/blips/view/:id" exact component={View} />
            <Route path="/projects/edit/:id" exact component={EditProject} />
            <Route path="/projects/new" exact component={NewProject} />
            <Route path="/projects/view/:id" exact component={ViewProject} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/projects/view/:id" exact component={ViewProject} />
            <Route path="/blips/view/:id" exact component={View} />
            <Route path="/login" exact component={Login} />
          </Switch>
        )}

        <div className={classes.content}>
          <div className={classes.container}>
            {/* {switchRoutes} */}
            <Switch>
              <Route exact path="/blips" component={Blips} />
              <Route exact path="/projects" component={Projects} />
              <Route exact path="/" component={Dashboard} />
            </Switch>
          </div>
        </div>

        <Footer vis={mobileOpen} />
      </div>
    </div>
  );
}
