import {
  Button,
  Container,
  FormControl,
  makeStyles,
  TextField,
  MenuItem,
  Select,
  InputLabel,
} from "@material-ui/core";
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "../../axios/axios";
import FormLabel from "@material-ui/core/FormLabel";
import { useParams } from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(1),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  blipContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const EditProject = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [project, setProject] = useState({});
  const currentUser = JSON.parse(localStorage.getItem("user"));
  let config;
  if(currentUser) {
    config = {
    headers: {
      'x-access-token': currentUser.accessToken
    }
  }
  } 

  useEffect(() => {
    axios.get("/projects/" + id).then((response) => setProject(response.data));
  }, []);

  const [blips, setBlips] = useState([]);
  const [currentBlips, setCurrentBlips] = useState([]);
  const [error, setError] = useState(false);
  const [selectedBlip, setSelectedBlip] = useState("");
  const [blipAdd, setBlipAdd] = useState({});
  useEffect(() => {
    axios
      .get("/blips")
      .then((response) => setBlips(response.data))
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, []);

  useEffect(() => {
    if (project.blips !== undefined)
      project.blips.map((Blipid) => {
        axios
          .get("/blips/" + Blipid)
          .then((response) => {
            setCurrentBlips((oldBlips) => [...oldBlips, response.data]);
            // console.log(response.data.name);
          })
          .catch((error) => {
            console.log(error);
            // setError(true);
          });
      });
  }, [project.blips]);

  useEffect(() => {
    if (selectedBlip !== "") {
      axios
        .get("/blips/" + selectedBlip)
        .then((response) => {
          setBlipAdd(response.data);
          // console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
          // setError(true);
        });
    }
  }, [selectedBlip]);

  let Blips = <p style={{ textAlign: "center" }}>0 Blips</p>;

  const formik = useFormik({
    initialValues: {
      name: project.name,
      description: project.description,
      blips: project.blips,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(30, "Must be 30 characters or less")
        .min(2, "Must be 2 characters or more")
        .required("Required"),
      description: Yup.string()
        .max(1500, "Must be 1500 characters or less")
        .min(30, "Must be 30 characters or more")
        .required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      axios
        .put("/projects/" + id, values, config)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    enableReinitialize: true,
  });

  let allBlips;
  if (!error) {
    allBlips = blips.map((blip, index) => {
      return (
        <MenuItem key={index} value={blip._id} name={blip.name}>
          {blip.name}
        </MenuItem>
      );
    });
  }

  const handleDelete = (blipToDelete) => () => {
    setCurrentBlips((currentBlips) =>
      currentBlips.filter((blip) => blip._id !== blipToDelete._id)
    );
    formik.values.blips.splice(
      formik.values.blips.indexOf(blipToDelete._id),
      1
    );
  };

  const handleAdd = () => {
    if (selectedBlip !== "") {
      setCurrentBlips((oldBlips) => [...oldBlips, blipAdd]);
      formik.values.blips.push(selectedBlip);
    }
  };

  if (currentBlips !== undefined) {
    Blips = currentBlips.map((blip, index) => {
      return (
        <li key={index}>
          <Chip
            label={blip.name}
            onDelete={handleDelete(blip)}
            className={classes.chip}
          />
        </li>
      );
    });
  }

  return (
    <>
      <Container maxWidth="xs">
        <h1>Edit this project!</h1>
        <form onSubmit={formik.handleSubmit} className={classes.form}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Name</FormLabel>
          </FormControl>
          <TextField
            id="name"
            // label="Name"
            className="text-input"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
            error={formik.errors.name && formik.touched.name ? true : false}
            helperText={
              formik.errors.name && formik.touched.name
                ? formik.errors.name
                : ""
            }
          />
          <FormControl component="fieldset">
            <FormLabel component="legend">Description</FormLabel>
          </FormControl>
          <TextField
            id="description"
            // label="Description"
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
          <FormControl>
            <InputLabel id="blips-label">Blips</InputLabel>
            <Select
              labelId="blips-label"
              id="blips"
              onChange={(e) => {
                console.log([e.target.name]);
                setSelectedBlip(e.target.value);
              }}
              value={selectedBlip}
              name={blipAdd}
              label="Blip"
            >
              {allBlips}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<AddIcon />}
            onClick={handleAdd}
          >
            Add blip
          </Button>
          <div className={classes.blipContainer}>{Blips}</div>

          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </form>
      </Container>
    </>
  );
};

export default EditProject;
