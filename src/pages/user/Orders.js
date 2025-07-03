import React from 'react'
import Layout from '../../components/layouts/layout'
import Usermenu from '../../components/layouts/Usermenu'

function Orders() {
  return (
    <Layout title={"Orders-shopmall"}>
    <div className="container-fluid mt-3 p-3">
    <div className='row'>
        <div className='col-md-3'>
        <Usermenu/>
        </div>
        <div className='col-md-9'>
        <h2>Your Orders</h2>
        </div>
    </div>
    </div>
    </Layout>
  )
}

export default Orders
