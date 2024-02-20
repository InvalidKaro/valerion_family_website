import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  error: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
  warning: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.warning.contrastText,
  },
  success: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
  },
  info: {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.info.contrastText,
  },
}));


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
  const classes = useStyles();

  let alertClass = "";
  switch (type) {
    case "error":
      alertClass = classes.error;
      break;
    case "warning":
      alertClass = classes.warning;
      break;
    case "success":
      alertClass = classes.success;
      break;
    case "info":
      alertClass = classes.info;
      break;
    default:
      alertClass = "";
  }

  const renderCloseButton = () => {
    if (!showCloseButton) return null;

    if (closeButtonIcon) {
      return (
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={onClose}
        >
          {closeButtonIcon}
        </IconButton>
      );
    }

    return (
      <IconButton
        aria-label="close"
        color="inherit"
        size="small"
        onClick={onClose}
      >
        <CloseIcon fontSize="inherit" />
      </IconButton>
    );
  };

  return (
    <Alert 
        className={alertClass} 
        severity={type} 
        action={renderCloseButton()}
    >
      {title && <AlertTitle>{title}</AlertTitle>}
      {message}
    </Alert>
  );
}

export default CustomAlert;
