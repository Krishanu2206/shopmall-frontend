import React, {useState, useEffect} from 'react'
import Layout from '../../components/layouts/layout'
import Adminmenu from '../../components/layouts/Adminmenu'
import toast from 'react-hot-toast';
import { Select } from "antd";
import { useAuth } from '../../context/auth';
import { useNavigate, useParams } from 'react-router-dom';

function Updateproduct() {

  const[auth, setauth] = useAuth();
  const slugparams= useParams();
  const navigate = useNavigate();
  const [id, setid] = useState("");
  const [categories, setcategories] = useState([]);
  const [photo, setphoto] = useState("");
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [shipping, setshipping] = useState(true);
  const [quantity, setquantity] = useState("");
  const [category, setcategory] = useState("");


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
      if(result?.success === true){
        setcategories(result.categories);
      } else {
        toast.error(result?.message);
      }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  //update a product
  const handleupdateform=async(e)=>{
    e.preventDefault();
    try {
      if(!category){
        toast.error("Enter a valid category")
      }
      const formdata = new FormData();
      formdata.append('name', name); //the name in quotation is the name which will be present in res.fields or req.files so that should match
      formdata.append('description', description);
      formdata.append('price', price);
      formdata.append('quantity', quantity);
      formdata.append('category', category);
      if (photo){
        formdata.append('photo', photo);
      }
      formdata.append('shipping',shipping);

      const response = await fetch(`/api/v1/product/update-product/${id}`, {
        method:'PUT',
        headers:{
          "Authorization" : auth?.token
        },
        body:formdata
      });
      const result = await response.json();
      console.log(result);
      if(result?.success === true){
        toast.success(`Product '${result.product.name} updated successfully`);
        setTimeout(()=>{navigate('/dashboard/admin/products')}, 2000);
      }else{
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!")
    }
  }

  //delete a product
  const handledeleteproduct = async()=>{
    try {
      let answer = prompt("Are you sure you want to delete this product? (Y/N)");
      while(!answer || (answer!=='Y' && answer!=='N')){
        answer = prompt("Are you sure you want to delete this product? (Y/N)")
      }
      if(answer==='N' || !answer) return;  
      const res = await fetch(`/api/v1/product/delete-product/${id}`, {
            method : "DELETE",
            headers:{
                "Authorization" : auth?.token
            },
        })
        const result=await res.json();
        if(result?.success === true){
            toast.success(`Product ${result.product.name} deleted successfully`);
            setTimeout(()=>{navigate('/dashboard/admin/products')}, 2000);
        }else{
            toast.error(result.message);
        }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  }

  //get single product
  const getsingleproduct = async()=>{
    try {
        console.log(slugparams.slug);
        const response = await fetch(`/api/v1/product/get-product/${slugparams.slug}`, {
        method:'GET',
        headers:{
          'Content-Type' : "application/json"
        }
      });
      const result = await response.json();
      console.log(result);
      if(result?.success === true){
        console.log(result.product.category)
        setid(result.product._id)
        setname(result.product.name);
        setcategory(result.product.category._id);
        setdescription(result.product.description);
        setprice(result.product.price);
        setquantity(result.product.quantity);
        setshipping(result.product.shipping);
        console.log(id);
      }
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong")
    }
  }

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

  useEffect(()=>{
    getsingleproduct();
    // eslint-disable-next-line
  }, []);

  useEffect(()=>{
    getallcategories();
  }, []);

  return (
    <Layout title={"Create-Product"}>
    <div className="container-fluid mt-3 p-3">
    <div className='row'>
        <div className='col-md-3'>
        <Adminmenu/>
        </div>
        <div className='col-md-9'>
        <h2>Update Product</h2>

        <div className='m-1 w-75'>

        <form className='needs-validation' noValidate encType='multipart/form-data' onSubmit={handleupdateform}>

        <div className='mb-3'>
        <label htmlFor='Select category' className='form-label'>
          <b>Select a category</b>
        </label>
        <Select
          bordered={true}
          showSearch
          placeholder="Select a category"
          size='large'
          className='form-select mb-3 form-control'
          optionFilterProp="label"
          value={category}
          onChange={(value)=>setcategory(value)}
          options={categories.map((category, index)=>(
            {
              value:category._id,
              label:category.name
            }
          ))}
        required>
          {/* {categories.map((category, index)=>(
            <Select.Option key={index} value={category.name}>
            {category.name}
          </Select.Option>
          ))} */}
          
        </Select>
        <div className="invalid-feedback">
          Please select Product Category
        </div>
        </div>

        <div className='mb-3'>
          <label htmlFor='Upload images' className='btn btn-outline-secondary col-md-12 form-label'>
          <input type='file' name='photo' accept='image/*' onChange={(e)=>setphoto(e.target.files[0])}/>
          </label>
        </div>

        <div className='mb-3'>
          {photo? (
            <div className='text-center'>
              <img src={URL.createObjectURL(photo)}
               alt="Uploaded" height={"150px"} width={"150px"} className='img img-responsive'/>
            </div>
          ) : (
            <div className='mb-3'>
            <label htmlFor='Select category' className='form-label'>
              <b>Product image</b>
            </label>&nbsp;&nbsp;&nbsp;&nbsp;
            <img src={`/api/v1/product/product-photo/${id}`} alt={name} height={"200px"} width={"200px"} className='img img-responsive' />
            </div>
          )}
        </div>

        <div className='mb-3'>
          <label htmlFor="exampleInputName" className="form-label register-form-label">Product Name</label>
          <input type="text" 
          value={name}
          className="form-control register-form-control" id="exampleInputName1" 
          placeholder='Enter new Product Name'
          onChange={(e)=>setname(e.target.value)} required/>
          <div className="invalid-feedback">
            Please enter Product Name
          </div>
        </div>

        <div className='mb-3'>
          <label htmlFor="exampleInputName" className="form-label register-form-label">Product Description</label>
          <textarea type="text" 
          value={description}
          className="form-control register-form-control" id="exampleInputName1" 
          placeholder='Enter Product Description'
          onChange={(e)=>setdescription(e.target.value)} required/>
          <div className="invalid-feedback">
            Please enter Product Description
          </div>
        </div>

        <div className='mb-3'>
          <label htmlFor="exampleInputName" className="form-label register-form-label">Product Price</label>
          <input type="Number" 
          value={price}
          className="form-control register-form-control" id="exampleInputName1" 
          placeholder='Enter Product Price'
          onChange={(e)=>setprice(e.target.value)} required/>
          <div className="invalid-feedback">
            Please enter Product Price
          </div>
        </div>

        <div className='mb-3'>
          <label htmlFor="exampleInputName" className="form-label register-form-label">Product Quantity</label>
          <input type="Number" 
          value={quantity}
          className="form-control register-form-control" id="exampleInputName1" 
          placeholder='Enter Product Quantity'
          onChange={(e)=>setquantity(e.target.value)} required/>
          <div className="invalid-feedback">
            Please enter Product Quantity
          </div>
        </div>

        <div className='mb-3'>
          <label htmlFor="exampleInputName" className="form-label register-form-label">Product Shipping</label>
          <select type="text" 
          value={shipping}
          className="form-control register-form-control" id="exampleInputName1" 
          placeholder='Enter Product Shipping'
          onChange={(e)=>setshipping(e.target.value)} required>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
          </select>
          <div className="invalid-feedback">
            Please enter true or false
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Update Product</button>
        &nbsp; &nbsp; &nbsp;
        <button type="submit" className="btn btn-danger" onClick={handledeleteproduct}>Delete Product</button>

        </form>

        </div>

        </div>
    </div>
    </div>
    </Layout>
  )
}

export default Updateproduct
