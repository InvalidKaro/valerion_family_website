import React from 'react';
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
    <main className="help-main">
      <Helmet>
        <title>Get Help</title>
      </Helmet>
      <div className='help'>
      <div className = "help-text">
        <div className = "help-image">
          <img src = {helpBack} alt = "Freedom Blog" className='help-image'/>
        </div>
          <div className='text-on-image'>
          <div id="square" class="fadeInUp animated">  

             <h1 className='help-h1' > Help Center </h1>
             </div>
          </div>
      </div>
      </div>
      <div id="square" class="fadeInUp animated">  

      <HelpCategories />
      </div>

      <Footer />
    </main>
  );
}

export default Help;
