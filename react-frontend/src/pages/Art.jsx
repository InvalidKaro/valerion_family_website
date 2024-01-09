import React, { useState } from 'react';
import '../styles/App.css';
import { useUser } from '../UserContext';
import UploadArt from '../components/Art/uploadArt';

function Art() {
  const { user } = useUser();
  const [isUserLoggedIn] = useState('')

  return (
    <div className="Art">
        <UploadArt isUserLoggedIn={isUserLoggedIn}></UploadArt>

      <main>
        {user && user.username ? ( // Check if user and username exist
          <div>
            <h1>Welcome, {user.username}!</h1>
            {/* Add more user information if needed */}
          </div>
        ) : (
          <div>
            <h1>Welcome!</h1>
          </div>
        )}

      </main>
    </div>
  );
}

export default Art;
