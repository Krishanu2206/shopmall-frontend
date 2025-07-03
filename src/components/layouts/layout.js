import React from 'react'
import Footer from './footer'
import Header from './header'
import {Helmet} from "react-helmet";
import { Toaster } from 'react-hot-toast';

function Layout({children, title, description, keywords, author}) {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description}/>
        <meta name="keywords" content={keywords}/>
        <meta name="author" content={author}/>
        <title>{title}</title>
      </Helmet>
      <Header/> 
      <main className="bg-light" style={{minHeight:"75vh"}}>
        <Toaster/>
        {children}</main>
      <Footer/>
    </div>
  )
};

Layout.defaultProps = {
  title : "ASSAILANT SHOPMALL",
  description : "YOUR ONE-STOP DESTINATION FOR SHOPPING",
  keywords : "VARIETY OF PRODUCTS IN AFFORDABLE PRICE",
  author:"ASSAILANT"
}

export default Layout
