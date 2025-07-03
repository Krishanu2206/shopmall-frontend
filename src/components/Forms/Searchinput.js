import React from 'react'
import { useSearch } from '../../context/search'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Searchinput() {
    const navigate = useNavigate();
    const [search, setsearch] = useSearch();

    const handlesubmit = async(e)=>{
        e.preventDefault();
        try {
            const response = await fetch(`/api/v1/product/search/${search.keyword}`, {
            method:'GET',
            headers:{
            'Content-Type' : 'application/json',
            },
        });
        const result = await response.json();
        console.log(result);
        if(result?.success === true){
            setsearch({...search, results:result.products});
            navigate('/search');
        } else {
            toast.error(result?.message);
        }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        }
    }

  return (
    <div>
        <form className="d-flex" role="search" onSubmit={handlesubmit}>
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" 
        value={search.keyword}
        onChange={(e)=>setsearch({...search, keyword:e.target.value})}/>
        <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
    </div>
  )
}

export default Searchinput
