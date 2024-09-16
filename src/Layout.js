import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
function Layout({ children }) {
  
    return (
      <div>
        { <Navbar />}
        {children}
        {<Footer/>}
        {<CookieBanner/>}
      </div>
    );
  }
  
  export default Layout;