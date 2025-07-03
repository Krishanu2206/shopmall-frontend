import React, { useState, useEffect } from 'react'
import Layout from '../../components/layouts/layout'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import "../../styles/Authstyles.css"

function Forgotpassword() {

  const navigate = useNavigate();

    const [email, setemail] = useState("");
    const [newpassword, setnewpassword] = useState("");
    const [answer, setanswer] = useState("");

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
        answer:answer,
        newpassword:newpassword,
      }
      const response = await fetch(`/api/v1/auth/forgot-password`, {
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
        navigate('/login');
      }else{
        toast.error(result.message);
      }
    }catch(err){
      console.log(err);
      toast.error("Something went wrong")
    }
  }


  return (
    <Layout title="Forgot Password">
        <div className="register-container">
      <div className="register-card">
        <h3 className="register-heading">RESET PASSWORD</h3>

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
            <label htmlFor="exampleInputAnswer" className="form-label register-form-label">Answer</label>
            <input type="text" 
            value={answer}
            className="form-control register-form-control" id="exampleInputAnswer1"
            placeholder='The random text you gave during registering'
            onChange={(e)=>setanswer(e.target.value)} required />
            <div className="invalid-feedback">
              Please enter your answer
            </div>
        </div>
        <div className="mb-3 register-form-group">
            <label htmlFor="exampleInputPassword" className="form-label register-form-label">New Password</label>
            <input type="password" 
            value={newpassword} className="form-control register-form-control" id="exampleInputPassword1" 
            placeholder='Enter Password'
            minLength={6} maxLength={64}
            onChange={(e)=>setnewpassword(e.target.value)} required/>
            <div className="invalid-feedback">
              Please enter a new Password atleast 6 characters long
            </div>
        </div>
        <button type="submit" className="btn btn-primary register-btn">Reset Password</button>
        </form>

      </div>
      </div>
    </Layout>
  )
}

export default Forgotpassword
