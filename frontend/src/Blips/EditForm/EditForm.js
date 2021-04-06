// import React from 'react';
// import './EditForm.css';
// import { useFormik } from 'formik';
// import { makeStyles } from '@material-ui/core/styles';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import axios from '../../axios';

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//       width: '25ch',
//     },
//   },
//   option: {
//     color: 'black'
//   }

// }));

// const validate = values => {
//   const errors = {};

//   if (!values.name) {
//     errors.name = 'Required';
//   } else if (values.name.length < 5) {
//     errors.name = 'Must be 5 characters or more';
//   }

//   if (!values.description) {
//     errors.description = 'Required';
//   } else if (values.description.length < 20) {
//     errors.description = 'Must be 20 characters or more';
//   }

//   if (!values.quadrant) {
//     errors.quadrant = 'Required';
//   }

//   if (!values.ring) {
//       errors.ring = 'Required';
//     }

//   return errors;
// };
  
//   const EditForm = () => {
//     const formik = useFormik({
//       initialValues: {
//         name: '',
//         description: '',
//         ring: '',
//         quadrant: ''
//       },
//       validate,
//       onSubmit: values => {
//         alert(JSON.stringify(values, null, 2));
//       },
//     });

//     const classes = useStyles();
//     const [state, setState] = React.useState({
//       name: '',
//       description: '',
//       quadrant: '',
//       ring: ''
//     });
  
//     const handleChange = (event) => {
//       const name = event.target.name;
//       setState({
//         ...state,
//         [name]: event.target.value,
//       });
//     };

// const purchaseContinueHandler = () => {
//       //alert('You continue!');
//       const order = state;
//       console.log(order)
//       axios.post('/blips', order)
//           .then(response => {
//               //this.setState({loading: false, purchasing: false});
//           })
//           .catch(error => {
//               console.log(error)
//               //this.setState({loading: false, purchasing: false});
//           });
//       setState({
//           name: '',
//           description: '',
//           quadrant: '',
//           ring: ''
//       });
//   }
//     return (
//       <div className="login-box">
//         <h2>Edit</h2>
//         <form>
//           <div className="user-box">
//             <input  label="Name"
//                     id="name"
//                     name="name"
//                     type="text"
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.name}/>
//             <label>Name</label>
//           </div>
//           {formik.touched.name && formik.errors.name ? (<div style={{color:'#FF0000'}}>{formik.errors.name}</div>) : null}

//           <div className="user-box">
//             <input label="Description"
//                 id="description"
//                 name="description"
//                 type="text"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.description}
//               />
//             <label>Description</label>
//           </div>
//           {formik.touched.description && formik.errors.description ? (<div style={{color:'#FF0000'}}>{formik.errors.description}</div>) : null}

//           <FormControl className={classes.formControl}>
//                 <InputLabel htmlFor="quadrant" style={{color:'#90EE90'}}>Quadrant</InputLabel>
//                 <Select
//                     native
//                     style={{color:'white'}}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.quadrant}
//                     inputProps={{
//                     name: 'quadrant',
//                     id: 'quadrant',
//                 }}
//                 >
//                     <option aria-label="None" value="" />
//                     <option className={classes.option}>Programming Languages and Frameworks</option>
//                     <option className={classes.option}>Tools</option>
//                     <option className={classes.option}>Platforms</option>
//                     <option className={classes.option}>Techniques</option>
//                 </Select>
//             </FormControl>
//             {formik.touched.quadrant && formik.errors.quadrant ? (<div style={{color:'#FF0000'}}>{formik.errors.quadrant}</div>) : null}

//             <FormControl className={classes.formControl}>
//                 <InputLabel htmlFor="ring" style={{color:'#90EE90'}}>Ring</InputLabel>
//                 <Select
//                     native
//                     style={{color:'white'}}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.ring}
//                     inputProps={{
//                     name: 'ring',
//                     id: 'ring',
//                 }}
//                 >
//                     <option aria-label="None" value="" />
//                     <option className={classes.option}>Adopt</option>
//                     <option className={classes.option}>Trial</option>
//                     <option className={classes.option}>Assess</option>
//                     <option className={classes.option}>Hold</option>
//                 </Select>
//             </FormControl>
//             {formik.touched.ring && formik.errors.ring ? (<div style={{color:'#FF0000'}}>{formik.errors.ring}</div>) : null}
// <br></br>

//           <button type='submit'>
//             <span></span>
//             <span></span>
//             <span></span>
//             <span></span>
//             Submit
//           </button>
//         </form>

//       </div>
//     );
// }
    

// export default EditForm;

import React, { useState, useEffect } from "react";
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";
import "./styles.css";
import "./styles-custom.css";
import axios from '../../axios';
import { useParams } from "react-router-dom";

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

const EditF = () => {
    // const [state, setState] = React.useState({
    //     name: "",
    //     description: "",
    //     quadrant: "",
    //     ring: "",
    //   });
      const { id } = useParams();
      const [blip, setBlip] = useState({});
      useEffect(() => {
        // GET request using axios inside useEffect React hook
        axios.get("/blips/" + id).then((response) => setBlip(response.data));
      }, []);

      const handleChange = (event) => {
        const name = event.target.name;
        setBlip({
          ...blip,
          [name]: event.target.value,
        });
      };

      const submitFormHandler = (event) => {
        // event.preventDefault();
        //alert('You continue!');
        const order = blip;
        console.log(blip);
        axios
          .put("/blips/" + id, order)
          .then((response) => {
          })
          .catch((error) => {
            console.log(error);
          });
        setBlip({
          name: "",
          description: "",
          quadrant: "",
          ring: "",
        });
      };

  return (
    <>
      <h1>Edit!</h1>
      <Formik
        initialValues={{
          name: blip.name,
          description: blip.description,
          quadrant: blip.quadrant,
          ring: blip.ring
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
            value={blip.name} onChange={handleChange}
          />
          <MyTextInput
            label="Description"
            name="description"
            type="text"
            placeholder="Some description text"
            value={blip.description} onChange={handleChange}
          />
          <MySelect label="Quadrant Type" name="quadrant" value={blip.quadrant} onChange={handleChange}>
            <option value="">Select a quadrant type</option>
            <option value="Programming Languages and Frameworks">Programming Languages and Frameworks</option>
            <option value="Tools">Tools</option>
            <option value="Platforms">Platforms</option>
            <option value="Techniques">Techniques</option>
          </MySelect>
          <MySelect label="Ring Type" name="ring" value={blip.ring} onChange={handleChange}>
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

function EditForm() {
  return <EditF />;
}


export default EditForm
