import React from 'react'
import Layout from '../../components/layouts/layout';
import Adminmenu from '../../components/layouts/Adminmenu';
import { useAuth } from '../../context/auth';

function AdminDashboard() {
  const [auth, setauth] = useAuth();

  return (
    <Layout>
        <div className="container-fluid m-3 p-3">
          <div className='row'>
            <div className='col-md-3'>
              <Adminmenu/>
            </div>
            <div className='col-md-9'>
              <div className='card w-75 p-3'>
                <h4>Admin Name : {auth?.user?.name}</h4>
                <h4>Admin Email : {auth?.user?.email}</h4>
                <h4>Admin Phone : {auth?.user?.phone}</h4>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default AdminDashboard;