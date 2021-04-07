import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
  },
}));

const Form2 = () => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      quadrant: "",
      ring: "",
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
    },
  });

  return (
    <>
      <h1>Add a new blip!</h1>
      <Container maxWidth="xs">
        <form onSubmit={formik.handleSubmit} className={classes.form}>
          <TextField
            id="name"
            label="Name"
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
          <TextField
            id="description"
            label="Description"
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
            <InputLabel id="quadrant-label">Quadrant</InputLabel>
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
            <InputLabel id="ring-label">Ring</InputLabel>
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

export default Form2;
