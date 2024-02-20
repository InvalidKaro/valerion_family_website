import React, { useState } from 'react';
import CustomAlert from '../Errors/alerts'; // Assuming CustomAlert component is in the same directory

function YourComponent() {
  const [showAlert, setShowAlert] = useState(false);

  const handleClose = () => {
    setShowAlert(false);
  };

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  return (
    <div>
      <button onClick={handleShowAlert} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px', margin: '10px',  borderRadius: '5px', backgroundColor: 'green', color: 'white', marginInline: 'auto', }}>Show Alert</button>
      {showAlert && (
        <CustomAlert
          type="error"
          title="Error Title"
          message="This is an error message."
          onClose={handleClose}
          showCloseButton={true}
        />
      )}
    </div>
  );
}

export default YourComponent;
