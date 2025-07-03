import React from 'react'
import { useSearch } from '../context/search'
import Layout from '../components/layouts/layout';

function Search() {

  const [search, setsearch] = useSearch();

  return (
    <Layout title={'Search'}>
        <div className='container'>
            <div className='text-center'>
                <h2>Search Results</h2>
                <h5>{search?.results.length <1 ? "No Products found!" : `Found ${search?.results.length} products`}</h5>
                <div className='d-flex flex-wrap justify-content-center'>
                {search.results.map((product, index)=>(

                    <div className="card m-2" style={{width: '18rem', textDecoration:'none', color:'black'}} key={index}>
                    <img src={`/api/v1/product/product-photo/${product._id}`}        className="card-img-top" style={{height:"15rem"}} alt={product.name} />
                    <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text"><strong>${product.price}</strong></p>
                    <button className="btn btn-primary">More Details</button>
                    &nbsp;&nbsp;
                    <button className="btn btn-secondary">Add to Cart</button>
                    </div>
                    </div>

                ))}
            </div>
            </div>
        </div>
    </Layout>
  )
}

export default Search
