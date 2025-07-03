import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Layout from '../components/layouts/layout';
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';


function Productdetails() {
  
  const navigate = useNavigate();
  const slugparams= useParams();
  const [id, setid] = useState("");
  const [photo, setphoto] = useState("");
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [shipping, setshipping] = useState(true);
  const [quantity, setquantity] = useState("");
  const [category, setcategory] = useState({});
  const [products, setproducts] = useState([]);

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
        setcategory(result.product.category);
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

  //show similar products
  const showsimilarproducts = async()=>{
    try {
        const response = await fetch(`/api/v1/product/related-product/${id}/${category?._id}`, {
            method:"GET",
            headers:{
                'Content-Type' : "application/json",
            }
        })
        const result = await response.json();
        console.log(result);
        if(result?.success === true){
            setproducts(result.products);
            toast.success(result.message);
        }else{
            toast.error("No similar products found");
        }
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(()=>{
    getsingleproduct();
    //eslint-disable-next-line
  }, []);

  useEffect(()=>{
    showsimilarproducts();
  }, [category, id])

  return (
    <Layout>
      <div className='row mt-3'>
        <div className='col-md-6 text-center d-flex align-items-center justify-content-center'>
            <img src={`/api/v1/product/product-photo/${id}`}        className="card-img-top" style={{height:"17rem", width:"17rem"}} alt={name} />
        </div>
        <div className='col-md-5 text-center'>
            <h1>Product Details</h1>
            <h5>Name : {name}</h5>
            <h5>Description : {description}</h5>
            <h5>Price : {price}</h5>
            <h5>Category : {category.name}</h5>
            <h5>Quantity : {quantity}</h5>
            <h5>Shipping : {shipping}</h5>
            <button className="btn btn-secondary">Add to Cart</button>
        </div>
      </div>
      <br/>
      <div className='row'>
        <h3 className='text-center'>Similar Products</h3>
        <div className='d-flex flex-wrap justify-content-center'>
            {products.map((product, index)=>(

                <div className="card m-2" style={{width: '18rem', textDecoration:'none', color:'black'}} key={index}>
                <img src={`/api/v1/product/product-photo/${product._id}`}        className="card-img-top" style={{height:"15rem"}} alt={product.name} />
                <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text"><strong>${product.price}</strong></p>
                <button className="btn btn-primary"  onClick={()=>{navigate(`/product/${product.slug}`); window.location.reload()}}>
                More Details</button>
                &nbsp;&nbsp;
                <button className="btn btn-secondary">Add to Cart</button>
                </div>
                </div>

            ))}
        </div>
      </div>
    </Layout>
  )
}

export default Productdetails
