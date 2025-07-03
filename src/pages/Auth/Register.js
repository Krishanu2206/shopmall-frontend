import React, { useState, useEffect } from 'react'
import Layout from '../../components/layouts/layout'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import "../../styles/Authstyles.css"

function Register() {

  const navigate = useNavigate();

    const [name, setname]=useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [phone, setphone]=useState("");
    const [address, setaddress]=useState("");
    const [answer, setanswer]=useState("");

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
        name:name,
        email:email,
        password:password,
        phone:phone,
        address:address,
        answer:answer
      }
      const response = await fetch(`/api/v1/auth/register`, {
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
    <Layout title="Register">
      <div className="register-container">
      <div className="register-card">
        <h3 className="register-heading">Register Form</h3>

        <form className='register-form needs-validation' noValidate onSubmit={handleformsubmit}>
        <div className="mb-3 register-form-group">
            <label htmlFor="exampleInputName" className="form-label register-form-label">Name</label>
            <input type="text" 
            value={name}
            className="form-control register-form-control" id="exampleInputName1" 
            placeholder='Enter Name'
            onChange={(e)=>setname(e.target.value)} required/>
            <div className="invalid-feedback">
              Please enter Name
            </div>
        </div>
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
            onChange={(e)=>setpassword(e.target.value)} minLength={6} maxLength={64} required/>
            <div className="invalid-feedback">
              Please enter Password atleast 6 characters long
            </div>
        </div>
        <div className="mb-3 register-form-group">
            <label htmlFor="exampleInputPhone" className="form-label register-form-label">Phone</label>
            <input type="tel" 
            minLength={10} maxLength={10}
            value={phone}
            className="form-control register-form-control" id="exampleInputPhone1"
            placeholder='Enter Phone'
            onChange={(e)=>setphone(e.target.value)} required />
            <div className="invalid-feedback">
              Please enter valid Phone Number
            </div>
        </div>
        <div className="mb-3 register-form-group">
            <label htmlFor="exampleInputAddress" className="form-label register-form-label">Address</label>
            <input type="text" 
            value={address}className="form-control register-form-control" id="exampleInputAddress1"
            placeholder='Enter Address' 
            onChange={(e)=>setaddress(e.target.value)} required />
            <div className="invalid-feedback">
              Please enter address
            </div>
        </div>
        <div className="mb-3 register-form-group">
            <label htmlFor="exampleInputAnswer" className="form-label register-form-label">Answer</label>
            <input type="text" 
            value={answer}
            className="form-control register-form-control" id="exampleInputAnswer1"
            placeholder='Any random text!(Required for Forgot Password)' 
            onChange={(e)=>setanswer(e.target.value)} required />
            <div className="invalid-feedback">
              Please enter some Answer
            </div>
        </div>
        <button type="submit" className="btn btn-primary register-btn">Register</button>
        </form>

      </div>
      </div>
    </Layout>
  )
}

export default Register
