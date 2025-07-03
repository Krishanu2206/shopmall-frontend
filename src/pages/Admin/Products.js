import React, {useState, useEffect} from 'react'
import Adminmenu from '../../components/layouts/Adminmenu'
import Layout from '../../components/layouts/layout'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

function Products() {

  const [products, setproducts] = useState([]);


  //get all products
  const getallproducts = async()=>{
    try {
        const response = await fetch(`/api/v1/product/get-product`, {
        method:'GET',
        headers:{
          'Content-Type' : 'application/json',
        },
      });
      const result = await response.json();
      console.log(result);
      if(result?.success === true){
        setproducts(result.products);
      }
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
    }
  }

  useEffect(()=>{
    getallproducts();

  }, []);

  
  return (
    <Layout>
    <div className="container-fluid mt-3 p-3">
      <div className='row'>
        <div className='col-md-3'>
            <Adminmenu/>
        </div>
        <div className='col-md-9'>
            <h2 className='text-center'>All Products List</h2>

            <div className='d-flex' style={{flexWrap:"wrap", justifyContent:"center"}}>
            {products.map((product, index)=>(

              <Link to={`/dashboard/admin/${product.slug}`} className='product-link'>
                <div className="card m-2" style={{width: '18rem', textDecoration:'none', color:'black'}} key={index}>
                <img src={`/api/v1/product/product-photo/${product._id}`}        className="card-img-top" style={{height:"15rem"}} alt={product.name} />
                <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">${product.price}</p>
                </div>
                </div>
              </Link>

            ))}

            </div>

        </div>
      </div>
    </div>
    </Layout>
  )
}

export default Products
