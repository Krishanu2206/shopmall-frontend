import React, {useEffect, useState} from 'react'
import slugify from 'slugify'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/auth'
import { useNavigate } from 'react-router-dom'

function Categoryform() {

    const navigate = useNavigate();

    const [auth, setauth] = useAuth();
    const [name, setname] = useState("");
    const [slug, setslug] = useState("");
  
  useEffect(()=>{
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
  }, [])

  const handleformsubmit = async(e)=>{
    e.preventDefault();
    try {
        console.log(name);
        const requestbody = {name : name};
        const res = await fetch(`/api/v1/category/create-category`, {
            method : "POST",
            headers:{
                'Content-Type' : "application/json",
                "Authorization" : auth?.token
            },
            body : JSON.stringify(requestbody)
        })
        const result=await res.json();
        if(result?.success === true){
            toast.success(`Category ${result.category.name} added successfully!`);
            console.log(result.category);
            navigate("/dashboard/admin")
            setname(" ");
        }else{
            toast.error(result.message);
        }
    } catch (error) {
        console.log(error);
        toast.error('Something went wrong');
    }
  }


  return (
      <div className="register-card">

        <form className='register-form needs-validation' noValidate onSubmit={handleformsubmit}>
            <label htmlFor="exampleInputName" className="form-label register-form-label">Category Name</label>
            <input type="text" 
            value={name}
            className="form-control register-form-control" id="exampleInputName1" 
            placeholder='Enter new Category Name'
            onChange={(e)=>setname(e.target.value)} required/>
            <div className="invalid-feedback">
              Please enter Category Name
            </div>

            <label htmlFor="exampleInputEmail" className="form-label register-form-label">Slug</label>
            <input type="text" 
            value={slugify(name)}
            className="form-control register-form-control" id="exampleInputEmail1"
            placeholder='Enter Slug'
            onChange={(e)=>setslug(e.target.value)} required />
            <div className="invalid-feedback">
              Please enter corresponding Slug
            </div>

        <button type="submit" className="btn btn-primary register-btn">Add</button>
        
        </form>

      </div>
  )
}

export default Categoryform
