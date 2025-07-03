import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import Privateroute from './components/routes/Privateroute';
import Forgotpassword from './pages/Auth/Forgotpassword';
import Adminroute from './components/routes/Adminroute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Products from './pages/Admin/Products';
import Updateproduct from './pages/Admin/Updateproduct';
import Search from './pages/Search';
import Productdetails from './pages/Productdetails';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/product/:slug' element={<Productdetails/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/forgot-password' element={<Forgotpassword/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='/dashboard' element={<Privateroute/>} >
        <Route path="user" element={<Dashboard/>} />
        <Route path="user/orders" element={<Orders/>} />
        <Route path="user/profile" element={<Profile/>} />
      </Route>
      <Route path='/dashboard' element={<Adminroute />} >
        <Route path="admin" element={<AdminDashboard/>} />
        <Route path="admin/create-category" element={<CreateCategory/>} />
        <Route path="admin/create-product" element={<CreateProduct/>} />
        <Route path="admin/:slug" element={<Updateproduct/>} />
        <Route path='admin/products' element={<Products/>} />
        <Route path="admin/users" element={<Users/>} />
      </Route>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/policy' element={<Policy/>}/>
      <Route path='/*' element={<Pagenotfound/>}/>
    </Routes>
    </>
  );
}

export default App;
