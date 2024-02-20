import React, { useState } from 'react';
import ErrorFlag from '../Errors/errorFlag.jsx';

function YourComponent() {
  const [error, setError] = useState(null);
  const [flagVisible, setFlagVisible] = useState(false);

  const handleError = () => {
    setError(null);
    setFlagVisible(false); // Reset the visibility of the ErrorFlag
  };

  const triggerError = () => {
    setError('An error occurred!');
    setFlagVisible(true); // Show the ErrorFlag
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      {flagVisible && <ErrorFlag error={error} duration={5000} handleError={handleError} setFlagVisible={setFlagVisible} />}
      <button onClick={triggerError}>Trigger Error</button>
    </div>
  );
}

export default YourComponent;
