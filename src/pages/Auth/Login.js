import React, { useState, useEffect } from 'react'
import Layout from '../../components/layouts/layout'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom';
import "../../styles/Authstyles.css"
import { useAuth } from '../../context/auth';

function Login() {

  const navigate = useNavigate();
  const location = useLocation();

    const [auth, setauth] = useAuth();

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

  useEffect(() => {
  'use strict'
  const forms = document.querySelectorAll('.needs-validation')
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
  }, []);

  //form submission function'
  const handleformsubmit=async(e)=>{
    e.preventDefault();
    try{
      const requestbody={
        email:email,
        password:password
      }
      const response = await fetch(`/api/v1/auth/login`, {
        method:'POST',
        headers:{
          'Content-Type' : 'application/json',
        },
        body:JSON.stringify(requestbody)
      });
      const result = await response.json();
      console.log(result);
      if(result.success === true){
        toast.success(result.message);
        setauth({
            user:result.user,
            token:result.token
        });
        localStorage.setItem('auth', JSON.stringify(result));
        navigate(location.state || '/');
      }else{
        toast.error(result.message);
      }
    }catch(err){
      console.log(err);
      toast.error("Something went wrong")
    }
  }


  return (
    <Layout title="Login">
      <div className="register-container">
      <div className="register-card">
        <h3 className="register-heading">Login Form</h3>

        <form className='register-form needs-validation' noValidate onSubmit={handleformsubmit}>
        <div className="mb-3 register-form-group">
            <label htmlFor="exampleInputEmail" className="form-label register-form-label">Email</label>
            <input type="email" 
            value={email}
            className="form-control register-form-control" id="exampleInputEmail1"
            placeholder='Enter Email'
            onChange={(e)=>setemail(e.target.value)} required />
            <div className="invalid-feedback">
              Please enter Email
            </div>
        </div>
        <div className="mb-3 register-form-group">
            <label htmlFor="exampleInputPassword" className="form-label register-form-label">Password</label>
            <input type="password" 
            value={password} className="form-control register-form-control" id="exampleInputPassword1" 
            placeholder='Enter Password'
            onChange={(e)=>setpassword(e.target.value)} required/>
            <div className="invalid-feedback">
              Please enter Password atleast 6 characters long
            </div>
        </div>
        <button type="button" className="btn btn-primary register-btn" onClick={()=>{navigate('/forgot-password')}}>Forgot Password</button>
        <br/><br/>
        <button type="submit" className="btn btn-primary register-btn">Login</button>
        </form>

      </div>
      </div>
    </Layout>
  )
}

export default Login
