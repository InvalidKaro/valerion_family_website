import React, { useEffect, useState } from "react";
import "./style/error.css";

function ErrorFlag({ error, duration, handleError, setFlagVisible }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, handleError]);

  return (
    <div className={`error-flag ${isVisible ? "visible" : ""}`}>
      {error}
    </div>
  );
}

export default ErrorFlag;
