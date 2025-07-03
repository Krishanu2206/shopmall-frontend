import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function Spinner({path='login'}) {
    const navigate= useNavigate();
    const location = useLocation();

    const [count, setcount]=useState(5);
    
    useEffect(()=>{
        const interval = setInterval(()=>{
            setcount((prev)=> --prev)
        }, 1000)
        if(count === 0){
            navigate(`/${path}`, {
                state: location.pathname
            });
        }
        return ()=> clearInterval(interval);
    }, [count, navigate, location, path])

  return (
<div className="d-flex flex-column justify-content-center align-items-center" style={{height:"100vh"}}>
    <h2 className='Text-center'>Redirecting to you in {count} seconds</h2>
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>

  )
}

export default Spinner
