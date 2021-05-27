import { Button, Container, makeStyles, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import axios from "../../axios/axios";
import Modal from "@material-ui/core/Modal";

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
  paper: {
    position: "absolute",
    width: "30%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: "black",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-evenly",
  },
}));

const Login = (props) => {
  const classes = useStyles();
  let showHidePassword = false;
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          setOpen(true);
        });
    },
  });

  const messageP = Math.random();
  let message;

  if (messageP < 0.2) {
    message = (
      <h3>
        OH... OH... Monkey could not do log in! Monkey not find user or secret
        banana code!
      </h3>
    );
  }

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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <div className={classes.paper}>
          {message ? (
            message
          ) : (
            <div>
              {" "}
              <h3>Error</h3>
              <h4>Incorrect username or password</h4>
              <h4>
                Either no user with the given username could be found, or the
                password you gave was wrong. Please check the username and try
                again.
              </h4>
            </div>
          )}
          <div className={classes.buttonsContainer}>
            <Button onClick={handleClose} variant="outlined" color="secondary">
              OK
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Login;
