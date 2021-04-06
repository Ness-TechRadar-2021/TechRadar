import React, { useEffect } from "react";
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";
import "./styles.css";
import "./styles-custom.css";
import axios from '../../axios';

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const StyledSelect = styled.select`
  color: var(--blue);
`;

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: var(--red-600);
  width: 400px;
  margin-top: 0.25rem;
  &:before {
    content: "❌ ";
    font-size: 10px;
  }
  @media (prefers-color-scheme: dark) {
    color: var(--red-300);
  }
`;

const StyledLabel = styled.label`
  margin-top: 1rem;
`;

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledSelect {...field} {...props} />
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </>
  );
};

const NewForm = () => {
    const [state, setState] = React.useState({
        name: "",
        description: "",
        quadrant: "",
        ring: "",
      });

      const handleChange = (event) => {
        const name = event.target.name;
        setState({
          ...state,
          [name]: event.target.value,
        });
      };

      const submitFormHandler = (event) => {
        // event.preventDefault();
        //alert('You continue!');
        const order = state;
        console.log(state);
        axios
          .post("/blips", order)
          .then((response) => {
          })
          .catch((error) => {
            console.log(error);
          });
        setState({
          name: "",
          description: "",
          quadrant: "",
          ring: "",
        });
      };

  return (
    <>
      <h1>Add a new blip!</h1>
      <Formik
        initialValues={{
          name: "",
          description: "",
          quadrant: "",
          ring: ""
        }}
        validationSchema={Yup.object({
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
            ["Programming Languages and Frameworks", "Tools", "Platforms", "Techniques"],
            "Invalid Quadrant Type"
          )
            .required("Required"),
          ring: Yup.string()
            .oneOf(
              ["Adopt", "Trial", "Assess", "Hold"],
              "Invalid Job Type"
            )
            .required("Required")
        })}
        onSubmit={async (values, { setSubmitting }) => {
          await new Promise(r => setTimeout(r, 500));
          setSubmitting(false);
        }}
      >
        <Form>
          <MyTextInput
            label="Name"
            name="name"
            type="text"
            placeholder="JavaScript, React, etc"
            value={state.name} onChange={handleChange}
          />
          <MyTextInput
            label="Description"
            name="description"
            type="text"
            placeholder="Some description text"
            value={state.description} onChange={handleChange}
          />
          <MySelect label="Quadrant Type" name="quadrant" value={state.quadrant} onChange={handleChange}>
            <option value="">Select a quadrant type</option>
            <option value="Programming Languages and Frameworks">Programming Languages and Frameworks</option>
            <option value="Tools">Tools</option>
            <option value="Platforms">Platforms</option>
            <option value="Techniques">Techniques</option>
          </MySelect>
          <MySelect label="Ring Type" name="ring" value={state.ring} onChange={handleChange}>
            <option value="">Select a ring type</option>
            <option value="Adopt">Adopt</option>
            <option value="Trial">Trial</option>
            <option value="Assess">Assess</option>
            <option value="Hold">Hold</option>
          </MySelect>
            <br />
          <button type="submit" onClick={() => {
          submitFormHandler();
        }}>Submit</button>
        </Form>
      </Formik>
    </>
  );
};

function Formn() {
  return <NewForm />;
}


export default Formn
