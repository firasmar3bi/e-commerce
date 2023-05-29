import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
export default function Login(props) {

    let [ errorInput , setErrorData ] = useState(``);
    let [ statesError , setStatesError ] = useState(``);
    const navigate = useNavigate();
    
    const schema = yup.object ({
      email : yup.string().required('The email is required').email(),
      password : yup.string().required('The password is required'),
    })
    
    let formik = useFormik({
        initialValues:{
            email:'',
            password:'',
        },validationSchema:schema,
        onSubmit:sendDataRegister,
    })

    async function sendDataRegister(value) {
        let {data} = await axios.post('https://precious-bass-tights.cyclic.app/auth/login',value).catch(
            (err)=>{
                console.log(err.response.data.message);
                setStatesError(`* ${err.response.data.messgae}`);
            });
        // console.log(data);
        if (data.message == 'Done'){
            console.log('welcome');
            setErrorData([]);
            setStatesError('');
            localStorage.setItem('userToken', data.access_token);
            props.getCurentUser()
          navigate('/Card');
        }else {
            // setErrorData(data.err[0]);
            let Err = (data.err[0]);
            setErrorData(`* ${Err[0].message}`);
        }
    }

    return (
    <div className="w-75 m-auto">
      <h2>Log-in Now</h2>
      <span className="text-danger ms-3">{errorInput}</span>      
                    
      <form className="row g-3" onSubmit={formik.handleSubmit}>
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
        <div className="col-md-3">
            <button type="submit" className="btn btn-info"> Register</button>
        </div>
      </form>
    </div>
  );
}
