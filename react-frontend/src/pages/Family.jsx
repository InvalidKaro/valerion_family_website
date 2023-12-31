import React from 'react';
import '../styles/App.css';
import { Link } from "react-router-dom";


function Family() {
  return (
      <main>
        <Link to="/history">
          <h1>History</h1>
        </Link>
      </main>
    
  );
}

export default Family;
