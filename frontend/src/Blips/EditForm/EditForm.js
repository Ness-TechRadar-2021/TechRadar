import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "../../axios/axios";
import { useParams } from "react-router-dom";
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles(() => ({
  form: {
    display: "flex",
    flexDirection: "column",
  },
}));

const EditForm = () => {
  const classes = useStyles();
  // const [state, setState] = React.useState({});

  const { id } = useParams();
  const [blip, setBlip] = useState({});
  useEffect(() => {
    // GET request using axios inside useEffect React hook
    axios.get("/blips/" + id).then((response) => setBlip(response.data));
  }, []);
  console.log(blip.ring);

  const formik = useFormik({
    initialValues: {
      name: blip.name,
      description: blip.description,
      quadrant: blip.quadrant,
      ring: blip.ring,
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
      quadrant: Yup.string()
        .oneOf(
          [
            "Programming Languages and Frameworks",
            "Tools",
            "Platforms",
            "Techniques",
          ],
          "Invalid Quadrant Type"
        )
        .required("Required"),
      ring: Yup.string()
        .oneOf(["Adopt", "Trial", "Assess", "Hold"], "Invalid Job Type")
        .required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      console.log(blip);
      axios
        .put("/blips/" + id, values)
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });
    },
    enableReinitialize: true,
  });

  return (
    <>
      <Container maxWidth="xs">
        <h1>Edit this blip!</h1>
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
          <FormControl
            error={
              formik.errors.quadrant && formik.touched.quadrant ? true : false
            }
          >
            {/* <InputLabel id="quadrant-label">Quadrant</InputLabel> */}
            <FormControl component="fieldset">
              <FormLabel component="legend">Quadrant</FormLabel>
            </FormControl>
            <Select
              labelId="quadrant-label"
              id="quadrant"
              onChange={formik.handleChange("quadrant")}
              value={formik.values.quadrant}
              label="Quadrant"
            >
              <MenuItem value="Programming Languages and Frameworks">
                Programming Languages and Frameworks
              </MenuItem>
              <MenuItem value="Tools">Tools</MenuItem>
              <MenuItem value="Platforms">Platforms</MenuItem>
              <MenuItem value="Techniques">Techniques</MenuItem>
            </Select>
            {formik.errors.quadrant && formik.touched.quadrant ? (
              <FormHelperText>{formik.errors.quadrant}</FormHelperText>
            ) : (
              ""
            )}
          </FormControl>
          <FormControl
            error={formik.errors.ring && formik.touched.ring ? true : false}
          >
            {/* <InputLabel id="ring-label">Ring</InputLabel> */}
            <FormControl component="fieldset">
              <FormLabel component="legend">Ring</FormLabel>
            </FormControl>
            <Select
              labelId="ring-label"
              id="ring"
              onChange={formik.handleChange("ring")}
              value={formik.values.ring}
              label="Ring"
            >
              <MenuItem value="Adopt">Adopt</MenuItem>
              <MenuItem value="Trial">Trial</MenuItem>
              <MenuItem value="Assess">Assess</MenuItem>
              <MenuItem value="Hold">Hold</MenuItem>
            </Select>
            {formik.errors.ring && formik.touched.ring ? (
              <FormHelperText>{formik.errors.ring}</FormHelperText>
            ) : (
              ""
            )}
          </FormControl>
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </form>
      </Container>
    </>
  );
};

export default EditForm;