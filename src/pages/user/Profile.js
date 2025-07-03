import React from 'react'
import Layout from '../../components/layouts/layout'
import Usermenu from '../../components/layouts/Usermenu'
import { useAuth } from '../../context/auth'

function Profile() {

    const [auth, setauth] = useAuth()

  return (
    <Layout title={"Your Profile-shopmall"}>
    <div className="container-fluid mt-3 p-3">
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

export default Profile
