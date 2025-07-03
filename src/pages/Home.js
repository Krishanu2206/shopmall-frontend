import React, {useState, useEffect} from 'react'
import Layout from '../components/layouts/layout'
import toast from 'react-hot-toast';
import { Checkbox, Radio} from "antd";
import { Prices } from '../components/Prices';
import { NavLink } from 'react-router-dom';

function Home() {
  const [products, setproducts] = useState([]);
  const [categories, setcategories] = useState([]);
  const [checked, setchecked] = useState([]);
  const [radio, setradio] = useState([]);
  const [total, settotal] = useState(0);
  const [page, setpage] = useState(1);
  const [loading, setloading] = useState(false);
  const [totalproductsdisplayed, settotalproductsdisplayed] = useState(0);
  const [direction, setdirection] = useState("next");

  //get total count
  const gettotalproducts = async()=>{
    try {
      const res = await fetch(`/api/v1/product/product-count`, {
        method:"GET",
        headers:{
          'Content-Type' : "application/json",
        },
      });
      const result = await res.json();
      if(result?.success === true){
      settotal(result.total);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }
  }

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

  //get products per page
  const getproductsperpage = async()=>{
    try {
        setloading(true);
        const response = await fetch(`/api/v1/product/product-list/${page}`, {
        method:'GET',
        headers:{
          'Content-Type' : 'application/json',
        },
      });
      const result = await response.json();
      console.log(result);
      if(result?.success === true){
        setloading(false);
        setproducts(result.products);
        if(page === 1){
          settotalproductsdisplayed(result.products.length)
        }else{
        let prev = totalproductsdisplayed;
        if(direction === "next")
        settotalproductsdisplayed(prev + result.products.length);
        if(direction === "prev")
        settotalproductsdisplayed(prev - result.products.length);
        }

      }else{
        toast.error(result?.message)
        setloading(false);
      }
    } catch (error) {
        console.log(error);
        setloading(false);
        toast.error("Something went wrong");
    }
  }

  //filter catgeories
  const handlefilter = async(value, id)=>{
    try {
      let all = [...checked];
      if(value){
        all.push(id);
      }else{
        all = all.filter(category => category!==id)
      }
      setchecked(all);

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!")
    }
  }

  useEffect(()=>{
    getallcategories();
    gettotalproducts();
  }, [])

  useEffect(()=>{
    if(!checked.length && !radio.length)
    getproductsperpage();
  }, [checked.length, radio.length, page]);

  //get the filter products
  const filteredproducts=async()=>{
    try {
      const requestbody = {
        checked : checked,
        radio : radio
      };
      const res = await fetch(`/api/v1/product/product-filters`, {
            method : "POST",
            headers:{
              'Content-Type':"application/json",
            },
            body : JSON.stringify(requestbody)
        })
      const result=await res.json();
      console.log(result);
      if(result?.success === true){
        toast.success(result.message);
        setproducts(result.products);
      }else{
        toast.error(result?.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!")
    }
  }

  return (
    <Layout title={"All products"}>
    <div className="container-fluid mt-3 p-3">
      <div className='row'>
        <div className='col-md-3'>
          <h4 className='text-center'>Filter By Category</h4>
          <div className='d-flex flex-column'>
          {categories.map((category, index)=>(
            <Checkbox key={index} onChange={(e)=>handlefilter(e.target.checked, category._id)}>
              {category.name}
            </Checkbox>
          ))}
          </div>
          <h4 className='text-center mt-2'>Filter By Price</h4>
          <div className='d-flex flex-column'>
          <Radio.Group onChange={(e)=>setradio(e.target.value)}>
            {Prices.map((price, index)=>(
              <Radio value={price.array} key={index}>{price.name}</Radio>
            ))}
          </Radio.Group>
          </div>
          <button className='btn btn-primary mt-2' onClick={filteredproducts}>Filter Products</button>&nbsp;
          <button className='btn btn-danger mt-2' onClick={()=>window.location.reload()}>Clear Filters</button>
        </div>
        <div className='col-md-9'>
          <h2 className='text-center'>All Products</h2>
          <div className='d-flex flex-wrap justify-content-center'>
            {products.map((product, index)=>(

                <div className="card m-2" style={{width: '18rem', textDecoration:'none', color:'black'}} key={index}>
                <img src={`/api/v1/product/product-photo/${product._id}`}        className="card-img-top" style={{height:"15rem"}} alt={product.name} />
                <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text"><strong>${product.price}</strong></p>
                <NavLink className="btn btn-primary" to={`/product/${product.slug}`}>
                More Details</NavLink>
                &nbsp;&nbsp;
                <button className="btn btn-secondary">Add to Cart</button>
                </div>
                </div>

            ))}
          </div>
          <div className='m-2 p-2 text-center'>
            {products && page>1 && (
              <button className='btn btn-warning' onClick={(e)=>{
                e.preventDefault();
                setdirection("prev");
                setpage(page-1);
                
              }}>
                {loading ? "Loading" : "Show Previous"}
              </button>
            )}
            {products && totalproductsdisplayed < total && (
              <button className='btn btn-warning' onClick={(e)=>{
                e.preventDefault();
                setdirection("next");
                setpage(page+1);
                
              }}>
                {loading ? "Loading" : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
    </Layout>
  )
}

export default Home
