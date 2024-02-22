import CloseIcon from "@mui/icons-material/Close";
import { Alert, AlertTitle, IconButton } from "@mui/material";
import React from "react";

/**
 * CustomAlert component to display different types of alerts with optional close button.
 *
 * @param {object} props - The props object containing type, title, message, onClose, showCloseButton, and closeButtonIcon.
 * @return {JSX.Element} The JSX for the custom alert component.
 */
function CustomAlert({
  type,
  title,
  message,
  onClose,
  showCloseButton,
  closeButtonIcon,
}) {
  const alertStyles = {
    error: { backgroundColor: "red", color: "#721c24", width: "fit-content" },
    warning: { backgroundColor: "#fff3cd", color: "#856404", width: "fit-content" },
    success: { backgroundColor: "#d4edda", color: "#155724", width: "fit-content" },
    info: { backgroundColor: "#d1ecf1", color: "#0c5460", width: "fit-content" },
  };

/* 
TODO: Use this function to display different types of alerts 
  with optional close button
*/
  const renderCloseButton = () => {
    if (!showCloseButton) return null;

    return (
      <IconButton
        
        aria-label="close"
        color="inherit"
        sx={{ p: 0.5 }}
        size="small"
        onClick={onClose}
      >
        {closeButtonIcon || <CloseIcon fontSize="inherit"/>}
      </IconButton>
    );
  };

  return (
    <Alert
      style={alertStyles[type] }
      severity={type}
      action={renderCloseButton()}
    >
      {title && <AlertTitle>{title}</AlertTitle>}
      {message}
    </Alert>
  );
}

export default CustomAlert;
