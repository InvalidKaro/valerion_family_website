import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div>
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try Again</button>
  </div>
);

const MyComponent = () => {
  const fetchData = async () => {
    const response = await fetch('https://api.example.com/data');
    
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const result = await response.json();
    return result;
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => fetchData()}>
      <div>
        {/* Your component logic here */}
        <button onClick={() => fetchData()}>Fetch Data</button>
      </div>
    </ErrorBoundary>
  );
};

export default MyComponent;
