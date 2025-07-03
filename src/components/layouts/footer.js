import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="footer">
      <h4 className="text-center">
        All Rights Reserved &copy; Assailant
      </h4>
      <p className="text-center mt-3">
        <Link to="/about">About</Link>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <Link to="/contact">Contact</Link>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <Link to="/policy">Privacy Policy</Link>
      </p>
    </div>
  )
}

export default Footer
