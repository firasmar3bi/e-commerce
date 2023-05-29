import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
export default function Register() {

    let [ errorInput , setErrorData ] = useState(``);
    let [ statesError , setStatesError ] = useState('');
    const navigate = useNavigate();
    
    const schema = yup.object ({
      userName : yup.string().required('The name is required').min(3,'Min number of charecter is 3').max(20,'Max number of charecter is 20'),
      email : yup.string().required('The email is required').email(),
      password : yup.string().required('The password is required'),
      cPassword : yup.string().required('Comform the password').oneOf([yup.ref('password')]),
    })
    
    let formik = useFormik({
        initialValues:{
            email:'',
            userName:'',
            password:'',
            cPassword:''
        },validationSchema:schema,
        onSubmit:sendDataRegister,
    })

    async function sendDataRegister(value) {
        let {data} = await axios.post('https://precious-bass-tights.cyclic.app/auth/signup',value).catch(
            (err)=>{
                setStatesError(`* ${err.response.data.messgae}`);
            });
        // console.log(data);
        if (data.message == 'Done'){
          console.log('welcome');
          setErrorData([]);
          setStatesError('');
          navigate('/Login');
        }else {
            // setErrorData(data.err[0]);
            let Err = (data.err[0]);
            setErrorData(`* ${Err[0].message}`);
        }
    }

    return (
    <div className="w-75 m-auto">
      <h2>Register Now</h2>
      <span className="text-danger ms-3">{errorInput}</span>      
                    
      <form className="row g-3" onSubmit={formik.handleSubmit}>
        <div className="col-md-12">
          <label htmlFor="inputName" className="form-label">
            Name
          </label>
          <input 
          type="text"
          name="userName" 
          className="form-control" 
          id="inputName"
          value={formik.values.name}
          onChange={formik.handleChange} />
          {formik.errors.name? <p className="text-danger">* {formik.errors.name}</p>:''}
        </div>
        <div className="col-md-12">
          <label htmlFor="inputEmail" className="form-label">
            Email 
            <span className="text-danger ms-3">{statesError}</span>
          </label>
          <input 
          type="email" 
          name="email"
          className="form-control" 
          id="inputEmail"
          value={formik.values.email}
          onChange={formik.handleChange}  />
          {formik.errors.email? <p className="text-danger">* {formik.errors.email}</p>:''}
        </div>
        <div className="col-md-12">
          <label htmlFor="inputPassword4" className="form-label">
            Password
          </label>
          <input 
          type="password" 
          name="password"
          className="form-control" 
          id="inputPassword4"
          value={formik.values.password}
          onChange={formik.handleChange}  />
          {formik.errors.password? <p className="text-danger">* {formik.errors.password}</p>:''}
        </div>
        <div className="col-md-12">
          <label htmlFor="inputCPassword4" className="form-label">
            Conferm Password
          </label>
          <input 
          type="password"
          name="cPassword"
          className="form-control" 
          id="inputCPassword4"
          value={formik.values.cPassword}
          onChange={formik.handleChange}  />
        {formik.errors.cPassword? <p className="text-danger">* {formik.errors.cPassword}</p>:''}
        </div>
        <div className="col-md-3">
            <button type="submit" className="btn btn-info"> Register</button>
        </div>
      </form>
    </div>
  );
}
