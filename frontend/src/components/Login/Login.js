import { Button, Container, makeStyles, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import axios from "../../axios/axios";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    marginTop: "3%",
  },
  img: {
    textAlign: "center",
    borderRadius: 10,
  },
  container: {
    marginTop: "5%",
  },
}));

const Login = (props) => {
  const classes = useStyles();
  let showHidePassword = false;

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      axios
        .post("/auth/login", values)
        .then((response) => {
          if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
          // props.history.push("/profile");
          props.history.push({ pathname: "/" });
          window.location.reload();

          //   return response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <>
      <Container maxWidth="xs" className={classes.container}>
        <div className={classes.img}>
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            // className="profile-img-card"
          />
        </div>

        <form onSubmit={formik.handleSubmit} className={classes.form}>
          <TextField
            id="username"
            label="Username"
            className="text-input"
            onChange={formik.handleChange}
            value={formik.values.username}
            onBlur={formik.handleBlur}
            error={
              formik.errors.username && formik.touched.username ? true : false
            }
            helperText={
              formik.errors.username && formik.touched.username
                ? formik.errors.username
                : ""
            }
          />
          <TextField
            id="password"
            type={showHidePassword ? "text" : "password"}
            label="Password"
            className="text-input"
            onChange={formik.handleChange}
            value={formik.values.description}
            onBlur={formik.handleBlur}
            error={
              formik.errors.description && formik.touched.description
                ? true
                : false
            }
            helperText={
              formik.errors.description && formik.touched.description
                ? formik.errors.description
                : ""
            }
          />
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </form>
      </Container>
    </>
  );
};

export default Login;
