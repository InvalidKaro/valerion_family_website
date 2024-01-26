import React, { useState } from 'react';
import '../styles/App.css';
import { useUser } from '../UserContext';
import UploadArt from '../components/Art/uploadArt';
import productStyle from '../styles/product.module.css'
function Art() {
  const { user } = useUser();
  const [isUserLoggedIn] = useState('')

  return (
    <div className={productStyle.art}>
      <UploadArt isUserLoggedIn={isUserLoggedIn}></UploadArt>
    </div>
  );
}

export default Art;
