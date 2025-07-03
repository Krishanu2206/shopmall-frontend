import React from 'react'
import Layout from '../../components/layouts/layout'
import { useAuth } from '../../context/auth';
import Usermenu from '../../components/layouts/Usermenu';

function Dashboard() {

  const [auth, setauth] = useAuth();

  return (
    <Layout title={"Dashboard"}>
        <div className="container-fluid m-3 p-3">
          <div className='row'>
            <div className='col-md-3'>
              <Usermenu/>
            </div>
            <div className='col-md-9'>
              <div className='card w-75 p-3'>
                <h4>Name : {auth?.user?.name}</h4>
                <h4>Email : {auth?.user?.email}</h4>
                <h4>Phone : {auth?.user?.phone}</h4>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Dashboard
