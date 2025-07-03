import React, {useState, useEffect} from 'react'
import Adminmenu from '../../components/layouts/Adminmenu'
import Layout from '../../components/layouts/layout'
import toast from 'react-hot-toast';
import Categoryform from '../../components/Forms/Categoryform';
import { Modal } from 'antd';
import slugify from 'slugify';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';

function CreateCategory() {

  const navigate = useNavigate();

  const [auth, setauth] = useAuth();

  const [categories, setcategories] = useState([]);
  const [isvisible, setisvisible] = useState(false);
  const [editcategory, seteditcategory] = useState({
    id : "",
    name : "",
    slug : ""
  });

  //get all categories
  const getallcategories = async()=>{
    try {
      const response = await fetch(`/api/v1/category/get-category`, {
        method:'GET',
        headers:{
          'Content-Type' : 'application/json',
        },
      });
      const result = await response.json();
      console.log(result);
      if(result.success === true){
        setcategories(result.categories);
      }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  //edit a category
  const handleeditformsubmit=async(e)=>{
    e.preventDefault();
    try {
        console.log(editcategory.name);
        const requestbody = {name : editcategory.name};
        const id = editcategory.id;
        const res = await fetch(`/api/v1/category/update-category/${id}`, {
            method : "PUT",
            headers:{
                'Content-Type' : "application/json",
                "Authorization" : auth?.token
            },
            body : JSON.stringify(requestbody)
        })
        const result=await res.json();
        if(result?.success === true){
            toast.success(`Category ${result.category.name} updated successfully`);
            console.log(result.category);
            navigate("/dashboard/admin/create-category");
            setisvisible(false);
            seteditcategory({
              id:"", name:"", slug:""
            })
            getallcategories()
        }else{
            toast.error(result.message);
        }
    } catch (error) {
        console.log(error);
        toast.error('Something went wrong');
    }
  }

  //delete a category
  const handledelete = async(e, category)=>{
    e.preventDefault()
    try {
      const id = category._id;
      const res = await fetch(`/api/v1/category/delete-category/${id}`, {
            method : "DELETE",
            headers:{
                'Content-Type' : "application/json",
                "Authorization" : auth?.token
            },
        })
        const result=await res.json();
        if(result?.success === true){
            toast.success(`Category ${result.category.name} deleted successfully`);
            console.log(result.category);
            getallcategories();
            navigate("/dashboard/admin/create-category");
        }else{
            toast.error(result.message);
        }
    } catch (error) {
        console.log(error);
        toast.error('Something went wrong');
    }
  }

  useEffect(()=>{
    getallcategories();

  }, []);

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

  return (
    <Layout title={"Create-Category"}>
    <div className="container-fluid mt-3 p-3">
    <div className='row'>
        <div className='col-md-3'>
        <Adminmenu/>
        </div>
        <div className='col-md-9'>
        <h2>Manage Category</h2>

        <Categoryform/>

        <div className='w=75 mt-3'>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>

              {categories?.map((category, index)=>{
                return(
                  <tr>
                  <td key={index}>{category.name}</td>
                  <td><button className='btn btn-primary ms-2' onClick={()=>{setisvisible(true);seteditcategory({...editcategory, id:category._id, name:category.name, slug:category.slug})}}>Edit</button>
                  <button className='btn btn-danger ms-2' onClick={(e)=>handledelete(e, category)}>Delete</button>
                  </td>
                  </tr>
                )
              })}
                
            </tbody>
          </table>

        </div>

        <Modal open={isvisible} onCancel={()=>{setisvisible(false)}} footer={null}>
          
        <div className="register-card">

        <form className='register-form needs-validation' noValidate onSubmit={handleeditformsubmit}>
            <label htmlFor="exampleInputName" className="form-label register-form-label">Category Name</label>
            <input type="text" 
            value={editcategory.name}
            className="form-control register-form-control" id="exampleInputName1" 
            placeholder='Enter new Category Name'
            onChange={(e)=>seteditcategory({...editcategory, name:e.target.value})} required/>
            <div className="invalid-feedback">
              Please enter Category Name
            </div>

            <label htmlFor="exampleInputEmail" className="form-label register-form-label">Slug</label>
            <input type="text" 
            value={slugify(editcategory.name)}
            className="form-control register-form-control" id="exampleInputEmail1"
            placeholder='Enter Slug'
            onChange={(e)=>seteditcategory({...editcategory, slug:e.target.value})} required />
            <div className="invalid-feedback">
              Please enter corresponding Slug
            </div>

            <button type="submit" className="btn btn-primary register-btn">Edit</button>
        
        </form>

        </div>

        </Modal>

        </div>
    </div>
    </div>
    </Layout>
  )
}

export default CreateCategory
