import React from 'react';
import { Fade } from 'react-awesome-reveal';
import { Helmet } from 'react-helmet';
import Footer from '../components/Footer/commonFooter';
import HelpCategories from '../components/Help/categories';
import helpBack from "../images/help.png";
import '../styles/help.css';

function Help() {


  // TODO: Add ticket support form
  // ? Think of php script and ticket handler
  // ! Secured support


  return (
    <main className="help-main" style={{ width: "100%"}}>
      <Helmet>
        <title>Get Help</title>
      </Helmet>
      <div className='help'>
      <div className = "help-text">
        <div className = "help-image">
          <img src = {helpBack} alt = "Freedom Blog" className='help-image'/>
        </div>
          <div className='text-on-image'>

             <h1 className='help-h1' > Help Center </h1>
          </div>
      </div>
      </div>

      <HelpCategories />
<Fade style={{ width: "100%" }}>
      <Footer />
      </Fade>
    </main>
  );
}

export default Help;
