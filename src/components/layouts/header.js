import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { GiShoppingBag } from "react-icons/gi";
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import Searchinput from '../Forms/Searchinput';

function Header() {
  const [auth, setauth] = useAuth();

  const handlelogout = ()=>{
    localStorage.removeItem('auth');
    setauth({
      ...auth, user:null, token:""
    });
    toast.success("Logged out Successfully!")
  }

  return (
    <>
      <nav className="navbar navbar-expand-md bg-body-tertiary sticky-top">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <Link to="/" className="navbar-brand" ><GiShoppingBag />Assailant Shopmall</Link>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <Searchinput/>
        <li className="nav-item">
          <NavLink to="/" className="nav-link">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/category" className="nav-link">Category</NavLink>
        </li>
        {
          !auth.user ? (<>
            <li className="nav-item">
            <NavLink to="/register" className="nav-link">Register</NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="/login" className="nav-link">Login</NavLink>
            </li></>
          ) : (<>

            <li className="nav-item dropdown">

              <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {auth?.user?.name}
              </NavLink>

              <ul className="dropdown-menu">
                <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin':'user'}`}className="dropdown-item">
                  Dashboard</NavLink></li>

                <li><NavLink onClick={handlelogout} to="/login" className="dropdown-item">Logout</NavLink></li>
              </ul>

            </li>

            </>
          )
        }
        <li className="nav-item">
          <NavLink to="/cart" className="nav-link">Cart(0)</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>

    </>
  )
}

export default Header
