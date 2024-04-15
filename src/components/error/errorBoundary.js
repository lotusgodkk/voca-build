import React, { useEffect, useState } from "react";
import { Alert } from "reactstrap";
import "./error.scss";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const errorHandler = (error) => {
      setHasError(true);
      setError(error);
    };

    window.addEventListener("error", errorHandler);

    return () => {
      window.removeEventListener("error", errorHandler);
      return false;
    };
  }, []);

  return (
    <>
      {hasError ? (
        <Alert
          id="error-wrapper"
          color="danger"
          toggle={() => {
            setHasError(false);
          }}
        >
          <h5 className="alert-heading">Error!</h5>
          <p>{error.message}</p>
        </Alert>
      ) : null}
      {children}
    </>
  );
};

export default ErrorBoundary;
