import React from 'react'   
import Layout from '../components/layouts/layout'

function Pagenotfound() {
  return (
    <Layout>
      <div className="alert alert-danger alert-dismissible fade show text-center page-not-found" role="alert"><strong>404</strong>
      <br/> OOPS!!Page Not Found!!
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    </Layout>
  )
}

export default Pagenotfound
