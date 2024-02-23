import React from 'react';
import { Helmet } from 'react-helmet';
import Footer from '../components/Footer/commonFooter';
import '../styles/App.css';

function Help() {


  // TODO: Add ticket support form
  // ? Think of php script and ticket handler
  // ! Secured support


  return (
    <main className="help-main">
      <Helmet>
        <title>Get Help</title>
      </Helmet>
      
      <div className="help-hero">
        <img src='https://freefrontend.com/assets/img/css-hero-effects/Diagonal-Hero-Div-With-CSS-Star-Animation-Background.gif' className='help-hero'/>
        

      </div>

      <Footer />
    </main>
  );
}

export default Help;
