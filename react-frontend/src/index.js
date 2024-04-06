import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

if (process.env.NODE_ENV === 'development') {
  console.log("Running in development mode");
  import("disable-react-error-overlay").then(() => {
      const iframe = document.querySelector('iframe');
      if (iframe) iframe.remove();
  });
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
