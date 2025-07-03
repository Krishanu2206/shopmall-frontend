import React from 'react'
import Layout from '../../components/layouts/layout'
import Adminmenu from '../../components/layouts/Adminmenu'

function Users() {
  return (
    <Layout title={"All Users"}>
    <div className="container-fluid mt-3 p-3">
    <div className='row'>
        <div className='col-md-3'>
        <Adminmenu/>
        </div>
        <div className='col-md-9'>
        <h2>Users</h2>
        </div>
    </div>
    </div>
    </Layout>
  )
}

export default Users
